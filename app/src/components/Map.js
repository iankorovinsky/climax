import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { countryMarkers } from '../constants/Country-Coords';
import { HFMarkers } from '../constants/HF-Coords';

import countryDataToContent from '../components/services/countryDataToContent'
import "mapbox-gl/dist/mapbox-gl.css";
import Modal from './Modal';
import MiniModal from './MiniModal';
import { Typewriter } from 'react-simple-typewriter';
const headers = [
  'Current Policy',
  'Similar Policy',
  'Calculate Prediction', 
  'Generate Recommendation'
]
const keys = [
  'current_policy',
  'similar_policy',
  'prediction',
  'results'
]
const positions = [
  { top: '5%', left: '5%' },
  { top: '5%', left: '55%' },
  { top: '50%', left: '5%' },
  { top: '50%', left: '55%' }
];

mapboxgl.accessToken = 'pk.eyJ1IjoiaWtvcm92aW5za3kiLCJhIjoiY2x4cWVwemN1MHNqazJpcHdwbTVvdmU3eSJ9.So197HzrXDhSQoUSbDUhUg';

const quotes = [
  "The best way to predict the future is to create it.",
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
  "Whether you think you can, or you think you can’t – you’re right.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "You miss 100% of the shots you don’t take.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only person you are destined to become is the person you decide to be.",
  "Act as if what you do makes a difference. It does.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Your time is limited, don't waste it living someone else's life.",
  "The only place where success comes before work is in the dictionary.",
  "The best revenge is massive success.",
  "The way to get started is to quit talking and begin doing.",
  "Don't be afraid to give up the good to go for the great.",
  "I find that the harder I work, the more luck I seem to have.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Opportunities don't happen. You create them.",
  "Don't let yesterday take up too much of today.",
  "People who are crazy enough to think they can change the world, are the ones who do.",
  "We may encounter many defeats but we must not be defeated.",
  "We generate fears while we sit. We overcome them by action.",
  "The man who has confidence in himself gains the confidence of others.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Do what you can with all you have, wherever you are.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That's the classic entrepreneur.",
  "Knowing is not enough; we must apply. Wishing is not enough; we must do."
];

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [showMinis, setShowMinis] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [country, setCountry] = useState('');
  const [miniModals, setMiniModals] = useState([
    {  content: 'Loading...', position: positions[0], header: 'Fetching The Current Policy' },
    {  content: 'Loading...', position: positions[1], header: 'Fetching A Similar Policy' },
    {  content: 'Loading...', position: positions[2], header: 'Fetching Emissions Predictions' },
    {  content: 'Loading...', position: positions[3], header: 'Fetching Improvement Report' },

  ]);
  const [loadingStates, setLoadingStates] = useState([true, true, true, true])

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
            map.current.flyTo({
              center: marker.coordinates,
              zoom: 5,
              essential:true,
            })
            setModalContent(countryDataToContent(marker));
            setCountry(marker.country);
            setShowModal(true);
            setShowMinis(false);
        });
      });
      HFMarkers.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'hf_marker';

        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates)
          .addTo(map.current);

        el.addEventListener('click', () => {
            //console.log(marker);
            window.open("https://huggingface.co/meta-llama/Meta-Llama-3-8B", '_blank');
        });
      });
    });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartAgent = async () => {
    setShowModal(false);
    setShowMinis(true);
    const endpoints = [
      `http://34.226.142.145/api/current_policy?country=${encodeURIComponent(country)}`,
      `http://34.226.142.145/api/similar_policy?country=${encodeURIComponent(country)}`,
      `http://34.226.142.145/api/calculate_prediction?country=${encodeURIComponent(country)}`,
      `http://34.226.142.145/api/generate_recommendation?country=${encodeURIComponent(country)}`,
    ];

    for (let i = 0; i < endpoints.length; i++) {
      try {
        const response = await fetch(endpoints[i]);
        setLoadingStates((old) => {
          let ls = [...old]
          ls[i] = false
          return ls
        })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Response is not JSON');
        }

        const data = await response.json();
        //console.log(data['current_policy'])
        let dataString = JSON.stringify(data);
        console.log(dataString)
        if (i != 2) {
          dataString = data[keys[i]]
        }
        
        setMiniModals((prevModals) => {
          let ps = [...prevModals]
          ps[i] =  {  content: dataString, position: positions[i], header: headers[i] }
          return ps
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setMiniModals((prevModals) => {
          let ps = [...prevModals]
          ps[i] =     {  content: 'Could not fetch data :(', position: positions[i], header: 'Error!!' }
          return ps
        });
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
      {showMinis ? miniModals.map((modal, index) => (
        <MiniModal
          header={modal.header}
          key={index}
          content={modal.content}
          position={modal.position}
          onClose={() => handleMiniModalClose(index)}
        />
      )): null}
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
