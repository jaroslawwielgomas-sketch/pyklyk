# Pyk Łyk Drink Bar

Repozytorium strony Pyk Łyk i kalkulatora wyceny mobilnego baru na wesele.

- [Strona główna](https://pyklyk.pl/)
- [Kalkulator wyceny](https://pyklyk.pl/kalkulator/)

## Pliki strony

- `index.html` — strona główna.
- `kalkulator/index.html` — kalkulator wyceny.
- `kalkulator.html` — przekierowanie ze starego adresu kalkulatora.
- `styles.css`, `shared/` i `assets/` — style, skrypty i zasoby strony.
- `polityka-prywatnosci.html` — polityka prywatności.

## Zgłoszenia z kalkulatora

Kalkulator pozwala wysłać zapytanie o dostępność terminu lub poprosić o wycenę indywidualną. Wydarzenia od 2029 roku są wyceniane indywidualnie. Kalkulator pokazuje potwierdzenie zapisu po odpowiedzi Google Apps Script.

Wdrożony projekt Apps Script obsługuje arkusz leadów i powiadomienia na `kontakt@pyklyk.pl`. Plik `google-apps-script-leady-crm.gs` w repozytorium zawiera starszą kopię kodu. Aktywną wersję sprawdzisz w projekcie Apps Script w menu **Wdróż → Zarządzaj wdrożeniami**.

## Test po publikacji

1. Otwórz [kalkulator](https://pyklyk.pl/kalkulator/) i użyj własnego działającego adresu e-mail. CRM może pominąć powiadomienia dla adresów zaczynających się od `test@` lub `demo@`.
2. Wyślij zapytanie o dostępność terminu albo zapytanie indywidualne.
3. Sprawdź potwierdzenie w kalkulatorze, wpis w arkuszu leadów i powiadomienie na skrzynce firmowej.
