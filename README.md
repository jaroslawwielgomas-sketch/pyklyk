# Pyk Łyk — aktualizacja z dnia 29.07.2026

## Wersja gotowa do przeniesienia na GitHub

Ten folder zawiera finalną wersję strony i kalkulatora Pyk Łyk, przetestowaną 29.07.2026.
Pakiet został odchudzony do 97 plików, aby można było przesłać go przez GitHub bez przekraczania limitu 100 plików.

Kalkulator został sprawdzony w dwóch scenariuszach:

- klient wysyła prośbę o sprawdzenie dostępności terminu,
- klient prosi o wycenę indywidualną, gdy standardowa cena mu nie odpowiada.

W obu przypadkach:

- zgłoszenie zapisuje się w arkuszu leadów,
- na `kontakt@pyklyk.pl` przychodzi automatyczne powiadomienie,
- kalkulator nie otwiera programu pocztowego,
- opis wydarzenia i podsumowanie wyceny są przekazywane do zgłoszenia.

## Co znajduje się w folderze

- `index.html` — strona główna,
- `kalkulator.html` — finalny kalkulator z automatycznym zapisem leadów,
- `styles.css` i `shared/` — wygląd oraz wspólne elementy strony,
- `assets/` — zdjęcia, logo i ikony,
- `polityka-prywatnosci.html` — polityka prywatności,
- `google-apps-script-leady-crm.gs` — kod obsługi arkusza i powiadomień e-mail,
- instrukcje wdrożenia arkusza i powiadomień.

## Jak przenieść stronę na GitHub

Skopiuj **zawartość tego folderu** do głównego katalogu repozytorium GitHub. Nie twórz dodatkowego folderu wewnątrz repozytorium.

Nie zmieniaj nazw folderów:

- `assets`
- `shared`

Po przesłaniu plików na GitHub strona powinna działać pod adresem:

`https://pyklyk.pl/`

## Ważne — arkusz i automatyczne maile

Kod `google-apps-script-leady-crm.gs` jest częścią zaplecza. Nie trzeba go uruchamiać na GitHubie.

W Google Apps Script musi być aktywna wdrożona **Wersja 5 z 29 lipca 2026**. To właśnie ona wysyła powiadomienia o nowych leadach i zawiera statusy `Umowa` oraz `Konkurencja`.

Szczegółowa instrukcja znajduje się w pliku:

`INSTRUKCJA-WDROZENIA-POWIADOMIENIA.md`

## Szybki test po publikacji

Po opublikowaniu strony:

1. Otwórz `https://pyklyk.pl/kalkulator.html`.
2. Wpisz testowe dane.
3. Przejdź do wyceny.
4. Kliknij przycisk dostępności terminu albo wyceny indywidualnej.
5. Sprawdź arkusz oraz skrzynkę `kontakt@pyklyk.pl`.

Po teście usuń testowy wpis z arkusza.
