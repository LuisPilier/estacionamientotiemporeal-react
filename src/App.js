import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; 

const App = () => {
  const [state, setState] = useState({
    availableParkingSpots: 0,
    isEntranceBarrierOpen: true,
    isExitBarrierOpen: true,
  });

  const socket = io('http://localhost:3001'); 

  useEffect(() => {
    // Manejar actualizaciones del servidor
    socket.on('update', (data) => {
      setState(data);
    });

    // Limpiar el socket al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRequestEntry = () => {
    // Enviar solicitud de entrada al servidor
    socket.emit('requestEntry');
  };

  const handleRequestExit = () => {
    // Enviar solicitud de salida al servidor
    socket.emit('requestExit');
  };

  return (
    <div>
      <h1>Parking App</h1>
      <div className="status-container">
        <p>Estacionamientos disponibles: {state.availableParkingSpots}</p>
        <p>Entrada del Estacionamiento: {state.isEntranceBarrierOpen ? 'Abierta' : 'Cerrada'}</p>
        <p>Salida del Estacionamiento: {state.isExitBarrierOpen ? 'Abierta' : 'Cerrada'}</p>
      </div>
      <button onClick={handleRequestEntry} disabled={!state.isEntranceBarrierOpen}>
        Solicitar entrada
      </button>
      <button onClick={handleRequestExit} disabled={!state.isExitBarrierOpen}>
        Solicitar entrada
      </button>
    </div>
  );
};

export default App;
