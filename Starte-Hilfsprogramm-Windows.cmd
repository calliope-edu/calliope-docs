@echo off
REM ========================================
REM Development Helper für Windows
REM ========================================
REM Starte dieses Programm, um den interaktiven
REM Development Helper zu öffnen.

cd /d "%~dp0"

echo.
echo ========================================
echo   Development Helper
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] Node.js ist nicht installiert!
    echo.
    echo Der Development Helper benoetigt Node.js zum Funktionieren.
    echo.
    echo INSTALLATION:
    echo   1. Besuche: https://nodejs.org/
    echo   2. Lade die LTS-Version herunter
    echo   3. Installiere Node.js
    echo   4. Starte dieses Programm erneut
    echo.
    echo Download-Seite wird geoeffnet...
    timeout /t 2 >nul
    start https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check Node.js version
echo [OK] Node.js ist installiert
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo     Version: %NODE_VERSION%
echo.

REM Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] npm ist nicht installiert!
    echo npm sollte normalerweise mit Node.js installiert werden.
    echo Bitte installiere Node.js neu von https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] npm ist installiert
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo     Version: %NPM_VERSION%
echo.

REM Check if Git is installed (warning only)
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNUNG] Git ist nicht installiert!
    echo.
    echo Git wird fuer einige Funktionen benoetigt.
    echo Download: https://git-scm.com/download/win
    echo.
    echo Helper wird trotzdem gestartet...
    timeout /t 3 >nul
) else (
    echo [OK] Git ist installiert
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo     %GIT_VERSION%
)

echo.
echo ========================================
echo   Helper wird gestartet...
echo ========================================
echo.
echo Der Browser oeffnet sich automatisch.
echo Druecke Strg+C um den Helper zu beenden.
echo.

REM Start the helper
node helper/server.js

pause
