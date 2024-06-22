// src/Map.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiaWtvcm92aW5za3kiLCJhIjoiY2x4cWVwemN1MHNqazJpcHdwbTVvdmU3eSJ9.So197HzrXDhSQoUSbDUhUg';

const markers = [
  { coordinates: [0, 0], popupText: 'Marker at [0, 0]' },
  { coordinates: [10, 10], popupText: 'Marker at [10, 10]' },
  { coordinates: [-10, -10], popupText: 'Marker at [-10, -10]' }
];

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

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
      markers.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(marker.popupText))
          .addTo(map.current);
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Map;
