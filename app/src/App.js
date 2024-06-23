// src/App.js
import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import './App.css';
import NotificationBanner from './components/NotificationBanner';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setModalIsOpen(true); // Show the modal on initial load
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <NotificationBanner isOpen={modalIsOpen} onRequestClose={closeModal} />
      <Map />
    </div>
  );
}

export default App;