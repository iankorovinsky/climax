import React from 'react';
import Draggable from 'react-draggable';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // auto register category to resolve bugs

const MiniModal = ({ header, content, position, onClose }) => {
  const parseData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse data:', error);
      return null;
    }
  };

  const renderContent = (header, content) => {
    if (header === "Calculate Prediction") {
      const parsedData = parseData(content);
      if (parsedData) {
        const labels = Object.keys(parsedData.prediction);
        const dataValues = Object.values(parsedData.prediction);

        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Predicted Values',
              data: dataValues,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
            },
          ],
        };

        const options = {
          plugins: {
            legend: {
              labels: {
                color: 'white' // Change the color here
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'white' // Change the color here
              }
            },
            y: {
              ticks: {
                color: 'white' // Change the color here
              }
            }
          }
        };

        return <Line data={data} options={options} />;
      }
    } else {
      return <p style={{ color: 'white' }}>{content}</p>;
    }
  };

  return (
    <Draggable>
      <div className="mini-modal-overlay" style={position}>
        <div className="mini-modal-content">
          <div>
            <button className="close-button" onClick={onClose}>🌎</button>
          </div>
          <h2>{header}</h2>
          {renderContent(header, content)}
        </div>
      </div>
    </Draggable>
  );
};

export default MiniModal;
