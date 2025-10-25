import React, { useEffect } from 'react';
import { MapContainer, GeoJSON, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import ukraineGeoData from './ukraine-oblasts.json';
import './MapView.css';

const center = [48.3794, 31.1656];

const geoJsonStyle = {
  fillColor: '#EDEDED',
  weight: 1,
  color: '#959595',
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
        >
          <Tooltip 
            direction="bottom" 
            offset={[0, 10]} 
            opacity={1} 
            permanent={false} 
            className="custom-map-tooltip" 
          >
            <div className="tooltip-content">
              {item.photo_url && <img src={item.photo_url} alt={item.title} className="tooltip-image" />}
              <h4 className="tooltip-title">{item.title}</h4>
              <p className="tooltip-location">{item.location}</p>
            </div>
          </Tooltip>
        </Marker>
      ))}

      <ResizeMapEffect isPanelOpen={isPanelOpen} />
    </MapContainer>
  );
}

export default MapView;