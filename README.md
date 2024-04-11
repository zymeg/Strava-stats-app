# StravaStats

StravaStats to aplikacja do monitorowania aktywności sportowych użytkowników platformy Strava. Pozwala ona na logowanie poprzez autoryzację za pomocą konta Strava, wyświetlenie profilu użytkownika oraz przeglądanie jego aktywności.

## Funkcje

### Logowanie i autoryzacja

Użytkownicy mogą zalogować się do aplikacji za pomocą swojego konta Strava poprzez autoryzację OAuth.

### Wyświetlanie profilu użytkownika

Po zalogowaniu użytkownik może przeglądać swój profil, który zawiera następujące informacje:

- Imię i nazwisko użytkownika
- Liczba obserwowanych użytkowników
- Liczba obserwujących użytkowników

### Lista aktywności

Aplikacja wyświetla listę aktywności użytkownika, które są filtrowane po miesiącu. Użytkownik może przeglądać aktywności dla wybranego miesiąca.

### Przydzielanie punktów za aktywności

Dla każdej aktywności zostały przydzielone punkty według określonego przelicznika. Punkty są sumowane zarówno dla każdego miesiąca, jak i w ogólnej liczbie punktów dla wszystkich aktywności.

## Technologie

Aplikacja StravaStats została zbudowana przy użyciu następujących technologii:

- Vue.js: Wykorzystane do budowy interfejsu użytkownika i zarządzania stanem aplikacji.
- Strava API: Używane do pobierania danych użytkownika i jego aktywności.
- OAuth: Do autoryzacji i logowania użytkowników poprzez konta Strava.
- SCSS: Do stylizacji interfejsu użytkownika.
- Axios - Do wykonywania requestów do Strava API
- FontAwesome6 - Do wyświetlania fancy ikon

## Uruchomienie aplikacji

Aby uruchomić aplikację StravaStats na swoim lokalnym środowisku, wykonaj następujące kroki:

1. Sklonuj repozytorium z aplikacją na swoje urządzenie.

```bash
git clone https://github.com/twoje-konto/strava-stats.git
```

2. Przejdź do katalogu projektu.

```bash
cd strava-stats
```

3. Zainstaluj wszystkie zależności przy użyciu menedżera pakietów npm.

```bash
npm install
```

4. Skonfiguruj plik .env

```javascript
VITE_APP_CLIENT_ID = YOUR_APP_CLIENT_ID
VITE_APP_CLIENT_SECRET = YOUR_APP_CLIENT_SECRET

NODE_ENV = 'development' // development/production
VITE_ENV_URL = '' // Leave empty
```

5. Uruchom aplikację.

```bash
npm run serve
```

Aplikacja będzie dostępna pod wskazanym przez konsolę adresem.

## Autorzy

Szymon Jaskuła - Developer front-end - szymonjaskula122@gmail.com
