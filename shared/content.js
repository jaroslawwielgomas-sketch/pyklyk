/* =============================================================================
   PYK ŁYK — WSPÓLNA TREŚĆ STRONY  (single source of truth)
   -----------------------------------------------------------------------------
   To jest JEDYNE miejsce, w którym trzymamy treść, dane kontaktowe, menu, FAQ itd.
   Wszystkie 4 wersje strony czytają dane stąd — zmiana tutaj = zmiana we wszystkich
   wersjach naraz. Edytuj spokojnie teksty, telefon, linki, pozycje menu.

   ⚠  Aby zmienić coś na stronie, w 99% przypadków edytujesz właśnie ten plik,
      a NIE plików HTML poszczególnych wersji.
   ============================================================================= */

window.PYKLYK = {

  /* -------------------------------------------------------------------------
     KONFIGURACJA / KONTAKT  — to co wyświetla się w nagłówku, stopce, przyciskach
     ------------------------------------------------------------------------- */
  config: {
    brand:       "Pyk Łyk",
    tagline:     "Mobilny bar na wesela i eventy",

    phone:       "513 595 540",
    phoneHref:   "tel:+48513595540",       // format do klikania na telefonie
    phoneRaw:    "+48513595540",

    email:       "jaroslaw.wielgomas@gmail.com",
    emailHref:   "mailto:jaroslaw.wielgomas@gmail.com",

    // Temat maila z formularza — WYMAGANY dokładnie w tej formie:
    formSubject: "Zapytanie ofertowe- strona internetowa PYK ŁYK",

    // Strona polityki prywatności (link przy checkboxie RODO). Ścieżka względem wersji (podfolder).
    privacyUrl: "../polityka-prywatnosci.html",

    // Formularz — na razie tryb "mailto" (otwiera program pocztowy).
    // Gdy założysz darmowe konto np. na https://web3forms.com,
    // zmień mode na "web3forms" i wklej klucz do accessKey.
    form: {
      mode:      "mailto",                 // "mailto" | "web3forms" | "formspree"
      accessKey: "",                       // klucz Web3Forms / endpoint Formspree
    },

    // Logo (ścieżki względem katalogu głównego strony). Wersje na jasnym tle
    // używają logo-light, na ciemnym — logo-dark.
    logo: {
      light:   "assets/logo/logo-light.png",   // czarny napis — na jasne tło
      dark:    "assets/logo/logo-dark.png",     // biały napis — na ciemne tło
      favicon: "assets/logo/favicon.png"
    },

    area:        "Mazowieckie · Łódzkie · Lubelskie",
    areaLong:    "Działamy głównie na Mazowszu oraz w województwie łódzkim i lubelskim — do ok. 170 km od Warszawy.",

    social: {
      facebook:  "https://www.facebook.com/pyklyk",
      instagram: "https://www.instagram.com/pyk_lyk/",
      weseleZKlasa: "https://www.weselezklasa.pl/ogloszenia-weselne/barman-na-wesele,25243/"
    }
  },

  /* -------------------------------------------------------------------------
     LICZNIKI (Hero / sekcja zaufania) — animowane liczby
     ------------------------------------------------------------------------- */
  stats: [
    { value: 1000, suffix: "+", label: "zrealizowanych imprez" },
    { value: 12,   suffix: "",  label: "lat doświadczenia" },
    { value: 20,   suffix: "+", label: "drinków w karcie" },
    { value: 100,  suffix: "+", label: "pozytywnych opinii" }
  ],

  /* -------------------------------------------------------------------------
     GŁÓWNE TEKSTY (Hero + wstępy sekcji) — wspólne dla wersji
     ------------------------------------------------------------------------- */
  copy: {
    hero: {
      kicker:   "Profesjonalna obsługa barmańska",
      title:    "Celebruj chwile",
      subtitle: "Mobilny bar, autorskie koktajle i barmani z pasją — sprawimy, że Twoje wesele lub event zapamiętają wszyscy goście.",
      ctaPrimary:   "Zapytaj o termin",
      ctaSecondary: "Zobacz ofertę"
    },

    about: {
      kicker: "O nas",
      title:  "12 lat za barem. Ponad 1000 udanych imprez.",
      lead:   "Jesteśmy zespołem doświadczonych barmanów, których łączy jedna pasja — tworzenie niezapomnianych koktajli.",
      body: [
        "Od 12 lat specjalizujemy się w obsłudze barmańskiej wesel i eventów. Mamy na koncie ponad 1000 zrealizowanych imprez i dysponujemy kilkoma ekipami, dzięki czemu jesteśmy w stanie obsłużyć kilka wydarzeń tego samego dnia.",
        "Świadczymy usługę kompleksowo — wyręczamy Cię z zakupów i organizacji. Dostarczamy mobilny bar z pełnym wyposażeniem i asortymentem. Po Twojej stronie zostają tylko 3–5 litrów czystej wódki, resztą zajmujemy się my."
      ],
      points: [
        "Doświadczeni barmani z pasją i flair barmański",
        "Kompleksowa obsługa — od zakupów po sprzątanie baru",
        "Kilka ekip w gotowości — obsłużymy kilka eventów dziennie",
        "Autorskie koktajle i zaskakujące dekoracje"
      ]
    },

    // Dwa warianty baru do wyboru
    bars: {
      kicker: "Dwa style baru",
      title:  "Wybierz bar, który pasuje do Twojej sali",
      items: [
        {
          name: "Elegancki biały",
          material: "ekoskóra",
          desc: "Nowoczesny, pikowany bar w bieli — pasuje do eleganckich sal weselnych i przyjęć w stylu glamour.",
          image: "bar-white-01"
        },
        {
          name: "Stylowy drewniany",
          material: "naturalne drewno",
          desc: "Ciepły, rustykalny bar z drewna — idealny na wesela w stodole, plenerze i przyjęcia w klimacie boho.",
          image: "bar-wood-01"
        }
      ]
    },

    offer: {
      kicker: "Nasza oferta",
      title:  "Kompleksowa obsługa — zajmujemy się wszystkim",
      lead:   "Jeden pakiet, a w nim wszystko, czego potrzeba, by bar działał bez zarzutu od pierwszego do ostatniego drinka.",
      note:   "Cena usługi zależy głównie od liczby gości i terminu. Obsługa barmańska jest wliczona w cenę.",
      personalization: "To tylko punkt wyjścia — ofertę w pełni personalizujemy pod Twoje oczekiwania. Jesteśmy elastyczni i zawsze gotowi dopasować się w 100%."
    },

    menu: {
      kicker: "Menu, które zachwyca",
      title:  "Karta drinków",
      lead:   "Standardowa karta to 14 klasycznych i autorskich koktajli alkoholowych, 6 orzeźwiających drinków bezalkoholowych oraz 3 rodzaje shotów. Chętnie stworzymy też koktajle spoza karty."
    },

    packages: {
      kicker: "Pakiety dodatkowe",
      title:  "Chcesz rozszerzyć menu?",
      lead:   "Z myślą o Tobie stworzyliśmy pakiety dodatkowe, które wprowadzą na Twoje przyjęcie jeszcze więcej smaków. Cena pakietu zależy od liczby gości."
    },

    reviews: {
      kicker: "Opinie",
      title:  "Zaufało nam ponad 1000 par i firm",
      lead:   "Ponad 100 pozytywnych opinii na Facebooku oraz w serwisie Wesele z Klasą."
    },

    faq: {
      kicker: "FAQ",
      title:  "Najczęściej zadawane pytania"
    },

    contact: {
      kicker: "Kontakt",
      title:  "Zapytaj o wolny termin",
      lead:   "Wypełnij formularz — odezwiemy się z indywidualną wyceną. Wolisz porozmawiać? Zadzwoń, chętnie doradzimy.",
      formCta: "Wyślij zapytanie"
    }
  },

  /* -------------------------------------------------------------------------
     CO WCHODZI W SKŁAD USŁUGI (oferta — bez cen)
     ------------------------------------------------------------------------- */
  included: [
    { icon: "users",    title: "Dwóch barmanów",        desc: "Dwuosobowa obsługa barmańska — na miejscu 2 godziny przed startem, do 2:00 w nocy (z możliwością przedłużenia)." },
    { icon: "bar",      title: "Mobilny bar",           desc: "Do wyboru elegancki biały z ekoskóry lub stylowy drewniany." },
    { icon: "tools",    title: "Pełne wyposażenie",     desc: "Profesjonalny sprzęt barmański oraz szkło dopasowane do każdego rodzaju drinka." },
    { icon: "ice",      title: "Lód",                   desc: "Lód w kostkach i kruszony, a na życzenie także suchy lód do efektownych dekoracji." },
    { icon: "fruit",    title: "Dodatki i dekoracje",   desc: "Świeże owoce i warzywa, zioła, syropy oraz akcesoria: słomki, serwetki, dekoracje." },
    { icon: "soda",     title: "Napoje",                desc: "Soki i napoje gazowane potrzebne do przygotowania koktajli." },
    { icon: "bottle",   title: "Alkohole i likiery",    desc: "Pełen asortyment alkoholi i likierów do karty drinków." },
    { icon: "truck",    title: "Transport w cenie",     desc: "Dojazd i transport baru wliczone w cenę usługi." }
  ],

  // Prezent od firmy
  gift: {
    title: "Welcome drink dla Pary Młodej",
    desc:  "W prezencie od firmy przygotowujemy dla Pary Młodej wyjątkowy welcome drink na powitanie gości."
  },

  /* -------------------------------------------------------------------------
     KARTA DRINKÓW  (skład wg oferty — bez cen)
     ------------------------------------------------------------------------- */
  menu: {
    alcoholic: [
      { name: "Biały Rusek",     ingredients: ["wódka", "mleko", "likier kawowy"] },
      { name: "Piña Colada",     ingredients: ["rum", "malibu", "sok ananasowy", "mleko"] },
      { name: "Mojito",          ingredients: ["rum", "sprite / woda", "mięta", "limonka", "cukier brązowy"] },
      { name: "Martini & Sprite",ingredients: ["martini", "sprite"] },
      { name: "Jamaica",         ingredients: ["malibu", "wódka", "sok pomarańczowy", "sok ananasowy", "blue curaçao", "grenadina"] },
      { name: "Blue Lagoon",     ingredients: ["wódka", "sprite", "sok z cytryny", "blue curaçao"] },
      { name: "Gremlin",         ingredients: ["wódka", "sok pomarańczowy", "blue curaçao"] },
      { name: "Gin & Tonic",     ingredients: ["gin", "tonic"] },
      { name: "Sex on the Beach",ingredients: ["wódka", "likier brzoskwiniowy", "sok pomarańczowy", "sok żurawinowy"] },
      { name: "Malibu",          ingredients: ["malibu", "mleko"] },
      { name: "Tequila Sunrise", ingredients: ["tequila", "sok pomarańczowy", "grenadina"] },
      { name: "Ekstravaganza",   ingredients: ["malibu", "wódka", "blue curaçao", "sok pomarańczowy", "sok truskawkowy"] },
      { name: "Eksplozja",       ingredients: ["gin", "martini", "wódka", "blue curaçao", "sprite"] },
      { name: "Cuba Libre",      ingredients: ["rum", "cola", "limonka"] }
    ],
    nonAlcoholic: [
      { name: "Mint Fresh",           ingredients: ["mięta", "limonka", "cukier brązowy", "sok jabłkowy"] },
      { name: "Kokosowa Przyjemność", ingredients: ["sok pomarańczowy", "sok cytrynowy", "syrop kokosowy", "blue curaçao"] },
      { name: "Różowa Pantera",       ingredients: ["sok pomarańczowy", "sok ananasowy", "grenadina", "mleko"] },
      { name: "Błękit Nieba",         ingredients: ["sprite", "cytryna", "blue curaçao"] },
      { name: "Virgin Mojito",        ingredients: ["sprite", "mięta", "cukier trzcinowy", "limonka"] },
      { name: "Zielona Dróżka",       ingredients: ["sok pomarańczowy", "blue curaçao"] }
    ],
    shots: [
      { name: "Wściekły Pies", ingredients: ["wódka", "sok malinowy", "tabasco"] },
      { name: "Tequila",       ingredients: ["tequila", "sól", "cytryna"] },
      { name: "Kamikaze",      ingredients: ["wódka", "sok cytrynowy", "blue curaçao"] }
    ]
  },

  /* -------------------------------------------------------------------------
     PAKIETY DODATKOWE (bez cen — tylko skład)
     ------------------------------------------------------------------------- */
  packages: [
    {
      name: "Aperol",
      badge: "+",
      drinks: [
        { name: "Aperol Spritz", ingredients: ["aperol", "prosecco", "woda gazowana"] },
        { name: "Hugo",          ingredients: ["limonka", "mięta", "prosecco", "syrop z czarnego bzu", "woda gazowana"] }
      ]
    },
    {
      name: "Whisky",
      badge: "+",
      drinks: [
        { name: "Whisky & Cola", ingredients: ["whisky", "cola"] },
        { name: "Whisky Sour",   ingredients: ["whisky", "białko", "angostura", "sok z cytryny", "cukier"] },
        { name: "Old Fashioned", ingredients: ["whisky", "cukier trzcinowy", "angostura", "woda gazowana"] }
      ]
    },
    {
      name: "Jägermeister",
      badge: "+",
      drinks: [
        { name: "Surfer",     ingredients: ["jägermeister", "malibu", "sok ananasowy"] },
        { name: "Jäger Bomb", ingredients: ["jägermeister", "redbull"] }
      ]
    }
  ],

  /* -------------------------------------------------------------------------
     OPINIE  ⚠ PRZYKŁADOWE — do podmiany na prawdziwe cytaty z FB / Wesele z Klasą.
     (Zostawiam realistyczne przykłady, ale zanim opublikujesz, wstaw prawdziwe
      opinie klientów. Pod spodem i tak linkujemy do źródeł z prawdziwymi opiniami.)
     ------------------------------------------------------------------------- */
  reviews: [
    { text: "Bar Pyk Łyk to strzał w dziesiątkę! Drinki pyszne, dekoracje robiły ogromne wrażenie, a barmani byli mega kontaktowi. Goście do dziś wspominają.", author: "Paulina & Kamil", meta: "Wesele, Mazowsze" },
    { text: "Profesjonalizm od pierwszego kontaktu aż po ostatniego drinka. Welcome drink dla nas jako Pary Młodej — piękny gest. Polecamy z całego serca!", author: "Marta & Paweł", meta: "Wesele" },
    { text: "Obsługiwali nasz event firmowy — punktualnie, elegancko, drinki znikały w mgnieniu oka. Zdecydowanie zamówimy ponownie.", author: "Anna K.", meta: "Impreza firmowa" },
    { text: "Kontakt super, elastyczne podejście, a menu dopasowane do naszych życzeń. Bar drewniany świetnie wpasował się w klimat stodoły.", author: "Natalia & Michał", meta: "Wesele w plenerze" }
  ],

  /* -------------------------------------------------------------------------
     FAQ — 6 najczęstszych pytań
     ------------------------------------------------------------------------- */
  faq: [
    {
      q: "Z jakim wyprzedzeniem najlepiej rezerwować termin?",
      a: "Im wcześniej, tym lepiej — najlepsze terminy weselne (piątki i soboty w sezonie) rezerwują się z dużym wyprzedzeniem. Dysponujemy kilkoma ekipami barmańskimi, więc jesteśmy w stanie obsłużyć nawet kilka imprez tego samego dnia. Napisz lub zadzwoń, a sprawdzimy dostępność Twojej daty."
    },
    {
      q: "Czy alkohol jest po Waszej stronie?",
      a: "Tak — świadczymy usługę kompleksowo. Zapewniamy alkohole i likiery, soki, napoje, świeże owoce, lód, szkło i pełne wyposażenie baru. Po stronie Pary Młodej zostają zwykle jedynie 3–5 litrów czystej wódki. Resztą zajmujemy się my."
    },
    {
      q: "Ile trwa obsługa i od kiedy jesteście na miejscu?",
      a: "Na miejscu pojawiamy się około 2 godziny przed rozpoczęciem uroczystości, aby wszystko spokojnie przygotować. Bar działa do 2:00 w nocy, z możliwością przedłużenia obsługi po wcześniejszym ustaleniu."
    },
    {
      q: "Czego potrzebujecie od sali, żeby postawić bar?",
      a: "Wystarczy dostęp do prądu (gniazdko 230 V) oraz miejsce ok. 2×2 m na mobilny bar. Przy imprezach plenerowych prosimy o zadaszenie stanowiska. Bar dowozimy i składamy sami — transport jest wliczony w cenę."
    },
    {
      q: "Czy menu i ofertę można personalizować?",
      a: "Oczywiście. Standardowa karta to punkt wyjścia — chętnie przygotujemy koktajle spoza menu i dopasujemy ofertę do motywu przewodniego Waszej imprezy. Dla Pary Młodej mamy też welcome drink w prezencie."
    },
    {
      q: "Ile kosztuje obsługa baru?",
      a: "Cena zależy przede wszystkim od liczby gości i terminu imprezy — dlatego przygotowujemy indywidualną wycenę. Wyślij zapytanie przez formularz lub zadzwoń pod 513 595 540, a szybko przedstawimy propozycję."
    }
  ],

  /* -------------------------------------------------------------------------
     TYPY IMPREZ (dropdown w formularzu)
     ------------------------------------------------------------------------- */
  eventTypes: [
    "Wesele",
    "Impreza firmowa",
    "Urodziny",
    "Impreza okolicznościowa",
    "Inne"
  ],

  /* -------------------------------------------------------------------------
     WOJEWÓDZTWA (dropdown w formularzu — lokalizacja)
     ------------------------------------------------------------------------- */
  voivodeships: [
    "mazowieckie", "łódzkie", "lubelskie", "świętokrzyskie", "podlaskie",
    "warmińsko-mazurskie", "kujawsko-pomorskie", "wielkopolskie", "małopolskie",
    "śląskie", "podkarpackie", "dolnośląskie", "opolskie", "lubuskie",
    "zachodniopomorskie", "pomorskie"
  ],

  /* -------------------------------------------------------------------------
     MAPA ZDJĘĆ  — role semantyczne → nazwy plików w assets/img/
     (bez rozszerzenia; helper poda .webp z fallbackiem .jpg)
     ------------------------------------------------------------------------- */
  images: {
    heroLandscape: ["cocktails-01", "bartender-fire", "bar-white-03", "bartender-03"],
    heroPortrait:  ["bar-wood-01", "cocktails-09", "detail-mojito", "couple-01"],
    barWhite: ["bar-white-01", "bar-white-02", "bar-white-03"],
    barWood:  ["bar-wood-01", "bar-wood-02", "bar-wood-03"],
    bartenders: ["bartender-01","bartender-02","bartender-03","bartender-fire","bartender-04","bartender-05","bartender-06","bartender-07"],
    couples: ["couple-01","couple-02","couple-03","couple-04"],
    gallery: [
      "cocktails-01","cocktails-02","cocktails-03","cocktails-04","cocktails-05","cocktails-06",
      "cocktails-07","cocktails-08","cocktails-09","cocktails-10","cocktails-11","cocktails-12",
      "cocktails-13","detail-mojito","detail-whisky","bar-lights",
      "bartender-01","bartender-fire","bartender-04","bar-wood-01","couple-01","couple-03"
    ]
  }
};
