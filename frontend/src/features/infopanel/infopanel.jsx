import React, { useState } from 'react';
import VyshyvkaView from './vyshyvkaview';
import StyleView from './styleview';
import './infopanel.css';

function Infopanel({ selectedartifactid }) {
  const [viewMode, setViewMode] = useState('vyshyvka');
  const [selectedStyleId, setSelectedStyleId] = useState(null);

  const handleStyleClick = (styleId) => {
    setSelectedStyleId(styleId);
    setViewMode('style');
  };

  const handleBackClick = () => {
    setViewMode('vyshyvka');
    setSelectedStyleId(null);
  };

  return (
    <div className="infopanel-container">
      <div className="infopanel-content">
        {viewMode === 'vyshyvka' && (
          <VyshyvkaView 
            artifactId={selectedartifactid} 
            onStyleClick={handleStyleClick} 
          />
        )}
        {viewMode === 'style' && (
          <StyleView 
            styleId={selectedStyleId} 
            onBackClick={handleBackClick} 
          />
        )}
      </div>
      <div className="infopanel-footer">
        <span>@Copyright</span>
        <a href="#" className="api-button">API</a>
      </div>
    </div>
  );
}

export default Infopanel;