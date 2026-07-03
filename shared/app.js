/* =============================================================================
   PYK ŁYK — WSPÓLNY SILNIK STRONY  (zachowania + formularz + ikony)
   -----------------------------------------------------------------------------
   Ten plik dostarcza wszystkim wersjom to samo, poprawne zachowanie:
     • PL.img(name, opts)      → <picture> z WebP + fallback JPG
     • PL.icon(name)           → ikona SVG (dziedziczy kolor przez currentColor)
     • PL.renderForm(sel)      → kompletny, poprawny formularz zapytania ofertowego
     • auto-init: liczniki, scroll-reveal, nawigacja/scrollspy, FAQ, nagłówek

   Wersje różnią się TYLKO wyglądem (CSS/HTML). Logika jest wspólna, żeby
   formularz i animacje działały wszędzie tak samo.
   ============================================================================= */
(function () {
  "use strict";

  var C = window.PYKLYK;
  if (!C) { console.error("Brak PYKLYK — dołącz content.js przed app.js"); return; }

  // Ustal katalog główny strony na podstawie ścieżki tego skryptu (…/shared/app.js)
  var base = "../";
  try {
    var src = (document.currentScript && document.currentScript.src) || "";
    var m = src.match(/^(.*\/)shared\/app\.js/);
    if (m) base = m[1];
  } catch (e) {}
  var IMG = base + "assets/img/";

  var PL = window.PL = {
    base: base,
    imgDir: IMG,
    data: C
  };

  /* ---------------------------------------------------------------------------
     OBRAZY — <picture> z WebP i fallbackiem JPG
     name: nazwa pliku bez rozszerzenia (np. "cocktails-01")
     --------------------------------------------------------------------------- */
  PL.img = function (name, opts) {
    opts = opts || {};
    var cls = opts.className ? ' class="' + opts.className + '"' : "";
    var loading = opts.loading || "lazy";
    var alt = (opts.alt || "Pyk Łyk — mobilny bar").replace(/"/g, "&quot;");
    var sizes = opts.sizes ? ' sizes="' + opts.sizes + '"' : "";
    var w = opts.width ? ' width="' + opts.width + '"' : "";
    var h = opts.height ? ' height="' + opts.height + '"' : "";
    return (
      '<picture' + cls + '>' +
      '<source srcset="' + IMG + name + '.webp" type="image/webp">' +
      '<img src="' + IMG + name + '.jpg" alt="' + alt + '" loading="' + loading +
      '" decoding="async"' + sizes + w + h + '>' +
      "</picture>"
    );
  };

  // Sam URL (np. do tła CSS)
  PL.imgUrl = function (name, ext) { return IMG + name + "." + (ext || "jpg"); };

  /* ---------------------------------------------------------------------------
     IKONY SVG — stroke = currentColor (dopasowują się do koloru tekstu wersji)
     --------------------------------------------------------------------------- */
  var ICONS = {
    check:   '<polyline points="20 6 9 17 4 12"/>',
    users:   '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    bar:     '<path d="M4 4h16l-8 9z"/><line x1="12" y1="13" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/>',
    tools:   '<path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.83 2.83 0 1 1-4-4l9-9a4 4 0 0 0-1-1z"/>',
    ice:     '<line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>',
    fruit:   '<path d="M12 2.7C8 6 5 9 5 13a7 7 0 0 0 14 0c0-4-3-7-7-10.3z"/>',
    soda:    '<path d="M6 3h12l-1.2 16.2A2 2 0 0 1 14.8 21H9.2a2 2 0 0 1-2-1.8L6 3z"/><line x1="5" y1="8" x2="19" y2="8"/>',
    bottle:  '<path d="M10 2h4v3l1.5 3A3 3 0 0 1 16 9.5V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9.5a3 3 0 0 1 .5-1.5L10 5z"/><line x1="8" y1="13" x2="16" y2="13"/>',
    truck:   '<rect x="1" y="6" width="14" height="10" rx="1"/><path d="M15 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    gift:    '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    star:    '<polygon points="12 2 15.1 8.6 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.6 12 2" fill="currentColor" stroke="none"/>',
    quote:   '<path d="M7 7H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v3a3 3 0 0 1-3 3M17 7h-3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v3a3 3 0 0 1-3 3" fill="none"/>',
    phone:   '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.6 9.8a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>',
    mail:    '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clock:   '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    mappin:  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    menu:    '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    close:   '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    arrow:   '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram:'<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>'
  };
  PL.icon = function (name, opts) {
    opts = opts || {};
    var inner = ICONS[name] || ICONS.sparkle;
    var cls = opts.className ? ' class="' + opts.className + '"' : "";
    var size = opts.size || 24;
    return '<svg' + cls + ' viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + inner + "</svg>";
  };

  /* ---------------------------------------------------------------------------
     FORMULARZ ZAPYTANIA OFERTOWEGO  (cel biznesowy — jeden, poprawny renderer)
     Użycie w wersji:  <div data-form></div>  → PL.renderForm() wypełni go.
     --------------------------------------------------------------------------- */
  PL.renderForm = function (selector) {
    var mount = document.querySelector(selector || "[data-form]");
    if (!mount) return;

    var today = new Date();
    var min = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");

    var evOpts = C.eventTypes.map(function (t) { return '<option value="' + t + '">' + t + "</option>"; }).join("");
    var wojOpts = C.voivodeships.map(function (t) { return '<option value="' + t + '">' + t + "</option>"; }).join("");

    mount.innerHTML =
      '<form class="pl-form" novalidate>' +
        '<div class="pl-form__grid">' +

          field("Termin imprezy *", '<input class="pl-input" type="date" name="termin" min="' + min + '" required>', "full-sm") +
          field("Typ imprezy *",
            '<select class="pl-input" name="typ" required><option value="" disabled selected>Wybierz…</option>' + evOpts + "</select>") +
          field("Liczba gości *", '<input class="pl-input" type="number" name="goscie" min="1" max="2000" placeholder="np. 120" required>') +

          field("Nazwa sali / miejsca", '<input class="pl-input" type="text" name="sala" placeholder="np. Dworek Leśny">') +
          field("Miejscowość *", '<input class="pl-input" type="text" name="miejscowosc" placeholder="np. Otwock" required>') +
          field("Województwo *",
            '<select class="pl-input" name="wojewodztwo" required><option value="" disabled selected>Wybierz…</option>' + wojOpts + "</select>") +

          field("Imię i nazwisko *", '<input class="pl-input" type="text" name="imie" placeholder="Jan Kowalski" autocomplete="name" required>') +
          field("E-mail *", '<input class="pl-input" type="email" name="email" placeholder="jan@przyklad.pl" autocomplete="email" required>') +
          field("Telefon (opcjonalnie)", '<input class="pl-input" type="tel" name="telefon" placeholder="np. 500 600 700" autocomplete="tel">') +

          field("Twoja wiadomość *",
            '<textarea class="pl-input" name="wiadomosc" rows="4" placeholder="Napisz kilka słów o swojej imprezie…" required></textarea>', "full") +

        "</div>" +

        // Honeypot (anti-spam, ukryty)
        '<input type="checkbox" name="botcheck" tabindex="-1" style="position:absolute;left:-9999px" aria-hidden="true">' +

        '<label class="pl-check">' +
          '<input type="checkbox" name="rodo" required>' +
          '<span>Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania ofertowego, zgodnie z <a href="' + (C.config.privacyUrl || "#") + '" target="_blank" rel="noopener">polityką prywatności (RODO)</a>. *</span>' +
        "</label>" +

        '<button class="pl-form__submit" type="submit">' + (C.copy.contact.formCta || "Wyślij zapytanie") + " " + PL.icon("arrow", { size: 18 }) + "</button>" +
        '<p class="pl-form__status" data-form-status role="status" aria-live="polite"></p>' +
      "</form>";

    wireForm(mount.querySelector("form"));

    function field(label, control, extra) {
      return '<label class="pl-field ' + (extra ? "pl-field--" + extra : "") + '">' +
        '<span class="pl-field__label">' + label + "</span>" + control + "</label>";
    }
  };

  function wireForm(form) {
    if (!form) return;
    var status = form.querySelector("[data-form-status]");
    var cfg = C.config;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "pl-form__status";
      status.textContent = "";

      // walidacja natywna
      if (!form.checkValidity()) {
        var firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.reportValidity();
        setStatus("Uzupełnij wymagane pola.", "error");
        return;
      }
      if (form.botcheck && form.botcheck.checked) return; // bot

      var d = collect(form);
      var mode = (cfg.form && cfg.form.mode) || "mailto";

      if (mode === "web3forms" && cfg.form.accessKey) {
        sendWeb3Forms(d);
      } else if (mode === "formspree" && cfg.form.accessKey) {
        sendFormspree(d);
      } else {
        sendMailto(d);
      }
    });

    function collect(f) {
      var g = function (n) { return (f.elements[n] && f.elements[n].value || "").trim(); };
      return {
        termin: g("termin"), typ: g("typ"), goscie: g("goscie"),
        sala: g("sala"), miejscowosc: g("miejscowosc"), wojewodztwo: g("wojewodztwo"),
        imie: g("imie"), email: g("email"), telefon: g("telefon"), wiadomosc: g("wiadomosc")
      };
    }

    function bodyText(d) {
      return [
        "ZAPYTANIE OFERTOWE — PYK ŁYK",
        "----------------------------------------",
        "Termin imprezy:  " + d.termin,
        "Typ imprezy:     " + d.typ,
        "Liczba gości:    " + d.goscie,
        "Sala / miejsce:  " + (d.sala || "—"),
        "Miejscowość:     " + d.miejscowosc,
        "Województwo:     " + d.wojewodztwo,
        "----------------------------------------",
        "Imię i nazwisko: " + d.imie,
        "E-mail:          " + d.email,
        "Telefon:         " + (d.telefon || "—"),
        "----------------------------------------",
        "Wiadomość:",
        d.wiadomosc,
        "",
        "Zgoda RODO: TAK"
      ].join("\n");
    }

    function sendMailto(d) {
      var url = "mailto:" + cfg.email +
        "?subject=" + encodeURIComponent(cfg.formSubject) +
        "&body=" + encodeURIComponent(bodyText(d));
      setStatus("Otwieram Twój program pocztowy… Jeśli się nie otworzył, zadzwoń: " + cfg.phone, "info");
      window.location.href = url;
    }

    function sendWeb3Forms(d) {
      setStatus("Wysyłam…", "info");
      var payload = Object.assign({
        access_key: cfg.form.accessKey,
        subject: cfg.formSubject,
        from_name: "Formularz PYK ŁYK — " + d.imie
      }, d);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success) { form.reset(); setStatus("Dziękujemy! Zapytanie zostało wysłane — odezwiemy się wkrótce.", "success"); }
          else setStatus("Nie udało się wysłać. Zadzwoń: " + cfg.phone, "error");
        })
        .catch(function () { setStatus("Błąd połączenia. Zadzwoń: " + cfg.phone, "error"); });
    }

    function sendFormspree(d) {
      setStatus("Wysyłam…", "info");
      var fd = new FormData();
      Object.keys(d).forEach(function (k) { fd.append(k, d[k]); });
      fd.append("_subject", cfg.formSubject);
      fetch(cfg.form.accessKey, { method: "POST", headers: { Accept: "application/json" }, body: fd })
        .then(function (r) { return r.json(); })
        .then(function () { form.reset(); setStatus("Dziękujemy! Zapytanie zostało wysłane.", "success"); })
        .catch(function () { setStatus("Błąd połączenia. Zadzwoń: " + cfg.phone, "error"); });
    }

    function setStatus(msg, type) {
      status.textContent = msg;
      status.className = "pl-form__status is-" + type;
    }
  }

  /* ---------------------------------------------------------------------------
     LICZNIKI — animacja liczb, gdy wejdą w widok  ([data-counter="1000"])
     --------------------------------------------------------------------------- */
  PL.initCounters = function () {
    var els = document.querySelectorAll("[data-counter]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        animate(en.target);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });

    function animate(el) {
      var target = parseFloat(el.getAttribute("data-counter")) || 0;
      var dur = 1600, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("pl-PL");
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("pl-PL");
      }
      requestAnimationFrame(step);
    }
  };

  /* ---------------------------------------------------------------------------
     SCROLL-REVEAL — dodaje .is-visible do [data-reveal]
     --------------------------------------------------------------------------- */
  PL.initReveal = function () {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  };

  /* ---------------------------------------------------------------------------
     NAWIGACJA — mobilne menu, smooth-scroll, scrollspy, stan nagłówka
     --------------------------------------------------------------------------- */
  PL.initNav = function () {
    var header = document.querySelector("[data-header]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // zamknięcie menu: klawisz Escape oraz klik w przyciemnione tło (poza panelem)
    function closeNav() {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeNav();
    });
    document.addEventListener("click", function (e) {
      if (!document.body.classList.contains("nav-open")) return;
      if ((nav && nav.contains(e.target)) || (toggle && toggle.contains(e.target))) return;
      closeNav();
    });

    // Smooth-scroll kotwic ODPORNY na zmiany układu.
    // Zwykłe „policz cel raz i przewiń" zawodzi, gdy w trakcie przewijania doładują
    // się zdjęcia/fonty i strona urośnie (cel ucieka w dół → lądujemy za wysoko).
    // Tu cel jest przeliczany także PO kliknięciu, aż układ się ustabilizuje;
    // korekcję przerywamy natychmiast, gdy użytkownik sam przewinie stronę.
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var SCROLL_KEYS = { ArrowUp: 1, ArrowDown: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1, " ": 1, Spacebar: 1 };
    var activeNav = null;

    function headerOffset() { return (header ? header.offsetHeight : 0) - 1; }
    function targetY(t) { return Math.max(0, t.getBoundingClientRect().top + window.pageYOffset - headerOffset()); }

    function goToAnchor(t) {
      if (activeNav) activeNav.cancel();                 // bez wyścigu przy szybkich kliknięciach
      var behavior = reduceMotion ? "auto" : "smooth";
      var lastWant = -1, done = false, poll = null, deadline = null, stable = 0;

      function aim(force) {
        if (done) return;
        var want = targetY(t);
        if (force || Math.abs(want - lastWant) > 3) {    // reaguj tylko na realny ruch celu (nie na szum sub-pikselowy)
          lastWant = want;
          window.scrollTo({ top: want, behavior: behavior });
        }
      }
      function cancel() {
        if (done) return;
        done = true;
        if (poll) clearTimeout(poll);
        if (deadline) clearTimeout(deadline);
        window.removeEventListener("wheel", onUser);
        window.removeEventListener("touchmove", onUser);
        window.removeEventListener("keydown", onKey);
        document.removeEventListener("load", onLoad, true);
        if (activeNav === ctl) activeNav = null;
      }
      function onUser() { cancel(); }                      // użytkownik sam przewija → zostaw go w spokoju
      function onKey(e) { if (SCROLL_KEYS[e.key]) cancel(); }
      function onLoad(e) {                                 // obraz nad sekcją się doładował → popraw cel
        var tag = e && e.target && e.target.tagName;
        if (tag === "IMG" || tag === "SOURCE") aim(false);
      }
      function tick() {
        if (done) return;
        var want = targetY(t);
        if (Math.abs(want - lastWant) > 3) { aim(true); stable = 0; }
        else if (Math.abs(want - window.pageYOffset) <= 2 && ++stable >= 3) { poll = null; return; }  // na miejscu; nasłuch zostaje do deadline
        poll = setTimeout(tick, 90);
      }

      window.addEventListener("wheel", onUser, { passive: true });
      window.addEventListener("touchmove", onUser, { passive: true });
      window.addEventListener("keydown", onKey);
      document.addEventListener("load", onLoad, true);     // 'load' obrazków nie bąbelkuje → faza przechwytywania

      var ctl = { cancel: cancel, aim: aim };
      activeNav = ctl;
      aim(true);                                           // pierwszy skok
      poll = setTimeout(tick, 90);
      deadline = setTimeout(cancel, 4000);                 // twardy koniec korekcji (~4 s)
    }

    // Późne doładowanie fontów (Google Fonts, display=swap) też przesuwa sekcje —
    // gdy będą gotowe, popraw aktywny cel.
    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
      document.fonts.ready.then(function () { if (activeNav) activeNav.aim(false); });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        goToAnchor(t);
      });
    });

    // stan nagłówka po przewinięciu
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.pageYOffset > 30); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }

    // scrollspy — podświetlanie aktywnej sekcji w menu
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-navlink]"));
    var sections = links.map(function (l) { return document.querySelector(l.getAttribute("href")); }).filter(Boolean);
    if (sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }
  };

  /* ---------------------------------------------------------------------------
     FAQ — akordeon.  Struktura:
       <div data-faq-item><button data-faq-q>…</button><div data-faq-a>…</div></div>
     --------------------------------------------------------------------------- */
  PL.initFaq = function () {
    document.querySelectorAll("[data-faq-item]").forEach(function (item) {
      var q = item.querySelector("[data-faq-q]");
      var a = item.querySelector("[data-faq-a]");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
        a.style.maxHeight = open ? a.scrollHeight + "px" : null;
      });
    });
  };

  /* ===========================================================================
     WSPÓLNE RENDERERY SEKCJI  (dane z content.js → spójny HTML z klasami-hakami)
     Wersje stylują klasy .pl-* własnym CSS. Montaż automatyczny przez atrybut:
        <div data-render="stats"></div>      liczniki
        <div data-render="included"></div>   co w cenie (oferta)
        <div data-render="menu"></div>        karta drinków (zakładki)
        <div data-render="packages"></div>    pakiety dodatkowe
        <div data-render="faq"></div>         FAQ (akordeon)
        <div data-render="reviews"></div>     opinie
        <div data-render="gallery"></div>     galeria zdjęć
        <div data-form></div>                 formularz zapytania
     =========================================================================== */
  function el(sel) { return typeof sel === "string" ? document.querySelector(sel) : sel; }
  function ing(list) { return list.join(" · "); }

  PL.renderStats = function (target) {
    var t = el(target); if (!t) return;
    t.innerHTML = C.stats.map(function (s) {
      return '<div class="pl-stat" data-reveal>' +
        '<span class="pl-stat__num"><span data-counter="' + s.value + '">0</span>' +
        (s.suffix ? '<span class="pl-stat__suffix">' + s.suffix + "</span>" : "") + "</span>" +
        '<span class="pl-stat__label">' + s.label + "</span></div>";
    }).join("");
  };

  PL.renderIncluded = function (target) {
    var t = el(target); if (!t) return;
    t.innerHTML = C.included.map(function (it, i) {
      return '<article class="pl-inc" data-reveal data-reveal-delay="' + (i % 4) + '">' +
        '<span class="pl-inc__icon">' + PL.icon(it.icon, { size: 26 }) + "</span>" +
        '<h3 class="pl-inc__title">' + it.title + "</h3>" +
        '<p class="pl-inc__desc">' + it.desc + "</p></article>";
    }).join("");
  };

  PL.renderMenu = function (target) {
    var t = el(target); if (!t) return;
    var m = C.menu;
    var groups = [
      { key: "alc",  label: "Alkoholowe",   items: m.alcoholic },
      { key: "non",  label: "Bezalkoholowe",items: m.nonAlcoholic },
      { key: "shot", label: "Shoty",        items: m.shots }
    ];
    function items(arr) {
      return arr.map(function (d) {
        return '<li class="pl-menu__item"><span class="pl-menu__name">' + d.name +
          '</span><span class="pl-menu__ing">' + ing(d.ingredients) + "</span></li>";
      }).join("");
    }
    t.innerHTML = '<div class="pl-menu">' +
      '<div class="pl-menu__tabs" role="tablist">' +
        groups.map(function (g, i) {
          return '<button class="pl-menu__tab' + (i === 0 ? " is-active" : "") + '" role="tab" data-tab="' + g.key + '">' +
            g.label + ' <span class="pl-menu__count">' + g.items.length + "</span></button>";
        }).join("") +
      "</div>" +
      '<div class="pl-menu__panels">' +
        groups.map(function (g, i) {
          return '<div class="pl-menu__panel' + (i === 0 ? " is-active" : "") + '" data-panel="' + g.key + '">' +
            '<ul class="pl-menu__list">' + items(g.items) + "</ul></div>";
        }).join("") +
      "</div></div>";
    // interakcja zakładek
    var tabs = t.querySelectorAll(".pl-menu__tab");
    var panels = t.querySelectorAll(".pl-menu__panel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("is-active"); });
        panels.forEach(function (x) { x.classList.remove("is-active"); });
        tab.classList.add("is-active");
        var p = t.querySelector('.pl-menu__panel[data-panel="' + tab.getAttribute("data-tab") + '"]');
        if (p) p.classList.add("is-active");
      });
    });
  };

  PL.renderPackages = function (target) {
    var t = el(target); if (!t) return;
    t.innerHTML = C.packages.map(function (p, i) {
      return '<article class="pl-pkg" data-reveal data-reveal-delay="' + i + '">' +
        '<header class="pl-pkg__head"><h3 class="pl-pkg__name">' + p.name +
          '<sup class="pl-pkg__badge">' + p.badge + "</sup></h3></header>" +
        '<ul class="pl-pkg__drinks">' +
          p.drinks.map(function (d) {
            return '<li class="pl-pkg__drink"><span class="pl-pkg__dname">' + d.name +
              '</span><span class="pl-pkg__ding">' + ing(d.ingredients) + "</span></li>";
          }).join("") +
        "</ul></article>";
    }).join("");
  };

  PL.renderFaq = function (target) {
    var t = el(target); if (!t) return;
    t.innerHTML = C.faq.map(function (f) {
      return '<div class="pl-faq__item" data-faq-item data-reveal>' +
        '<button class="pl-faq__q" data-faq-q><span class="pl-faq__qtext">' + f.q + "</span>" +
          '<span class="pl-faq__icon">' + PL.icon("chevron", { size: 20 }) + "</span></button>" +
        '<div class="pl-faq__a" data-faq-a><div class="pl-faq__a-inner"><p>' + f.a + "</p></div></div></div>";
    }).join("");
  };

  PL.renderReviews = function (target) {
    var t = el(target); if (!t) return;
    t.innerHTML = C.reviews.map(function (r, i) {
      return '<figure class="pl-review" data-reveal data-reveal-delay="' + (i % 4) + '">' +
        '<div class="pl-review__stars">' + Array(5).join("") +
          [0,1,2,3,4].map(function () { return PL.icon("star", { size: 18 }); }).join("") + "</div>" +
        '<blockquote class="pl-review__text">' + r.text + "</blockquote>" +
        '<figcaption class="pl-review__author"><span class="pl-review__name">' + r.author +
          '</span><span class="pl-review__meta">' + r.meta + "</span></figcaption></figure>";
    }).join("");
  };

  // Wymiary źródłowe zdjęć galerii (px) → pozwalają zarezerwować wysokość kafelka
  // ZANIM obraz się doładuje, więc masonry nie „rośnie" i kotwice trafiają w cel.
  var GAL_DIMS = {
    "cocktails-01": [1800, 1350], "cocktails-02": [1399, 1727], "cocktails-03": [1317, 1800],
    "cocktails-04": [1350, 1800], "cocktails-05": [1351, 1800], "cocktails-06": [960, 879],
    "cocktails-07": [1515, 1800], "cocktails-08": [1350, 1800], "cocktails-09": [1320, 1800],
    "cocktails-10": [1281, 1800], "cocktails-11": [1350, 1800], "cocktails-12": [1350, 1800],
    "cocktails-13": [1083, 1800], "detail-mojito": [1440, 1800], "detail-whisky": [1350, 1800],
    "bar-lights": [1477, 1800], "bartender-01": [1620, 1080], "bartender-fire": [960, 638],
    "bartender-04": [1470, 1800], "bar-wood-01": [1350, 1800], "couple-01": [1350, 1800],
    "couple-03": [1125, 1800]
  };

  PL.renderGallery = function (target) {
    var t = el(target); if (!t) return;
    t.innerHTML = C.images.gallery.map(function (name, i) {
      var d = GAL_DIMS[name] || [3, 4];   // brak wpisu → proporcje 3/4; miejsce i tak jest rezerwowane
      return '<figure class="pl-gal__item" data-reveal data-reveal-delay="' + (i % 4) + '">' +
        PL.img(name, { className: "pl-gal__pic", alt: "Pyk Łyk — realizacja", width: d[0], height: d[1] }) + "</figure>";
    }).join("");
  };

  function autoRender() {
    document.querySelectorAll("[data-render]").forEach(function (node) {
      switch (node.getAttribute("data-render")) {
        case "stats":    PL.renderStats(node); break;
        case "included": PL.renderIncluded(node); break;
        case "menu":     PL.renderMenu(node); break;
        case "packages": PL.renderPackages(node); break;
        case "faq":      PL.renderFaq(node); break;
        case "reviews":  PL.renderReviews(node); break;
        case "gallery":  PL.renderGallery(node); break;
      }
    });
    if (document.querySelector("[data-form]")) PL.renderForm("[data-form]");
  }

  /* ---------------------------------------------------------------------------
     AUTO-INIT
     --------------------------------------------------------------------------- */
  function boot() {
    try { autoRender(); } catch (e) { console.error(e); }   // najpierw wstrzyknij treść…
    try { PL.initNav(); } catch (e) {}
    try { PL.initCounters(); } catch (e) {}                 // …potem podłącz zachowania
    try { PL.initReveal(); } catch (e) {}
    try { PL.initFaq(); } catch (e) {}
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

})();
