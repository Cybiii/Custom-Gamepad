# Custom Gamepad with UI

A React-based user interface for visualizing button presses from your Arduino Nano custom gamepad controller (to get gud on sf6/injustice/friday night funkin).

## Features

- Real-time visualization of X, Y, A, B button presses
- Web Serial API integration for direct Arduino communication
- Xbox-themed design with Tailwind CSS

## Prerequisites

- Browser with Web Serial API support (Chrome, Edge, Opera)
- Node.js (v14 or higher)
- Arduino Nano with gamepad code

## Setup Instructions

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Install Tailwind CSS**
   ```powershell
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Start the Development Server**
   ```powershell
   npm start
   ```

4. **Connect Your Arduino**
   - Upload your `Nano.ino` code to the Arduino Nano
   - Connect the Arduino via USB
   - Open the React app in your browser
   - Click "Connect Serial" and select your Arduino port

## How It Works

### Arduino Communication
The Arduino sends these serial messages:
- `X_PRESS` / `X_RELEASE` - X button events
- `Y_PRESS` / `Y_RELEASE` - Y button events  
- `A_PRESS` / `A_RELEASE` - A button events
- `B_PRESS` / `B_RELEASE` - B button events

### Web Serial API
The app uses the Web Serial API to communicate directly with the Arduino:
- Automatic port detection for Arduino devices
- 9600 baud rate (matching your Arduino code)
- Real-time message parsing and display

## File Structure

```
src/
├── components/
│   ├── GamepadController.js  # Main gamepad display
│   ├── GamepadButton.js      # Individual button component
│   └── SerialMonitor.js      # Serial message monitor
├── hooks/
│   └── useSerialConnection.js # Serial communication logic
├── App.js                    # Main application
├── index.js                  # React entry point
└── index.css                 # Tailwind CSS imports
```
