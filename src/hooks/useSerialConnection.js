import { useState, useEffect, useCallback, useRef } from 'react';

export const useSerialConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const [error, setError] = useState(null);
  const portRef = useRef(null);
  const readerRef = useRef(null);

  const disconnect = useCallback(async () => {
    try {
      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current = null;
      }
      if (portRef.current) {
        await portRef.current.close();
        portRef.current = null;
      }
      setIsConnected(false);
      setError(null);
    } catch (err) {
      console.error('Error disconnecting:', err);
      setError(err.message);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!('serial' in navigator)) {
      setError('Web Serial API not supported in this browser. Use Chrome, Edge, or Opera.');
      return;
    }

    try {
      setError(null);
      
      // Request port access - no filters to show all available serial devices
      const port = await navigator.serial.requestPort();

      // Open the port with Arduino Nano settings
      await port.open({ 
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none'
      });

      portRef.current = port;
      setIsConnected(true);

      // Set up reader for incoming data
      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      // Read data continuously
      let buffer = '';
      while (true) {
        try {
          const { value, done } = await reader.read();
          if (done) break;
          
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine) {
              console.log('Received:', trimmedLine);
              setLastMessage(trimmedLine);
            }
          }
        } catch (readError) {
          console.error('Read error:', readError);
          if (readError.name === 'NetworkError') {
            // Port was disconnected
            break;
          }
        }
      }
    } catch (err) {
      console.error('Connection error:', err);
      if (err.name === 'NotFoundError') {
        if (err.message.includes('No port selected')) {
          setError('Please select a port from the dialog. Click "Connect Serial" and choose your Arduino port.');
        } else {
          setError('Arduino not found. Make sure it\'s connected and try again.');
        }
      } else if (err.name === 'InvalidStateError') {
        setError('Port is already open or in use. Try refreshing the page.');
      } else if (err.name === 'NetworkError') {
        if (err.message.includes('Failed to open serial port')) {
          setError('Port is busy. Close Arduino IDE Serial Monitor, unplug/replug Arduino, then try again.');
        } else {
          setError('Arduino disconnected. Please reconnect and try again.');
        }
      } else if (err.name === 'NotAllowedError') {
        setError('Access denied. Make sure no other application is using the Arduino.');
      } else {
        setError(`Connection failed: ${err.message}`);
      }
      await disconnect();
    }
  }, [disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // Handle port disconnection
  useEffect(() => {
    const handleDisconnect = () => {
      if (isConnected) {
        setIsConnected(false);
        setError('Arduino disconnected');
        portRef.current = null;
        readerRef.current = null;
      }
    };

    if (portRef.current) {
      navigator.serial.addEventListener('disconnect', handleDisconnect);
      
      return () => {
        navigator.serial.removeEventListener('disconnect', handleDisconnect);
      };
    }
  }, [isConnected]);

  return {
    isConnected,
    lastMessage,
    error,
    connect,
    disconnect
  };
};