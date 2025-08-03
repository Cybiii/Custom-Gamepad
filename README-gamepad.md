# Custom Xbox Gamepad UI

A React-based user interface for visualizing button presses from your Arduino Nano custom gamepad controller.

## Features

- 🎮 Real-time visualization of X, Y, A, B button presses
- 🔌 Web Serial API integration for direct Arduino communication
- 📊 Live serial monitor with message history
- 🎨 Xbox-themed design with Tailwind CSS
- ⚡ Responsive layout for different screen sizes
- 🔄 Auto-reconnection handling

## Prerequisites

- Modern browser with Web Serial API support (Chrome, Edge, Opera)
- Node.js (v14 or higher)
- Arduino Nano with your custom gamepad code

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

### UI Components

1. **GamepadController** - Main controller visualization
2. **GamepadButton** - Individual button components with press animations
3. **SerialMonitor** - Live message display with timestamps
4. **useSerialConnection** - Custom hook for serial communication

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

## Browser Compatibility

The Web Serial API requires a secure context (HTTPS or localhost) and is supported in:
- ✅ Chrome 89+
- ✅ Edge 89+
- ✅ Opera 75+
- ❌ Firefox (not yet supported)
- ❌ Safari (not yet supported)

## Troubleshooting

1. **"Web Serial API not supported"**
   - Use Chrome, Edge, or Opera browser
   - Ensure you're on localhost or HTTPS

2. **Cannot connect to Arduino**
   - Check USB connection
   - Verify Arduino is running the correct code
   - Try a different USB port/cable
   - Check Device Manager for COM port

3. **No button responses**
   - Verify Arduino serial output in Arduino IDE Serial Monitor
   - Check baud rate matches (9600)
   - Ensure button wiring is correct

## Customization

### Button Colors
Edit `tailwind.config.js` to change button colors:
```js
colors: {
  'button-x': '#4A90E2',  // Blue
  'button-y': '#F5A623',  // Yellow
  'button-a': '#7ED321',  // Green
  'button-b': '#D0021B'   // Red
}
```

### Layout
Modify `GamepadController.js` to adjust button positioning and gamepad layout.

### Serial Messages
Update the message parsing in `useSerialConnection.js` if you modify the Arduino output format.

## License

MIT License - Feel free to modify and use for your projects!