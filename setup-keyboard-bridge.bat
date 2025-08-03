@echo off
echo 🎮 Arduino Keyboard Bridge Setup
echo.

echo 📦 Installing Node.js dependencies...
npm install --package-lock-only --package-lock=false serialport robotjs

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start the bridge, run:
echo    node arduino-keyboard-bridge.js
echo.
echo 📍 Make sure your Arduino is connected to COM6
echo.
pause