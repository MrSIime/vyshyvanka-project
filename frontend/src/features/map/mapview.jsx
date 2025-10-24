import React, { useEffect } from 'react';
import { MapContainer, GeoJSON, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import ukraineGeoData from './ukraine-oblasts.json';
import './MapView.css';

const center = [48.3794, 31.1656];

// ВИРІШЕННЯ №1: Оновлюємо стилі карти згідно з вашими кольорами
const geoJsonStyle = {
  fillColor: '#EDEDED', // Правильний колір заливки
  weight: 1,             // Робимо контур тоншим для чистоти
  color: '#959595',    // Правильний колір контуру
  fillOpacity: 1,
};

const customDotIcon = (isSelected) => {
  const size = 8;
  const color = isSelected ? '#D52B1E' : '#111111';
  
  const iconHtml = `
    <div 
      style="
        width: ${size}px; 
        height: ${size}px; 
        background-color: ${color}; 
        border-radius: 50%;
        /* ВИРІШЕННЯ №2: Прибираємо тінь для простоти */
      "
    ></div>
  `;
  
  return new L.divIcon({
    html: iconHtml,
    className: 'custom-dot-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const ResizeMapEffect = ({ isPanelOpen }) => {
    const map = useMap();
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 400);

        return () => clearTimeout(timer);
    }, [isPanelOpen, map]);

    return null;
};


function MapView({ artifacts, selectedId, onMarkerClick, isPanelOpen }) {
  return (
    <MapContainer center={center} zoom={6} scrollWheelZoom={true} zoomControl={false} className="map-container" attributionControl={false}>
      <GeoJSON data={ukraineGeoData} style={geoJsonStyle} />
      
      {artifacts.map((item) => (
        <Marker
          key={item.id}
          position={item.coordinates}
          icon={customDotIcon(item.id === selectedId)}
          eventHandlers={{
            click: () => {
              onMarkerClick(item.id);
            },
          }}
        />
      ))}

      <ResizeMapEffect isPanelOpen={isPanelOpen} />
    </MapContainer>
  );
}

export default MapView;