# Pyk Łyk — strona internetowa

Strona-wizytówka (one-page) firmy **Pyk Łyk** — mobilny bar / obsługa barmańska (barman na wesele, drink bar) na wesela i eventy.
Cel: pozyskiwanie zapytań ofertowych (formularz) i telefonów oraz wysokie pozycjonowanie w Google.

> **Wybrana wersja:** *Rustykalny Glam* (dawne `v4`) — została promowana na stronę główną (`index.html` + `styles.css` w katalogu głównym).
> Pozostałe warianty (`v1`–`v3`) oraz stary rozdzielacz leżą lokalnie w `archiwum/` (folder jest w `.gitignore`, więc **nie** trafia na GitHub Pages). Ich historia jest też zachowana we wcześniejszych commitach.

---

## 📁 Struktura

```
Strona/
├── index.html                  ← STRONA GŁÓWNA (wybrana wersja Rustykalny Glam)
├── styles.css                  ← style wybranej wersji
├── polityka-prywatnosci.html   ← polityka prywatności / RODO (UZUPEŁNIJ dane firmy)
├── robots.txt                  ← SEO: wskazuje sitemapę, pozwala indeksować
├── sitemap.xml                 ← SEO: mapa strony dla Google
│
├── shared/                     ← WSPÓLNY FUNDAMENT
│   ├── content.js              ← 🟢 CAŁA TREŚĆ w jednym miejscu (menu, oferta, FAQ, kontakt…)
│   ├── app.js                  ← silnik: formularz, ikony, animacje, renderery sekcji
│   └── base.css                ← reset + kontrakt zmiennych + style formularza
│
├── assets/
│   ├── logo/                   ← logo-light.png, logo-dark.png, favicon, apple-touch-icon
│   └── img/                    ← zoptymalizowane zdjęcia (WebP + JPG) + og-image
│
└── archiwum/  (lokalnie, poza repo)  ← niewybrane wersje v1–v3 + stary rozdzielacz
```

---

## ✏️ Jak zmieniać treść (najważniejsze!)

**Prawie wszystko zmienia się w jednym pliku: [`shared/content.js`](shared/content.js).**
Znajdziesz tam m.in.:

- **telefon, e-mail, temat maila z formularza, linki social** — sekcja `config`
- **liczniki** (1000+ imprez, 12 lat…) — `stats`
- **karta drinków** (14 / 6 / 3) — `menu`
- **pakiety dodatkowe** — `packages`
- **opinie** — `reviews` *(⚠ obecnie PRZYKŁADOWE — patrz niżej)*
- **FAQ** — `faq`
- **typy imprez i województwa w formularzu** — `eventTypes`, `voivodeships`

> Nagłówki, teksty hero/sekcji i stopkę zmienia się bezpośrednio w `index.html`.
> Dane strukturalne FAQ (SEO) generują się automatycznie z `content.js` (`faq`).

### ⚠ Opinie do podmiany
W `content.js` (`reviews`) są **przykładowe** opinie. Przed publikacją wstaw prawdziwe cytaty
z Facebooka i Wesele z Klasą (linki do źródeł są już na stronie).

---

## 📨 Formularz — jak włączyć realną wysyłkę maili

Zgłoszenia mają trafiać na **jaroslaw.wielgomas@gmail.com** z tytułem
**„Zapytanie ofertowe- strona internetowa PYK ŁYK”**.

Domyślnie działa tryb **mailto** (otwiera program pocztowy). Aby maile przychodziły automatycznie:

1. Wejdź na **https://web3forms.com** → podaj e-mail → dostaniesz **Access Key** (za darmo).
2. Otwórz [`shared/content.js`](shared/content.js) i w `config.form` ustaw:
   ```js
   form: {
     mode:      "web3forms",
     accessKey: "TWÓJ-KLUCZ-Z-WEB3FORMS"
   }
   ```
3. Gotowe. *(Alternatywnie Formspree — `mode: "formspree"`, endpoint w `accessKey`.)*

Formularz ma **wymagany checkbox RODO** linkujący do `polityka-prywatnosci.html`.

---

## 🔎 SEO

- Zoptymalizowane `<title>` i `<meta name="description">` pod frazy: *barman na wesele, barman do wynajęcia,
  drink bar na wesele, barman na wesele mazowieckie, barman na wesele Warszawa*.
- Dane strukturalne **LocalBusiness/ProfessionalService** oraz **FAQPage** (JSON-LD).
- `canonical`, Open Graph / Twitter Card, tagi geo, `robots.txt` + `sitemap.xml`.
- Po podpięciu własnej domeny zaktualizuj adresy `https://…` w `index.html` (canonical, og:url, og:image,
  JSON-LD) oraz w `robots.txt` i `sitemap.xml`.

---

## 🚀 Publikacja na GitHub Pages

Repozytorium: **jaroslawwielgomas-sketch/pyklyk**. Deploy przez GitHub Pages (branch `main`, katalog `/root`).
Po `git push` do `origin` strona aktualizuje się pod:
`https://pyklyk.pl/`

Plik `.nojekyll` wymusza serwowanie plików bez przetwarzania przez Jekyll.

---

## 🔧 Podgląd lokalny

Otwórz `index.html` w przeglądarce (dwuklik). Dla pełni funkcji (fonty Google, formularz)
najlepiej przez prosty serwer w katalogu `Strona/`:

```
python -m http.server 8080
```
…i wejdź na `http://localhost:8080/`.

---

## ℹ️ Uwagi techniczne

- **Zależności**: brak buildu — czysty HTML/CSS/JS. Nic nie trzeba kompilować.
- **Zdjęcia**: WebP z fallbackiem JPG, lazy-loading. Nowe zdjęcia wrzucaj do `assets/img/`
  i dopisz nazwę w `content.js` (`images`).
- **Dostępność**: kontrast, focus klawiatury, `prefers-reduced-motion`.
