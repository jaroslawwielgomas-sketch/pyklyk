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

    email:       "kontakt@pyklyk.pl",
    emailHref:   "mailto:kontakt@pyklyk.pl",

    // Temat maila z formularza — WYMAGANY dokładnie w tej formie:
    formSubject: "Zapytanie ofertowe- strona internetowa PYK ŁYK",

    // Strona polityki prywatności (link przy checkboxie RODO). Strona serwowana z katalogu głównego.
    privacyUrl: "polityka-prywatnosci.html",

    // Formularz działa przez Web3Forms. Zmień accessKey tylko wtedy,
    // gdy przenosisz formularz na inne konto Web3Forms.
    form: {
      mode:      "web3forms",              // "mailto" | "web3forms" | "formspree"
      accessKey: "0f2104de-ddbc-4e9a-a7f7-107ee351d483", // klucz Web3Forms / endpoint Formspree
    },

    // Logo (ścieżki względem katalogu głównego strony). Wersje na jasnym tle
    // używają logo-light, na ciemnym — logo-dark.
    logo: {
      light:   "assets/logo/logo-light.png",   // czarny napis — na jasne tło
      dark:    "assets/logo/logo-dark.png",     // biały napis — na ciemne tło
      favicon: "assets/logo/favicon.png"
    },

    area:        "Mazowieckie · Łódzkie · Lubelskie",
    areaLong:    "Działamy głównie na Mazowszu oraz w województwie łódzkim i lubelskim — do ok. 150 km od Warszawy.",

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
    { value: 37,   suffix: "", label: "drinków w karcie" },
    { value: 100,  suffix: "+", label: "pozytywnych opinii" }
  ],

  /* -------------------------------------------------------------------------
     GŁÓWNE TEKSTY (Hero + wstępy sekcji) — wspólne dla wersji
     ------------------------------------------------------------------------- */
  copy: {
    hero: {
      kicker:   "Profesjonalna obsługa barmańska",
      title:    "Barman na wesele i mobilny drink bar",
      subtitle: "Mobilny bar, autorskie koktajle i barmani z pasją — sprawimy, że Twoje wesele lub event zapamiętają wszyscy goście.",
      ctaPrimary:   "Zapytaj o termin",
      ctaSecondary: "Zobacz ofertę"
    },

    about: {
      kicker: "O nas",
      title:  "12 lat za barem. Ponad 1000 udanych imprez.",
      lead:   "Jesteśmy zespołem doświadczonych barmanów, których łączy jedna pasja — tworzenie niezapomnianych koktajli.",
      body: [
        "Od 12 lat jako Pyk Łyk tworzymy niezapomniane koktajle i wyjątkową atmosferę. Zapewniamy profesjonalną obsługę barmańską na weselach i eventach, działając głównie na terenie województw: mazowieckiego, lubelskiego i łódzkiego.",
        "Pracujemy w pełni kompleksowo – po Twojej stronie zostaje jedynie przygotowanie 3–5 litrów czystej wódki. Całą logistyką (od zakupów, przez szkło, lód, dopasowane dekoracje, aż po sprzątanie) zajmujemy się my. Dysponujemy kilkoma doświadczonymi ekipami, co gwarantuje pełną niezawodność, nawet przy wielu realizacjach jednego dnia."
      ],
      points: [
        "Kompleksowość: My organizujemy bar, Ty cieszysz się imprezą.",
        "Wizualny zachwyt: Autorskie menu i pięknie udekorowane, przyciągające wzrok drinki.",
        "Pewność: Rozbudowany zespół gotowy do działania."
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
      lead:   "Pakiet Standard obejmuje 21 pozycji: 12 drinków alkoholowych, 6 bezalkoholowych oraz 3 shoty. Menu możesz rozszerzyć o pakiety dodatkowe: Dolce Vita, Gentlemen's Club, Meister’s Selection i Fruit Star Selection."
    },

    packages: {
      kicker: "Pakiety dodatkowe",
      title:  "Chcesz rozszerzyć menu?",
      lead:   "Pakiety dodatkowe pozwalają rozszerzyć kartę o prosecco, whisky, jägermeistera i efektowne owocowe koktajle. Cena pakietu zależy od liczby gości."
    },

    reviews: {
      kicker: "Opinie",
      title:  "Zaufało nam ponad 1000 par i firm",
      lead:   "Zweryfikowane opinie w serwisie Wesele z Klasą potwierdzają średnią 5,00/5 przy 47 recenzjach, a dodatkowe rekomendacje klientów znajdziesz także na Facebooku."
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
    desc:  "W prezencie od firmy przygotowujemy dla Pary Młodej wyjątkowy welcome drink"
  },

  /* -------------------------------------------------------------------------
     KARTA DRINKÓW  (skład wg oferty — bez cen)
     ------------------------------------------------------------------------- */
  menu: {
    alcoholic: [
      { name: "Biały/czarny rusek", ingredients: ["wódka", "śmietanka/cola", "likier kawowy"] },
      { name: "Blue lagoon",     ingredients: ["sprite", "sok z cytryny", "blue curacao", "wódka"] },
      { name: "Cuba libre",      ingredients: ["rum", "cola", "limonka"] },
      { name: "Eksplozja",       ingredients: ["gin", "martini", "wódka", "sprite", "blue curacao"] },
      { name: "Gin & Tonic",     ingredients: ["gin", "tonic"] },
      { name: "Gremlin",         ingredients: ["wódka", "sok pomarańczowy", "blue curacao"] },
      { name: "Jamaica",         ingredients: ["malibu", "wódka", "sok pomarańczowy", "sok ananasowy", "blue curaçao", "grenadina"] },
      { name: "Martini Bianco Royal", ingredients: ["martini", "sok z cytryny", "mięta", "sprite"] },
      { name: "Mojito (classic/owocowe)", ingredients: ["rum", "woda gazowana", "mięta", "limonka", "cukier brązowy"] },
      { name: "Pina colada",     ingredients: ["rum", "malibu", "sok ananasowy", "śmietanka"] },
      { name: "Sex on the Beach",ingredients: ["wódka", "likier brzoskwiniowy", "sok pomarańczowy", "sok żurawinowy"] },
      { name: "Tequila sunrise", ingredients: ["tequila", "sok pomarańczowy", "grenadina"] }
    ],
    nonAlcoholic: [
      { name: "Błękit nieba",         ingredients: ["sprite", "cytryna", "blue curacao"] },
      { name: "Kokosowa przyjemność", ingredients: ["sok pomarańczowy", "sok cytrynowy", "syrop kokosowy", "blue curacao"] },
      { name: "Mint fresh",           ingredients: ["mięta", "limonka", "cukier brązowy", "sok jabłkowy"] },
      { name: "Różowa pantera",       ingredients: ["sok pomarańczowy", "sok ananasowy", "grenadina", "śmietanka"] },
      { name: "Virgin mojito",        ingredients: ["sprite", "mięta", "cukier trzcinowy", "limonka"] },
      { name: "Zielona dróżka",       ingredients: ["sok pomarańczowy", "blue curacao"] }
    ],
    shots: [
      { name: "Kamikaze",      ingredients: ["wódka", "sok cytrynowy", "blue curacao"] },
      { name: "Tequila",       ingredients: ["tequila", "sól", "cytryna"] },
      { name: "Wściekły pies", ingredients: ["wódka", "grenadina", "tabasco"] }
    ]
  },

  /* -------------------------------------------------------------------------
     PAKIETY DODATKOWE (bez cen — tylko skład)
     ------------------------------------------------------------------------- */
  packages: [
    {
      name: "Dolce Vita",
      badge: "+",
      drinks: [
        { name: "Aperol Spritz", ingredients: ["aperol", "prosecco", "woda gazowana"] },
        { name: "Hugo",          ingredients: ["limonka", "mięta", "prosecco", "syrop z czarnego bzu", "woda gazowana"] },
        { name: "Aperol sour",   ingredients: ["aperol", "sok z cytryny", "syrop cukrowy"] },
        { name: "Mimoza",        ingredients: ["prosecco", "sok pomarańczowy"] }
      ]
    },
    {
      name: "Gentlemen's Club",
      badge: "+",
      drinks: [
        { name: "Old Fashioned", ingredients: ["whisky", "cukier trzcinowy", "angostura", "woda gazowana", "skórka pomarańczy"] },
        { name: "Whisky & Cola", ingredients: ["whisky", "cola"] },
        { name: "Whisky Sour",   ingredients: ["whisky", "białko", "angostura", "sok z cytryny"] },
        { name: "Lynchburg Lemonade", ingredients: ["whisky", "triple sec", "sok z cytryny", "sprite"] }
      ]
    },
    {
      name: "Meister’s Selection",
      badge: "+",
      drinks: [
        { name: "Jagier Bomb", ingredients: ["jägermeister", "red bull"] },
        { name: "Surfer",     ingredients: ["jägermeister", "malibu", "sok ananasowy"] },
        { name: "Black Sunrise", ingredients: ["jägermeister", "sok pomarańczowy", "syrop grenadyna"] },
        { name: "Jager sour", ingredients: ["jägermeister", "białko", "angostura", "sok z cytryny"] }
      ]
    },
    {
      name: "Fruit Star Selection",
      badge: "+",
      drinks: [
        { name: "Porn star martini", ingredients: ["wódka", "syrop waniliowy", "przecier z marakui", "limonka", "shot prosecco"] },
        { name: "Mango Bay", ingredients: ["wódka", "przecier z mango", "sok żurawinowy", "sok z cytryny"] },
        { name: "Tropical Punch", ingredients: ["wódka", "przecier z mango", "sok ananasowy", "sok z limonki", "grenadina"] },
        { name: "Passion Daiquiri", ingredients: ["biały rum", "przecier z marakui", "sok z limonki", "syrop cukrowy", "świeża mięta"] }
      ]
    }
  ],

  /* -------------------------------------------------------------------------
     OPINIE — źródłowe podsumowania publicznych opinii z profilu Wesele z Klasą.
     Nie są to fikcyjne cytaty; teksty są parafrazą najczęściej powtarzających się
     ocen klientów, z linkiem do źródła pod sekcją opinii.
     ------------------------------------------------------------------------- */
  reviews: [
    { text: "47 publicznych opinii i średnia 5,00/5. Klienci najczęściej chwalą dopracowane koktajle, profesjonalną obsługę, estetykę podania i dobry kontakt.", author: "Profil Pyk Łyk", meta: "Wesele z Klasą" },
    { text: "Po weselu w Warszawie klientka podkreśliła sprawną obsługę, koktajle dopracowane w szczegółach i poczucie, że goście byli dobrze zaopiekowani.", author: "Karolina", meta: "Zweryfikowana opinia, Warszawa" },
    { text: "Pary młode zwracają uwagę, że drink bar staje się realną atrakcją wesela, a goście chętnie wracają po kolejne koktajle.", author: "Agata", meta: "Opinia po weselu, Parzno" },
    { text: "W opiniach często pojawiają się bardzo smaczne drinki, elegancki wygląd koktajli oraz kulturalna i sympatyczna obsługa barmańska.", author: "Anna i Wioletta", meta: "Opinie klientów, Mazowieckie" }
  ],

  /* -------------------------------------------------------------------------
     FAQ — najczęstsze pytania
     ------------------------------------------------------------------------- */
  faq: [
    {
      q: "Dlaczego warto wybrać Pyk Łyk jako drink bar na wesele?",
      a: "Pyk Łyk łączy 12 lat doświadczenia, ponad 1000 realizacji, dwóch barmanów na przyjęciu, mobilny bar, pełne wyposażenie, szkło, lód, napoje, alkohole i autorskie koktajle. Na profilu Wesele z Klasą firma ma średnią 5,00/5 z 47 opinii, a dodatkowe rekomendacje klientów można znaleźć także na Facebooku."
    },
    {
      q: "Z jakim wyprzedzeniem najlepiej rezerwować termin?",
      a: "Im wcześniej, tym lepiej — najlepsze terminy weselne (piątki i soboty w sezonie) rezerwują się z dużym wyprzedzeniem. Dysponujemy kilkoma ekipami barmańskimi, więc jesteśmy w stanie obsłużyć nawet kilka imprez tego samego dnia. Napisz lub zadzwoń, a sprawdzimy dostępność Twojej daty."
    },
    {
      q: "Jak wygląda rezerwacja terminu?",
      a: "To naprawdę proste. Po akceptacji oferty, aby zarezerwować termin, wystarczy wypełnić i podpisać skan umowy — cały proces możemy załatwić w 100% online. Jesteśmy też gotowi spotkać się osobiście przy podpisaniu umowy. Zaliczka nie jest wymagana."
    },
    {
      q: "Jakie imprezy obsługujecie?",
      a: "Obsługujemy różnorodne wydarzenia: wesela, imprezy okolicznościowe, urodziny i osiemnastki, wieczory panieńskie, imprezy firmowe, imprezy plenerowe oraz imprezy tematyczne (np. świąteczne czy w klimacie Halloween)."
    },
    {
      q: "Czy Pyk Łyk to barman na wesele w Warszawie i na Mazowszu?",
      a: "Tak. Pyk Łyk zapewnia profesjonalnego barmana na wesele, mobilny drink bar i kompleksową obsługę barmańską w Warszawie, na Mazowszu oraz w wybranych lokalizacjach województwa łódzkiego i lubelskiego. Najczęściej dojeżdżamy do ok. 150 km od Warszawy."
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
      q: "Kto zajmuje się myciem i zbieraniem szkła?",
      a: "Zawsze staramy się dostosować do polityki sali, w której wykonujemy usługę. Jeśli sala pomaga w zbieraniu i myciu szkła, jest to dla nas duże ułatwienie. Jeśli nie ma takiej możliwości, serwisem szkła — zbieraniem i myciem — zajmujemy się w pełni sami."
    },
    {
      q: "Czy menu i ofertę można personalizować?",
      a: "Oczywiście. Standardowa karta to punkt wyjścia — chętnie przygotujemy koktajle spoza menu i dopasujemy ofertę do motywu przewodniego Waszej imprezy. Dla Pary Młodej mamy też welcome drink w prezencie."
    },
    {
      q: "Ile kosztuje obsługa baru?",
      a: "Cena zależy przede wszystkim od liczby gości i terminu imprezy — dlatego przygotowujemy indywidualną wycenę. Wyślij zapytanie przez formularz lub zadzwoń pod 513 595 540, a szybko przedstawimy propozycję."
    },
    {
      q: "Gdzie dojeżdża Wasz mobilny drink bar i w jakich miastach obsługujecie wesela?",
      a: "Nasz główny obszar działania to Warszawa oraz miejscowości w promieniu do 150 km. Najczęściej zapewniamy profesjonalnego barmana na wesele w takich miastach jak: Warszawa, Łódź, Radom, Płock, Siedlce, Skierniewice i Puławy. Jesteśmy w pełni elastyczni, dlatego z przyjemnością zorganizujemy kompleksową obsługę barmańską w dowolnym miejscu na terenie województwa mazowieckiego, łódzkiego i północnej części lubelskiego.",
      map: {
        title: "Obszar dojazdu Pyk Łyk",
        label: "Orientacyjny promień dojazdu 150 km od Warszawy z największymi miastami w zasięgu",
        note: "Promień jest orientacyjny. Dalsze lokalizacje wyceniamy indywidualnie.",
        radiusKm: 150,
        center: { name: "Warszawa", lat: 52.2297, lon: 21.0122 },
        cities: [
          { name: "Warszawa", lat: 52.2297, lon: 21.0122, type: "hub", dx: 14, dy: -14, anchor: "start" },
          { name: "Łódź", lat: 51.7592, lon: 19.4560, type: "major", dx: -14, dy: 5, anchor: "end" },
          { name: "Radom", lat: 51.4027, lon: 21.1471, type: "major", dx: -12, dy: 18, anchor: "end" },
          { name: "Płock", lat: 52.5468, lon: 19.7064, type: "major", dx: -12, dy: -10, anchor: "end" },
          { name: "Siedlce", lat: 52.1676, lon: 22.2902, type: "major", dx: 12, dy: 5, anchor: "start" },
          { name: "Puławy", lat: 51.4164, lon: 21.9694, type: "major", dx: 13, dy: 19, anchor: "start" },
          { name: "Skierniewice", lat: 51.9549, lon: 20.1583, dx: -12, dy: 18, anchor: "end" },
          { name: "Ciechanów", lat: 52.8814, lon: 20.6199, dx: -13, dy: -10, anchor: "end" },
          { name: "Ostrołęka", lat: 53.0833, lon: 21.5667, dx: 12, dy: -12, anchor: "start" },
          { name: "Łomża", lat: 53.1781, lon: 22.0594, dx: 12, dy: -10, anchor: "start" },
          { name: "Piotrków Tryb.", lat: 51.4052, lon: 19.7030, dx: -12, dy: 22, anchor: "end" },
          { name: "Tomaszów Maz.", lat: 51.5313, lon: 20.0086, dx: -12, dy: 10, anchor: "end" }
        ]
      }
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
