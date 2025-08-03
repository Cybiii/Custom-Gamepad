const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const robot = require('robotjs');

// Configuration
const ARDUINO_PORT = 'COM6'; // Your Arduino port
const BAUD_RATE = 9600;

// Button to keyboard mapping
const buttonMap = {
  'Y_PRESS': 'down',    // Y button → Down arrow
  'A_PRESS': 'up',      // A button → Up arrow  
  'X_PRESS': 'left',    // X button → Left arrow
  'B_PRESS': 'right'    // B button → Right arrow
};

console.log('🎮 Arduino Keyboard Bridge Starting...');
console.log('📍 Connecting to Arduino on', ARDUINO_PORT);

// Create serial port connection
const port = new SerialPort({
  path: ARDUINO_PORT,
  baudRate: BAUD_RATE,
});

// Create parser to read line-by-line
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Handle successful connection
port.on('open', () => {
  console.log('✅ Connected to Arduino successfully!');
  console.log('🎯 Button mapping:');
  console.log('   Y → Down Arrow');
  console.log('   A → Up Arrow');
  console.log('   X → Left Arrow');
  console.log('   B → Right Arrow');
  console.log('');
  console.log('🚀 Ready! Press your gamepad buttons...');
});

// Handle incoming data from Arduino
parser.on('data', (data) => {
  const message = data.toString().trim();
  console.log('📡 Received:', message);
  
  // Check if it's a button press we care about
  if (buttonMap[message]) {
    const keyToPress = buttonMap[message];
    
    try {
      // Send keyboard input
      robot.keyTap(keyToPress);
      console.log(`⌨️  Sent: ${keyToPress.toUpperCase()} arrow key`);
    } catch (error) {
      console.error('❌ Error sending key:', error.message);
    }
  }
});

// Handle connection errors
port.on('error', (err) => {
  console.error('❌ Serial port error:', err.message);
  
  if (err.message.includes('cannot open')) {
    console.log('💡 Troubleshooting:');
    console.log('   • Make sure Arduino is connected to', ARDUINO_PORT);
    console.log('   • Close Arduino IDE Serial Monitor');
    console.log('   • Try unplugging and reconnecting Arduino');
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Arduino Keyboard Bridge...');
  if (port.isOpen) {
    port.close();
  }
  process.exit(0);
});

// Keep the process alive
process.stdin.resume();