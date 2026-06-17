@echo off
title Hafsum Demo Server  -  KEEP THIS WINDOW OPEN
cd /d "%~dp0"

REM Free port 5173 first, in case a dev server or an old run is still holding it.
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }" >nul 2>&1

REM Run the single all-in-one server on 5173 (already trusted by Google).
set PORT=5173

echo.
echo  ================================================================
echo    HAFSUM  -  starting the whole website on ONE address
echo.
echo    1. Wait for this line:  Hafsum order API on http://localhost:5173
echo    2. Open your browser:   http://localhost:5173
echo    3. Keep THIS window open during the demo.
echo       (To stop: click here and press Ctrl+C, or just close it.)
echo  ================================================================
echo.

call npm start

echo.
echo  --- Server stopped. You can close this window. ---
pause
