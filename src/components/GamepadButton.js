import React from 'react';

const GamepadButton = ({ label, color, isPressed, position }) => {
  const colorClasses = {
    'button-x': 'bg-white border-gray-400 text-black',
    'button-y': 'bg-white border-gray-400 text-black',
    'button-a': 'bg-black border-gray-600 text-white',
    'button-b': 'bg-black border-gray-600 text-white'
  };

  const pressedColorClasses = {
    'button-x': 'bg-gray-200 border-gray-500 shadow-gray-400/50 text-black',
    'button-y': 'bg-gray-200 border-gray-500 shadow-gray-400/50 text-black',
    'button-a': 'bg-gray-800 border-gray-400 shadow-gray-600/50 text-white',
    'button-b': 'bg-gray-800 border-gray-400 shadow-gray-600/50 text-white'
  };

  return (
    <div
      className={`
        relative w-16 h-16 rounded-full border-4 
        flex items-center justify-center
        font-bold text-lg
        transition-all duration-150 ease-out
        cursor-pointer
        ${isPressed 
          ? `${pressedColorClasses[color]} shadow-2xl transform scale-90 animate-button-press` 
          : `${colorClasses[color]} shadow-lg hover:scale-105 hover:shadow-xl`
        }
        ${isPressed ? 'shadow-2xl' : ''}
      `}
      style={{
        boxShadow: isPressed 
          ? `0 0 20px rgba(128, 128, 128, 0.5)`
          : undefined
      }}
    >
      {/* Highlight effect when pressed */}
      {isPressed && (
        <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping"></div>
      )}
      
      {/* Button Label */}
      <span className="relative z-10 drop-shadow-lg font-black text-xl">{label}</span>
      
      {/* Inner gradient for depth */}
      <div className={`
        absolute inset-2 rounded-full 
        ${isPressed ? 'bg-gradient-to-br from-white/30 to-black/20' : 'bg-gradient-to-br from-white/40 to-transparent'}
        transition-all duration-150
      `}></div>
      
      {/* Outer ring for extra depth */}
      <div className="absolute -inset-1 rounded-full bg-gray-300 opacity-30 -z-10"></div>
    </div>
  );
};

export default GamepadButton;