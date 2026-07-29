const LEAD_SHEET_NAME = "Leady";
const OWNER_NOTIFICATION_EMAIL = "kontakt@pyklyk.pl";

const LEAD_HEADERS = [
  "Data zapisu",
  "Lead ID",
  "Email",
  "Goście",
  "Data wydarzenia",
  "Lokalizacja",
  "Dystans",
  "Bar",
  "Pakiety",
  "Cena",
  "Zdarzenie",
  "Feedback",
  "Status",
  "Priorytet",
  "Następny kontakt",
  "Ostatni kontakt",
  "Akcja",
  "Status wysyłki",
  "Data ostatniego maila",
  "Typ ostatniego maila",
  "Notatka",
  "Źródło",
  "URL strony",
  "Zgoda RODO",
  "User agent"
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Pyk Łyk CRM")
    .addItem("Skonfiguruj arkusz i wysyłkę", "setupLeadSheet")
    .addItem("Wyślij mail dla zaznaczonego wiersza", "sendLeadMailForSelectedRow")
    .addItem("Wyślij test uprawnień e-mail", "sendLeadMailPermissionTest")
    .addToUi();
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};
  const sheet = getLeadSheet_();
  ensureLeadHeaders_(sheet);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map((header) => getLeadValue_(header, params));
  sheet.appendRow(row);
  formatLeadSheet_(sheet);

  if (shouldNotifyOwner_(params.event)) {
    sendNewLeadNotification_(params);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function shouldNotifyOwner_(eventName) {
  return ["offer_liked", "custom_quote_requested"].includes(String(eventName || ""));
}

function sendNewLeadNotification_(params) {
  const isIndividual = params.event === "custom_quote_requested";
  const subject = isIndividual
    ? "Pyk Łyk - nowe zapytanie o wycenę indywidualną"
    : "Pyk Łyk - klient poprosił o kontakt w sprawie terminu";
  const description = params.feedback ? `Opis / dodatkowe informacje: ${params.feedback}` : "Opis / dodatkowe informacje: brak";
  const body = [
    "Pojawił się nowy lead z kalkulatora.",
    "",
    `E-mail klienta: ${params.email || "brak"}`,
    `Data wydarzenia: ${params.date || "brak"}`,
    `Lokalizacja: ${params.location || "brak"}`,
    `Liczba gości: ${params.guests || "brak"}`,
    `Dystans: ${params.distance || "brak"} km`,
    `Wybrany bar: ${params.bar || "brak"}`,
    `Pakiety: ${params.packages || "brak"}`,
    `Szacowana cena: ${params.total || "brak"} zł`,
    description,
    "",
    "Lead został zapisany w arkuszu. Sprawdź wiersz ze statusem Do kontaktu.",
    params.pageUrl ? `Strona: ${params.pageUrl}` : ""
  ].filter(Boolean).join("\n");

  try {
    GmailApp.sendEmail(
      OWNER_NOTIFICATION_EMAIL,
      subject,
      body,
      { name: "Pyk Łyk CRM", replyTo: params.email || "kontakt@pyklyk.pl" }
    );
  } catch (error) {
    console.error(`Nie udało się wysłać powiadomienia o leadzie: ${error.message}`);
  }
}

function doGet() {
  setupLeadSheet();
  return ContentService
    .createTextOutput("Arkusz leadow jest gotowy.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function setupLeadSheet() {
  const sheet = getLeadSheet_(true);
  ensureLeadHeaders_(sheet);
  formatLeadSheet_(sheet);
  installLeadMailTrigger_();
  SpreadsheetApp.getActiveSpreadsheet().toast(`Skonfigurowano arkusz: ${sheet.getName()}`, "Pyk Łyk CRM", 6);
}

function getLeadSheet_(preferActive) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = spreadsheet.getActiveSheet();

  if (preferActive && isLeadSheet_(activeSheet)) return activeSheet;

  const namedSheet = spreadsheet.getSheetByName(LEAD_SHEET_NAME);
  if (namedSheet) return namedSheet;

  const leadLikeSheet = spreadsheet.getSheets().find((sheet) => isLeadSheet_(sheet));
  if (leadLikeSheet) return leadLikeSheet;

  return spreadsheet.insertSheet(LEAD_SHEET_NAME);
}

function isLeadSheet_(sheet) {
  if (!sheet || sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) return false;
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.includes("Email") && (headers.includes("Data zapisu") || headers.includes("Zdarzenie") || headers.includes("Akcja"));
}

function ensureLeadHeaders_(sheet) {
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setValues([LEAD_HEADERS]);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const missingHeaders = LEAD_HEADERS.filter((header) => !currentHeaders.includes(header));

  if (missingHeaders.length) {
    sheet
      .getRange(1, currentHeaders.length + 1, 1, missingHeaders.length)
      .setValues([missingHeaders]);
  }
}

function getLeadValue_(header, params) {
  switch (header) {
    case "Data zapisu":
      return params.createdAt ? new Date(params.createdAt) : new Date();
    case "Lead ID":
      return params.leadId || buildFallbackLeadId_(params);
    case "Email":
      return params.email || "";
    case "Goście":
      return numberOrEmpty_(params.guests);
    case "Data wydarzenia":
      return params.date || "";
    case "Lokalizacja":
      return params.location || "";
    case "Dystans":
      return numberOrEmpty_(params.distance);
    case "Bar":
      return params.bar || "";
    case "Pakiety":
      return params.packages || "";
    case "Cena":
      return numberOrEmpty_(params.total);
    case "Zdarzenie":
      return eventLabel_(params.event);
    case "Feedback":
      return params.feedback || "";
    case "Status":
      return params.status || statusFromEvent_(params.event);
    case "Priorytet":
      return params.priority || "Normalny";
    case "Następny kontakt":
      return params.nextContact || "";
    case "Ostatni kontakt":
    case "Akcja":
    case "Status wysyłki":
    case "Data ostatniego maila":
    case "Typ ostatniego maila":
      return "";
    case "Notatka":
      return params.note || "";
    case "Źródło":
      return params.source || "kalkulator-pyklyk";
    case "URL strony":
      return params.pageUrl || "";
    case "Zgoda RODO":
      return params.consent || "";
    case "User agent":
      return params.userAgent || "";
    default:
      return params[header] || "";
  }
}

function eventLabel_(eventName) {
  const labels = {
    quote_calculated: "Wyświetlono wycenę",
    quote_unlocked: "Wyświetlono wycenę",
    offer_liked: "Oferta mi się podoba",
    offer_disliked: "Oferta mi się nie podoba",
    custom_quote_requested: "Zapytanie indywidualne"
  };
  return labels[eventName] || eventName || "";
}

function statusFromEvent_(eventName) {
  if (eventName === "offer_liked") return "Do kontaktu";
  if (eventName === "offer_disliked") return "Utracony / feedback";
  if (eventName === "custom_quote_requested") return "Wycena indywidualna";
  return "Nowy";
}

function buildFallbackLeadId_(params) {
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss");
  const emailPart = String(params.email || "lead").split("@")[0].replace(/[^a-z0-9]/gi, "").slice(0, 10).toUpperCase();
  return `PYK-${timestamp}-${emailPart}`;
}

function numberOrEmpty_(value) {
  if (value === "" || value == null) return "";
  const number = Number(String(value).replace(",", "."));
  return Number.isFinite(number) ? number : value;
}

function formatLeadSheet_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), LEAD_HEADERS.length);
  const lastRow = Math.max(sheet.getLastRow(), 1);

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, lastColumn)
    .setFontWeight("bold")
    .setBackground("#f2eadc")
    .setWrap(true);

  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, lastRow, lastColumn).createFilter();
  }

  applyLeadDropdowns_(sheet);
  sheet.autoResizeColumns(1, lastColumn);
}

function installLeadMailTrigger_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const triggerExists = ScriptApp.getProjectTriggers().some((trigger) => {
    return trigger.getHandlerFunction() === "handleLeadActionEdit";
  });

  if (!triggerExists) {
    ScriptApp.newTrigger("handleLeadActionEdit")
      .forSpreadsheet(spreadsheet)
      .onEdit()
      .create();
  }
}

function applyLeadDropdowns_(sheet) {
  const maxRows = Math.max(sheet.getMaxRows() - 1, 1);
  const statusColumn = findHeaderColumn_(sheet, "Status");
  const priorityColumn = findHeaderColumn_(sheet, "Priorytet");
  const actionColumn = findHeaderColumn_(sheet, "Akcja");

  if (statusColumn) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Nowy", "Do kontaktu", "Wycena indywidualna", "Przypomnienie wysłane", "Wysłano ofertę", "Kontakt telefoniczny", "Zarezerwowany termin", "Umowa", "Konkurencja", "Utracony / feedback", "Nieaktualne"], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(2, statusColumn, maxRows, 1).setDataValidation(rule);
  }

  if (priorityColumn) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Wysoki", "Normalny", "Niski"], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(2, priorityColumn, maxRows, 1).setDataValidation(rule);
  }

  if (actionColumn) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Wyślij przypomnienie", "Dopytanie po ofercie", "Wycena indywidualna"], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, actionColumn, maxRows, 1).setDataValidation(rule);
  }
}

function findHeaderColumn_(sheet, headerName) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const index = headers.indexOf(headerName);
  return index === -1 ? 0 : index + 1;
}

function handleLeadActionEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (!isLeadSheet_(sheet) || e.range.getRow() === 1) return;

  const actionColumn = findHeaderColumn_(sheet, "Akcja");
  if (!actionColumn || e.range.getColumn() !== actionColumn) return;

  const action = String(e.value || "").trim();
  if (!action) return;

  sendLeadMailForRow_(sheet, e.range.getRow(), action);
  e.range.clearContent();
}

function sendLeadMailForSelectedRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (!isLeadSheet_(sheet)) {
    SpreadsheetApp.getUi().alert("Zaznacz wiersz w arkuszu, który zawiera kolumny leadów, np. Email, Status i Akcja.");
    return;
  }

  const row = sheet.getActiveRange().getRow();
  if (row === 1) {
    SpreadsheetApp.getUi().alert("Zaznacz wiersz z leadem, nie nagłówek.");
    return;
  }

  const actionColumn = findHeaderColumn_(sheet, "Akcja");
  const action = actionColumn ? String(sheet.getRange(row, actionColumn).getValue() || "").trim() : "";

  if (!action) {
    SpreadsheetApp.getUi().alert("Najpierw wybierz typ wiadomości w kolumnie Akcja.");
    return;
  }

  sendLeadMailForRow_(sheet, row, action);
  if (actionColumn) sheet.getRange(row, actionColumn).clearContent();
  SpreadsheetApp.getActiveSpreadsheet().toast("Wiadomość została przetworzona. Sprawdź kolumnę Status wysyłki.", "Pyk Łyk CRM", 6);
}

function sendLeadMailPermissionTest() {
  const email = Session.getActiveUser().getEmail();
  if (!email) {
    SpreadsheetApp.getUi().alert("Google nie zwrócił adresu aktywnego użytkownika. Wybierz test na wierszu z własnym adresem e-mail.");
    return;
  }

  GmailApp.sendEmail(
    email,
    "Test wysyłki Pyk Łyk CRM",
    "Jeśli widzisz tę wiadomość, Apps Script ma uprawnienia do wysyłki maili przez GmailApp.",
    { name: "Pyk Łyk Drink Bar", replyTo: "kontakt@pyklyk.pl" }
  );

  SpreadsheetApp.getActiveSpreadsheet().toast(`Wysłano test na ${email}`, "Pyk Łyk CRM", 6);
}

function sendLeadMailForRow_(sheet, row, action) {
  const lead = getLeadRow_(sheet, row);

  if (!lead.Email) {
    writeLeadMailResult_(sheet, row, action, "Błąd: brak adresu e-mail");
    return;
  }

  try {
    const message = buildLeadEmail_(action, lead);
    GmailApp.sendEmail(
      lead.Email,
      message.subject,
      message.text,
      { name: "Pyk Łyk Drink Bar", replyTo: "kontakt@pyklyk.pl" }
    );

    writeLeadMailResult_(sheet, row, action, "Wysłano");
    updateLeadAfterMail_(sheet, row, action);
  } catch (error) {
    writeLeadMailResult_(sheet, row, action, `Błąd: ${error.message}`);
  }
}

function getLeadRow_(sheet, row) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.reduce((lead, header, index) => {
    lead[header] = values[index];
    return lead;
  }, {});
}

function buildLeadEmail_(action, lead) {
  if (action === "Dopytanie po ofercie") return buildOfferFollowUpEmail_(lead);
  if (action === "Wycena indywidualna") return buildCustomQuoteEmail_(lead);
  return buildReminderEmail_(lead);
}

function buildReminderEmail_(lead) {
  const subject = "Pyk Łyk - przypomnienie o ofercie drink baru";
  const body = [
    "Dzień dobry,",
    "",
    "tu Pyk Łyk Drink Bar. Wracamy z krótkim przypomnieniem o wycenie przygotowanej na podstawie danych z kalkulatora.",
    "Wiemy, że przy organizacji wesela często porównuje się kilka ofert, dlatego poniżej zostawiamy najważniejsze informacje w jednym miejscu.",
    "",
    buildEventSummary_(lead),
    "",
    "Jeśli oferta jest nadal interesująca, chętnie doprecyzujemy szczegóły obsługi, dostępność terminu i zakres drinków.",
    "Można odpisać na tę wiadomość albo zadzwonić: 513 595 540.",
    "",
    "Pozdrawiam,",
    "Pyk Łyk Drink Bar",
    "tel. 513 595 540"
  ].join("\n");

  return emailResult_(subject, body);
}

function buildOfferFollowUpEmail_(lead) {
  const subject = "Pyk Łyk - wracamy z ofertą drink baru";
  const body = [
    "Dzień dobry,",
    "",
    "tu Pyk Łyk Drink Bar. Dziękujemy za zainteresowanie naszą ofertą drink baru.",
    "Widzimy, że oferta wygląda dla Państwa interesująco, dlatego wracamy z konkretnym podsumowaniem danych z kalkulatora.",
    "",
    buildEventSummary_(lead),
    "",
    "W cenie uwzględniamy mobilny bar, obsługę barmańską, sprzęt, szkło, lód, dodatki oraz menu drinków zgodne z wybranymi pakietami.",
    "Chętnie potwierdzimy dostępność terminu i doprecyzujemy szczegóły sali oraz godzin pracy baru.",
    "Można odpisać na tę wiadomość albo zadzwonić: 513 595 540.",
    "",
    "Pozdrawiam,",
    "Pyk Łyk Drink Bar",
    "tel. 513 595 540"
  ].join("\n");

  return emailResult_(subject, body);
}

function buildCustomQuoteEmail_(lead) {
  const subject = "Pyk Łyk - przygotujemy indywidualną wycenę drink baru";
  const body = [
    "Dzień dobry,",
    "",
    "tu Pyk Łyk Drink Bar. Dziękujemy za przesłanie zapytania.",
    "W tym przypadku najlepiej przygotować indywidualną wycenę, żeby oferta była dopasowana do liczby gości, miejsca i oczekiwanego zakresu obsługi.",
    "",
    buildEventSummary_(lead),
    "",
    "Prosimy o krótką odpowiedź z informacją, w jakich godzinach miałby działać bar oraz czy wydarzenie odbywa się w sali weselnej, plenerze czy innym miejscu.",
    "Możemy też ustalić wszystko telefonicznie: 513 595 540.",
    "",
    "Pozdrawiam,",
    "Pyk Łyk Drink Bar",
    "tel. 513 595 540"
  ].join("\n");

  return emailResult_(subject, body);
}

function buildEventSummary_(lead) {
  const lines = [
    "Dane z kalkulatora:",
    hasLeadValue_(lead["Data wydarzenia"]) ? `Data wydarzenia: ${formatLeadValue_(lead["Data wydarzenia"])}` : "",
    hasLeadValue_(lead["Goście"]) ? `Liczba gości: ${lead["Goście"]}` : "",
    hasLeadValue_(lead["Lokalizacja"]) ? `Lokalizacja: ${lead["Lokalizacja"]}` : "",
    hasLeadValue_(lead["Dystans"]) ? `Dystans od Warszawy: ${lead["Dystans"]} km` : "",
    hasLeadValue_(lead["Bar"]) ? `Wybrany bar: ${lead["Bar"]}` : "",
    `Pakiety dodatkowe: ${hasLeadValue_(lead["Pakiety"]) ? lead["Pakiety"] : "brak dodatkowych pakietów"}`,
    hasLeadValue_(lead["Cena"]) ? `Szacowana wycena: ${formatPrice_(lead["Cena"])}` : ""
  ].filter(Boolean);

  return lines.length > 1 ? lines.join("\n") : "Szczegóły wydarzenia znajdują się w przesłanej wycenie.";
}

function hasLeadValue_(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function formatPrice_(value) {
  const text = String(value).trim();
  return /zł/i.test(text) ? text : `${text} zł`;
}

function emailResult_(subject, text) {
  return {
    subject,
    text,
    html: text
      .split("\n")
      .map((line) => line ? `<p>${escapeHtml_(line)}</p>` : "<br>")
      .join("")
  };
}

function writeLeadMailResult_(sheet, row, action, status) {
  setLeadCell_(sheet, row, "Status wysyłki", status);
  setLeadCell_(sheet, row, "Data ostatniego maila", new Date());
  setLeadCell_(sheet, row, "Typ ostatniego maila", action);
}

function updateLeadAfterMail_(sheet, row, action) {
  setLeadCell_(sheet, row, "Ostatni kontakt", new Date());

  if (action === "Wyślij przypomnienie") {
    setLeadCell_(sheet, row, "Status", "Przypomnienie wysłane");
  } else if (action === "Dopytanie po ofercie") {
    setLeadCell_(sheet, row, "Status", "Do kontaktu");
  } else if (action === "Wycena indywidualna") {
    setLeadCell_(sheet, row, "Status", "Wycena indywidualna");
  }
}

function setLeadCell_(sheet, row, headerName, value) {
  const column = findHeaderColumn_(sheet, headerName);
  if (column) sheet.getRange(row, column).setValue(value);
}

function formatLeadValue_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !Number.isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value);
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
