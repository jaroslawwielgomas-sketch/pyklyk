# Prosta instrukcja wdrożenia powiadomienia e-mail

Ta instrukcja uruchamia automatyczny mail do `kontakt@pyklyk.pl`, gdy klient kliknie w kalkulatorze przycisk wysłania zapytania.

## 1. Otwórz arkusz leadów

Wejdź do arkusza Google, w którym pojawiają się leady z kalkulatora.

## 2. Otwórz Apps Script

W górnym menu arkusza kliknij:

`Rozszerzenia` → `Apps Script`

## 3. Wklej gotowy kod

1. Otwórz plik `google-apps-script-leady-crm.gs` z tego samego folderu.
2. Skopiuj całą jego zawartość.
3. W Google Apps Script zaznacz cały obecny kod: `Ctrl + A`.
4. Usuń go i wklej nowy kod: `Ctrl + V`.
5. Kliknij ikonę zapisu albo użyj `Ctrl + S`.

## 4. Uruchom konfigurację

1. U góry wybierz funkcję `setupLeadSheet`.
2. Kliknij `Uruchom`.
3. Google poprosi o uprawnienia — zaakceptuj je.
4. Jeśli pojawi się komunikat o niezweryfikowanej aplikacji, kliknij:
   - `Zaawansowane`,
   - `Przejdź do projektu`,
   - `Zezwól`.

To jest potrzebne, aby skrypt mógł zapisywać leady i wysyłać wiadomości z Gmaila.

## 5. Zaktualizuj wdrożenie

W Google Apps Script kliknij:

`Wdróż` → `Zarządzaj wdrożeniami`

Następnie:

1. Kliknij ikonę ołówka przy obecnym wdrożeniu.
2. W polu `Wersja` wybierz `Nowa wersja`.
3. Kliknij `Wdróż`.
4. Jeśli Google ponownie poprosi o zgodę na Gmaila — zaakceptuj.

Nie twórz nowego wdrożenia, jeśli możesz zaktualizować obecne. Dzięki temu adres w kalkulatorze pozostanie taki sam.

## 6. Sprawdź, czy adres jest właściwy

Na początku kodu znajduje się linia:

`const OWNER_NOTIFICATION_EMAIL = "kontakt@pyklyk.pl";`

Jeśli powiadomienia mają przychodzić na inny adres, zmień tylko adres między cudzysłowami i ponownie zapisz oraz wdroż skrypt.

## 7. Zrób test

1. Otwórz testowy kalkulator.
2. Wpisz dane z adresem testowym.
3. Wyświetl cenę.
4. Kliknij `Wyślij zapytanie o dostępność terminu`.
5. Sprawdź dwie rzeczy:
   - nowy wiersz pojawił się w arkuszu,
   - na `kontakt@pyklyk.pl` przyszedł mail z tematem zaczynającym się od `Pyk Łyk`.

## Jeśli mail nie przyjdzie

1. Sprawdź folder `Spam` i `Oferty` w Gmailu.
2. W Apps Script kliknij po lewej `Wykonania` i sprawdź, czy ostatnie uruchomienie zakończyło się błędem.
3. Upewnij się, że skrypt został uruchomiony z konta Google, które ma dostęp do Gmaila.
4. Wróć do kroku 5 i zaktualizuj wdrożenie do `Nowa wersja`.

## Ważne

Mail do Ciebie jest wysyłany tylko po zdarzeniach `offer_liked` i `custom_quote_requested`. Samo wyświetlenie ceny nie wysyła powiadomienia, żeby nie zaśmiecać skrzynki.
