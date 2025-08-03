import React, { useState, useEffect, useRef } from 'react';
import { useSerialConnection } from '../hooks/useSerialConnection';

const SerialMonitor = () => {
  const [messages, setMessages] = useState([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const messagesEndRef = useRef(null);
  const { isConnected, lastMessage } = useSerialConnection();

  useEffect(() => {
    if (lastMessage) {
      const timestamp = new Date().toLocaleTimeString();
      setMessages(prev => [
        ...prev.slice(-99), // Keep only last 100 messages
        { text: lastMessage, timestamp, id: Date.now() }
      ]);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (isAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScroll]);

  const clearMessages = () => {
    setMessages([]);
  };

  const getMessageColor = (message) => {
    if (message.includes('_PRESS')) return 'text-green-400';
    if (message.includes('_RELEASE')) return 'text-red-400';
    return 'text-gray-300';
  };

  const getMessageIcon = (message) => {
    if (message.includes('_PRESS')) return '▲';
    if (message.includes('_RELEASE')) return '▼';
    return '●';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 h-96 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-xbox-green">Serial Monitor</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`px-3 py-1 text-xs rounded transition-all ${
              isAutoScroll ? 'bg-xbox-green text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Auto-scroll
          </button>
          <button
            onClick={clearMessages}
            className="px-3 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 rounded-lg p-3 overflow-y-auto font-mono text-sm border border-gray-300">
        {!isConnected && (
          <div className="text-gray-400 text-center py-8">
            <div className="text-2xl mb-2">⚡</div>
            <div>Connect to Arduino to see serial output</div>
          </div>
        )}
        
        {isConnected && messages.length === 0 && (
          <div className="text-gray-400 text-center py-8">
            <div className="text-2xl mb-2">👂</div>
            <div>Listening for button presses...</div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="flex items-center gap-2 py-1 border-b border-gray-700">
            <span className="text-gray-500 text-xs w-20 flex-shrink-0">
              {message.timestamp}
            </span>
            <span className={`${getMessageColor(message.text)} w-4 text-center`}>
              {getMessageIcon(message.text)}
            </span>
            <span className={getMessageColor(message.text)}>
              {message.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-3 text-xs text-gray-600 text-center">
        {messages.length > 0 && `${messages.length} message${messages.length !== 1 ? 's' : ''}`}
        {isConnected && (
          <span className="ml-2">
            • <span className="text-green-600">Connected</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default SerialMonitor;