// // src/Map.js
// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { countryMarkers } from '../constants/Country-Coords';
// import countryDataToContent from '../components/services/countryDataToContent'
// import "mapbox-gl/dist/mapbox-gl.css";
// import Modal from './Modal';
// import { Typewriter } from 'react-simple-typewriter';

// mapboxgl.accessToken = 'pk.eyJ1IjoiaWtvcm92aW5za3kiLCJhIjoiY2x4cWVwemN1MHNqazJpcHdwbTVvdmU3eSJ9.So197HzrXDhSQoUSbDUhUg';

// const quotes = [
//   "The best way to predict the future is to create it.",
//   "Do not wait to strike till the iron is hot; but make it hot by striking.",
//   "Whether you think you can, or you think you can’t – you’re right.",
//   "The only limit to our realization of tomorrow is our doubts of today.",
//   "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
// ];

// const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [country, setCountry] = useState('');

//   useEffect(() => {
//     if (map.current) return; // Initialize map only once

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/dark-v10',
//       center: [0, 0],
//       zoom: 1,
//       projection: 'globe' // Display the map as a globe
//     });

//     map.current.on('style.load', () => {
//       map.current.setFog({
//         'range': [-1, 1],
//         'horizon-blend': 0.03,
//         'color': '#f8f0e3',
//         'high-color': '#add8e6',
//         'space-color': '#000000',
//         'star-intensity': 0.15
//       });

//       // Add markers to the map
//       countryMarkers.forEach(marker => {
//         const el = document.createElement('div');
//         el.className = 'marker';

//         new mapboxgl.Marker(el)
//           .setLngLat(marker.coordinates)
//           .addTo(map.current);

//         el.addEventListener('click', () => {
//             //console.log(marker);
//             setModalContent(countryDataToContent(marker));
//             setCountry(marker.country);
//             setShowModal(true);
//         });
//       });
//     });
//   }, []);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
//       <Modal show={showModal} onClose={handleCloseModal} content={modalContent} country={country} />
//       <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
//         <Typewriter
//           words={quotes}
//           loop={false}
//           cursor
//           cursorStyle='🧸'
//           typeSpeed={40}
//           deleteSpeed={40}
//           delaySpeed={1000}
//         />
//       </div>
//     </div>
//   );
// };

// export default Map;


// src/Map.js
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { countryMarkers } from '../constants/Country-Coords';
import countryDataToContent from '../components/services/countryDataToContent';
import "mapbox-gl/dist/mapbox-gl.css";
import Modal from './Modal';
import MiniModal from './MiniModal';
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
  const [country, setCountry] = useState('');
  const [miniModals, setMiniModals] = useState([]);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [0, 0],
      zoom: 1,
      projection: 'globe' // Display the map as a globe
    });
    map.current.on('load', function() {
      map.current.addLayer(
        {
          id: 'country-boundaries',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.country-boundaries-v1',
          },
          'source-layer': 'country_boundaries',
          type: 'fill',
          paint: {
            'fill-color': '#d2361e',
            'fill-opacity': 0.4,
          },
        },
        'country-label'
      );
      map.current.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3",
        'NLD',
        'ITA'
      ]);
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
            setCountry(marker.country);
            setShowModal(true);
        });
      });
    });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartAgent = async () => {
    setShowModal(false);
    const endpoints = [
      `http://34.226.142.145/api/current_policy?country=${encodeURIComponent(country)}`,
      `http://34.226.142.145/api/similar_policy?country=${encodeURIComponent(country)}`,
      `http://34.226.142.145/api/calculate_prediction?country=${encodeURIComponent(country)}`,
      `http://34.226.142.145/api/generate_recommendation?country=${encodeURIComponent(country)}`,
    ];

    const positions = [
      { top: '5%', left: '5%' },
      { top: '5%', left: '55%' },
      { top: '50%', left: '5%' },
      { top: '50%', left: '55%' }
    ];

    for (let i = 0; i < endpoints.length; i++) {
      try {
        const response = await fetch(endpoints[i]);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Response is not JSON');
        }

        const data = await response.json();
        const dataString = JSON.stringify(data);

        setMiniModals((prevModals) => [
          ...prevModals,
          { content: dataString, position: positions[i] }
        ]);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setMiniModals((prevModals) => [
          ...prevModals,
          { content: 'Error fetching data', position: positions[i] }
        ]);
      }
    }
  };

  const handleMiniModalClose = (index) => {
    setMiniModals((prevModals) => prevModals.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onStartAgent={handleStartAgent}
        content={modalContent}
        country={country}
      />
      {miniModals.map((modal, index) => (
        <MiniModal
          key={index}
          content={modal.content}
          position={modal.position}
          onClose={() => handleMiniModalClose(index)}
        />
      ))}
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
