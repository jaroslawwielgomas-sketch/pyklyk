# Arkusz leadow jako mini CRM

Plik `google-apps-script-leady-crm.gs` zawiera gotowy kod do Google Apps Script.

## Co doda arkusz

Nowe leady beda zapisywane z dodatkowymi kolumnami:

- `Lead ID` - unikalny numer leada.
- `Status` - np. Nowy, Do kontaktu, Wycena indywidualna, Umowa, Konkurencja, Zarezerwowany termin.
- `Priorytet` - Wysoki, Normalny albo Niski.
- `Nastepny kontakt` - sugerowana data kontaktu z klientem.
- `Ostatni kontakt` - miejsce na reczne wpisanie ostatniej rozmowy lub maila.
- `Akcja` - lista wyboru do wysyłki maila do klienta.
- `Status wysyłki` - informacja, czy mail został wysłany.
- `Data ostatniego maila` - automatyczna data wysyłki.
- `Typ ostatniego maila` - ostatni wybrany typ wiadomości.
- `Notatka` - automatyczna notatka z kalkulatora plus miejsce na dopiski.
- `Zrodlo`, `URL strony`, `Zgoda RODO`, `User agent` - dane pomocnicze.

## Wysylka maili z arkusza

W kolumnie `Akcja` pojawia się lista z 3 opcjami:

- `Wyślij przypomnienie` - krótki follow-up po wycenie.
- `Dopytanie po ofercie` - wiadomość dla klienta, który kliknął, że oferta mu się podoba.
- `Wycena indywidualna` - wiadomość dla klienta, który wymaga indywidualnego kontaktu.

Po wybraniu akcji skrypt:

1. wysyla maila na adres z kolumny `Email`,
2. wpisuje wynik w kolumnie `Status wysylki`,
3. uzupelnia `Data ostatniego maila`,
4. uzupelnia `Typ ostatniego maila`,
5. aktualizuje `Ostatni kontakt`,
6. czysci pole `Akcja`, zeby przypadkiem nie wyslac drugi raz tej samej wiadomosci.

## Jak wdrozyc w Google Apps Script

1. Otworz arkusz z leadami.
2. Wejdz w `Rozszerzenia` -> `Apps Script`.
3. Otworz plik z aktualnym kodem zapisu leadow.
4. Zastap caly kod trescia z pliku `google-apps-script-leady-crm.gs`.
5. Kliknij `Zapisz`.
6. Uruchom funkcje `setupLeadSheet`.
7. Zatwierdz uprawnienia Google, jesli pojawi sie prosba.
8. Kliknij `Wdroz` -> `Zarzadzaj wdrozeniami`.
9. Zaktualizuj obecne wdrozenie jako aplikacje internetowa.

Po odswiezeniu arkusza powinno pojawic sie menu `Pyk Łyk CRM`.

Skrypt nie wymaga, zeby zakladka w arkuszu nazywala sie dokladnie `Leady`. Rozpozna arkusz po kolumnach leadow, m.in. `Email`, `Status` i `Akcja`.

## Jak przetestowac wysylke

1. W arkuszu kliknij menu `Pyk Łyk CRM`.
2. Wybierz `Skonfiguruj arkusz i wysyłkę`.
3. Zatwierdz uprawnienia Google, jesli pojawi sie prosba.
4. Wybierz `Wyślij test uprawnień e-mail`.
5. Sprawdz, czy testowy mail przyszedl na Twoja skrzynke.

Jesli test dziala, wybierz akcje w kolumnie `Akcja` przy testowym leadzie. Mail powinien wyslac sie automatycznie.

Jesli automatyczna wysylka po zmianie komorki nie zadziala, zaznacz wiersz leada i wybierz z menu:

`Pyk Łyk CRM` -> `Wyślij mail dla zaznaczonego wiersza`

To uruchamia ta sama wysylke recznie.

## Wazne

Adres URL wdrozenia powinien zostac ten sam, jesli aktualizujesz istniejace wdrozenie. Wtedy nie trzeba zmieniac adresu w kalkulatorze.

Jesli Google wygeneruje nowy URL aplikacji internetowej, trzeba podmienic go w pliku `kalkulator.html` w wartosci `leadEndpointUrl`.

Wysylka maili z kolumny `Akcja` dziala przez konto Google, na ktorym uruchomisz i autoryzujesz skrypt. Aktualna wersja uzywa `GmailApp`, czyli wysyla wiadomosci bardziej podobnie do zwyklej wysylki z Gmaila.

Po zmianie kodu Google moze ponownie poprosic o uprawnienia do Gmaila.

## Jak pracowac na leadach

- Lead ze statusem `Do kontaktu` warto obsluzyc najszybciej.
- Lead `Wycena indywidualna` oznacza, ze klient przekroczyl limit automatycznej wyceny albo wymaga kontaktu.
- Lead `Utracony / feedback` zostawia informacje, dlaczego oferta nie pasuje.
- Po rozmowie zmien status recznie, np. na `Kontakt telefoniczny`, `Wyslano oferte`, `Umowa`, `Konkurencja` albo `Zarezerwowany termin`.
- Jesli chcesz wyslac wiadomosc, wybierz odpowiednia opcje w kolumnie `Akcja`.
