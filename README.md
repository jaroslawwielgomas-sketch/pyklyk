# Pyk Łyk — strona internetowa

Strona-wizytówka (one-page) firmy **Pyk Łyk** — mobilny bar / obsługa barmańska na wesela i eventy.
Cel: pozyskiwanie zapytań ofertowych (formularz) i telefonów.

Projekt jest przygotowany jako **wspólny fundament + 4 wersje wizualne do wyboru**.
Wszystkie wersje mają **identyczną treść, zdjęcia i formularz** — różni je tylko wygląd,
kolorystyka i układ. Po wyborze jednej wersji promujemy ją na stronę główną.

---

## 📁 Struktura

```
Strona/
├── index.html                  ← strona-rozdzielacz (podgląd i wybór 4 wersji)
├── polityka-prywatnosci.html   ← polityka prywatności / RODO (UZUPEŁNIJ dane firmy)
│
├── shared/                     ← WSPÓLNY FUNDAMENT (współdzielony przez wszystkie wersje)
│   ├── content.js              ← 🟢 CAŁA TREŚĆ w jednym miejscu (menu, oferta, FAQ, kontakt…)
│   ├── app.js                  ← silnik: formularz, ikony, animacje, renderery sekcji
│   └── base.css                ← reset + kontrakt zmiennych + style formularza
│
├── assets/
│   ├── logo/                   ← logo-light.png, logo-dark.png, favicon, apple-touch-icon
│   ├── img/                    ← zoptymalizowane zdjęcia (WebP + JPG) + og-image
│   └── previews/               ← miniatury wersji na stronie-rozdzielaczu
│
├── v1-elegant-noir/            ← Wersja 1 (index.html + styles.css)
├── v2-jasny-elegancki/         ← Wersja 2
├── v3-bold-brand/              ← Wersja 3
└── v4-rustykalny-glam/         ← Wersja 4
```

---

## ✏️ Jak zmieniać treść (najważniejsze!)

**Prawie wszystko zmienia się w jednym pliku: [`shared/content.js`](shared/content.js).**
Zmiana tam = zmiana we **wszystkich 4 wersjach naraz**. Znajdziesz tam m.in.:

- **telefon, e-mail, temat maila z formularza, linki social** — sekcja `config`
- **liczniki** (1000+ imprez, 12 lat…) — `stats`
- **teksty hero i wstępy sekcji** — `copy`
- **co wchodzi w skład usługi** — `included` + prezent `gift`
- **karta drinków** (14 / 6 / 3) — `menu`
- **pakiety dodatkowe** — `packages`
- **opinie** — `reviews` *(⚠ obecnie PRZYKŁADOWE — patrz niżej)*
- **FAQ** — `faq`
- **typy imprez i województwa w formularzu** — `eventTypes`, `voivodeships`

> Pliki HTML poszczególnych wersji zmienia się tylko wtedy, gdy chcesz ruszyć **wygląd/układ**.

### ⚠ Opinie do podmiany
W `content.js` (`reviews`) są **przykładowe** opinie. Przed publikacją wstaw prawdziwe cytaty
z Facebooka i Wesele z Klasą (linki do źródeł są już na stronie).

---

## 📨 Formularz — jak włączyć realną wysyłkę maili

Zgłoszenia mają trafiać na **jaroslaw.wielgomas@gmail.com** z tytułem
**„Zapytanie ofertowe- strona internetowa PYK ŁYK”**.

Na stronie statycznej (GitHub Pages) potrzebny jest do tego darmowy „pośrednik”. Domyślnie
działa tryb **mailto** (otwiera program pocztowy). Aby maile przychodziły automatycznie:

1. Wejdź na **https://web3forms.com** → podaj swój e-mail → dostaniesz **Access Key** (za darmo).
2. Otwórz [`shared/content.js`](shared/content.js) i w sekcji `config.form` ustaw:
   ```js
   form: {
     mode: "web3forms",
     accessKey: "TWÓJ-KLUCZ-Z-WEB3FORMS"
   }
   ```
3. Gotowe — zgłoszenia będą przychodzić na maila z właściwym tytułem, wraz ze zgodą RODO.

*(Alternatywnie działa Formspree — `mode: "formspree"`, a w `accessKey` wklej adres endpointu.)*

Formularz ma **wymagany checkbox RODO** linkujący do `polityka-prywatnosci.html`.

---

## 🚀 Publikacja na GitHub Pages

1. Utwórz repozytorium na GitHub (np. `pyklyk-strona`).
2. Wrzuć **zawartość folderu `Strona/`** do repozytorium (pliki `index.html`, `shared/`,
   `assets/`, `v1-…` itd. mają być w katalogu głównym repo).
3. W repo: **Settings → Pages → Source: Deploy from a branch → `main` / `/root`** → Save.
4. Po chwili strona będzie pod `https://<login>.github.io/<repo>/`.
   - Rozdzielacz: `.../index.html`
   - Wersje: `.../v1-elegant-noir/`, `.../v2-jasny-elegancki/` itd.

### Po wyborze wersji
Gdy zdecydujesz się na jedną wersję, promujemy ją na stronę główną (zawartość wybranego
folderu `vX-…` trafia do katalogu głównego jako `index.html`), a rozdzielacz i pozostałe
wersje można usunąć lub zostawić do archiwum.

### Własna domena
W **Settings → Pages → Custom domain** wpisz domenę i dodaj plik `CNAME`. Po podpięciu domeny
warto ustawić w plikach `<meta property="og:image">` pełny adres `https://twojadomena.pl/assets/img/og-image.jpg`.

---

## 🔧 Podgląd lokalny

Otwórz `index.html` w przeglądarce (dwuklik). Dla pełni funkcji (fonty Google, formularz)
najlepiej przez prosty serwer, np. w folderze `Strona/`:

```
python -m http.server 8080
```
…i wejdź na `http://localhost:8080/`.

---

## ℹ️ Uwagi techniczne

- **Fonty**: Google Fonts (ładowane z `<link>`). Dla ścisłego RODO można je zhostować lokalnie.
- **Zdjęcia**: WebP z fallbackiem JPG, lazy-loading. Nowe zdjęcia wrzucaj do `assets/img/`
  i dopisz nazwę w `content.js` (`images`).
- **Dostępność**: kontrast, focus klawiatury, `prefers-reduced-motion`.
- **Zależności**: brak buildu — czysty HTML/CSS/JS. Nic nie trzeba kompilować.
