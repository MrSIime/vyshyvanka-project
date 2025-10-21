import React from 'react';
import { MapContainer, GeoJSON, Marker } from 'react-leaflet';
import L from 'leaflet';
import ukraineGeoData from './ukraine-oblasts.json';
import { artifacts } from '../infopanel/mockdata';
import './MapView.css';

const center = [48.3794, 31.1656];

const geoJsonStyle = {
  fillColor: '#DCDCDC',
  weight: 1.5,
  color: '#FFFFFF',
  fillOpacity: 1,
};

const customDotIcon = (isSelected) => {
  const size = isSelected ? 12 : 8;
  const color = '#111111';
  
  const iconHtml = `
    <div 
      style="
        width: ${size}px; 
        height: ${size}px; 
        background-color: ${color}; 
        border-radius: 50%;
      "
      class="${isSelected ? 'selected-marker' : ''}"
    ></div>
  `;
  
  return new L.divIcon({
    html: iconHtml,
    className: 'custom-dot-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function MapView({ selectedId, onMarkerClick }) {
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
    </MapContainer>
  );
}

export default MapView;