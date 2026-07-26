@echo off
title Hafsum Demo Server  -  KEEP THIS WINDOW OPEN
cd /d "%~dp0"

REM This runs the WHOLE website (frontend + order API) from ONE window on ONE address.
REM No second terminal needed. Port 5175 is used because 5173 belongs to the Decora site.
set PORT=5175

REM Free port 5175 first, in case an old run is still holding it.
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 5175 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }" >nul 2>&1

REM Build the website if it hasn't been built yet (so the page actually shows).
if not exist "..\hafsum-react\dist\index.html" (
  echo.
  echo  Preparing the website for the first time - this takes about a minute...
  echo.
  call npm run build:web
)

echo.
echo  ================================================================
echo    HAFSUM  -  starting the whole website on ONE address
echo.
echo    1. Wait for this line:  Hafsum order API on http://localhost:5175
echo    2. Open your browser:   http://localhost:5175
echo    3. Keep THIS window open during the demo.
echo       (To stop: click here and press Ctrl+C, or just close it.)
echo.
echo    Changed the code? Delete the hafsum-react\dist folder, then
echo    run this file again to rebuild with your latest changes.
echo  ================================================================
echo.

call npm start

echo.
echo  --- Server stopped. You can close this window. ---
pause
