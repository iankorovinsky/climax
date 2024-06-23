// src/Map.js
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { countryMarkers } from '../constants/Country-Coords';
import countryDataToContent from '../components/services/countryDataToContent'
import "mapbox-gl/dist/mapbox-gl.css";
import Modal from './Modal';
import { Typewriter } from 'react-simple-typewriter';

mapboxgl.accessToken = 'pk.eyJ1IjoiaWtvcm92aW5za3kiLCJhIjoiY2x4cWVwemN1MHNqazJpcHdwbTVvdmU3eSJ9.So197HzrXDhSQoUSbDUhUg';

const quotes = [
  "The best way to predict the future is to create it.",
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
  "Whether you think you can, or you think you can’t – you’re right.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
];

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [0, 0],
      zoom: 1,
      projection: 'globe' // Display the map as a globe
    });

    map.current.on('style.load', () => {
      map.current.setFog({
        'range': [-1, 1],
        'horizon-blend': 0.03,
        'color': '#f8f0e3',
        'high-color': '#add8e6',
        'space-color': '#000000',
        'star-intensity': 0.15
      });

      // Add markers to the map
      countryMarkers.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates)
          .addTo(map.current);

        el.addEventListener('click', () => {
            setModalContent(countryDataToContent(marker));
            setShowModal(true);
        });
      });
    });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
      <Modal show={showModal} onClose={handleCloseModal} content={modalContent} />
      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
        <Typewriter
          words={quotes}
          loop={false}
          cursor
          cursorStyle='🧸'
          typeSpeed={40}
          deleteSpeed={40}
          delaySpeed={1000}
        />
      </div>
    </div>
  );
};

export default Map;
