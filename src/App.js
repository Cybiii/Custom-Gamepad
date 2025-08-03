import React from 'react';
import GamepadController from './components/GamepadController';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Custom Gamepad
          </h1>
          <p className="text-gray-300">
            Arduino Nano Controller Interface
          </p>
        </header>
        
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <GamepadController />
          </div>
        </div>
        
        <footer className="text-center mt-12 text-gray-400 text-sm">
          <p>Connect your Arduino Nano via USB and click "Connect Serial" to start</p>
        </footer>
      </div>
    </div>
  );
}

export default App;