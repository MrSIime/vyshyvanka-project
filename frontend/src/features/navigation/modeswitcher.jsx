import React from 'react';
import './ModeSwitcher.css';

import LocationIcon from '../../assets/icons/location-outline.svg';
import PaletteIcon from '../../assets/icons/palette.svg';

function ModeSwitcher({ activeMode, onModeChange }) {
  return (
    <div className="mode-switcher">
      <button
        className={`mode-button ${activeMode === 'vyshyvky' ? 'active' : ''}`}
        onClick={() => onModeChange('vyshyvky')}
      >
        <img src={LocationIcon} className="icon" alt="" />
        <span>Вишивки</span>
      </button>

      <button
        className={`mode-button ${activeMode === 'styles' ? 'active' : ''}`}
        onClick={() => onModeChange('styles')}
      >
        <img src={PaletteIcon} className="icon" alt="" />
        <span>Стилі</span>
      </button>
    </div>
  );
}

export default ModeSwitcher;