import React from 'react';
import './ModeSwitcher.css';

// Імпортуємо SVG-іконки як React-компоненти
import LocationIcon from '../../assets/icons/location.svg';
import GraphIcon from '../../assets/icons/graph.svg';

function ModeSwitcher({ activeMode, onModeChange }) {
  return (
    <div className="mode-switcher-container">
      <button
        className={`mode-button ${activeMode === 'vyshyvky' ? 'active' : ''}`}
        onClick={() => onModeChange('vyshyvky')}
      >
        <img src={LocationIcon} className="icon" />
        Вишивки
      </button>

      <button
        className={`mode-button ${activeMode === 'styles' ? 'active' : ''}`}
        onClick={() => onModeChange('styles')}
      >
        <img src={GraphIcon} className="icon" />
        Стилі
      </button>
    </div>
  );
}

export default ModeSwitcher;