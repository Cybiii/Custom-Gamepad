import React, { useState, useEffect } from 'react';
import GamepadButton from './GamepadButton';
import { useSerialConnection } from '../hooks/useSerialConnection';

const GamepadController = () => {
  const [buttonStates, setButtonStates] = useState({
    X: false,
    Y: false,
    A: false,
    B: false
  });

  const { isConnected, connect, disconnect, lastMessage, error } = useSerialConnection();

  useEffect(() => {
    if (lastMessage) {
      const [button, action] = lastMessage.split('_');
      if (['X', 'Y', 'A', 'B'].includes(button)) {
        setButtonStates(prev => ({
          ...prev,
          [button]: action === 'PRESS'
        }));
      }
    }
  }, [lastMessage]);

  return (
    <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Controller Status</h2>
        <div className="flex gap-3">
          <button
            onClick={connect}
            disabled={isConnected}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isConnected 
                ? 'bg-white text-black cursor-not-allowed' 
                : 'bg-white hover:bg-gray-200 text-black'
            }`}
          >
            {isConnected ? 'Connected' : 'Connect Serial'}
          </button>
          {isConnected && (
            <button
              onClick={disconnect}
              className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-lg">⚠️</span>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="relative">
        {/* Connection Status Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse-fast' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-gray-700">{isConnected ? 'Online' : 'Offline'}</span>
        </div>

        {/* Clean Xbox Controller Layout */}
        <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 border-4 border-gray-200 shadow-2xl max-w-4xl mx-auto">
          
          {/* Controller Layout */}
          <div className="grid grid-cols-3 gap-20 items-center justify-items-center">
            
            {/* Left Side - D-Pad with Arrow Keys */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">D-Pad</h3>
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Up Arrow (Y Button) */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <GamepadButton
                    label="↑"
                    color="button-y"
                    isPressed={buttonStates.Y}
                    position="top"
                  />
                </div>
                
                {/* Down Arrow (X Button) */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <GamepadButton
                    label="↓"
                    color="button-x"
                    isPressed={buttonStates.X}
                    position="bottom"
                  />
                </div>
                
                {/* Left Arrow Placeholder */}
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-gray-200 rounded-full border-4 border-gray-400 flex items-center justify-center text-gray-600 text-xl font-bold shadow-md">
                    ←
                  </div>
                </div>
                
                {/* Right Arrow Placeholder */}
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-gray-200 rounded-full border-4 border-gray-400 flex items-center justify-center text-gray-600 text-xl font-bold shadow-md">
                    →
                  </div>
                </div>
                
                {/* D-Pad Center - Empty */}
              </div>
            </div>

            {/* Center - Empty Space */}
            <div className="flex flex-col items-center gap-6">
              {/* Empty center area */}
            </div>

            {/* Right Side - Action Buttons (B and A) */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Action</h3>
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* B Button (Top) */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <GamepadButton
                    label="B"
                    color="button-b"
                    isPressed={buttonStates.B}
                    position="top"
                  />
                </div>
                
                {/* A Button (Bottom) */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <GamepadButton
                    label="A"
                    color="button-a"
                    isPressed={buttonStates.A}
                    position="bottom"
                  />
                </div>
                
                {/* Action Buttons Placeholders */}
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-gray-700 rounded-full border-4 border-gray-500 flex items-center justify-center text-gray-300 text-xl font-bold shadow-md">
                    X
                  </div>
                </div>
                
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-gray-700 rounded-full border-4 border-gray-500 flex items-center justify-center text-gray-300 text-xl font-bold shadow-md">
                    Y
                  </div>
                </div>
                
                {/* Action Center - Empty */}
              </div>
            </div>
          </div>

          {/* Controller Base Line */}
          <div className="mt-10 flex justify-center">
            <div className="w-64 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Button Status Display */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(buttonStates).map(([button, isPressed]) => (
            <div
              key={button}
              className={`p-3 rounded-lg border-2 transition-all ${
                isPressed
                  ? 'bg-green-100 border-green-400 shadow-lg transform scale-105'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className={`text-lg font-bold ${isPressed ? 'text-green-700' : 'text-gray-700'}`}>{button}</div>
                <div className={`text-sm ${isPressed ? 'text-green-600' : 'text-gray-500'}`}>
                  {isPressed ? 'PRESSED' : 'Released'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamepadController;