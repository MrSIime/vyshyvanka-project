import React from 'react';
import { styles } from './mockdata';
import './infopanel.css';
import BackIcon from '../../assets/icons/back.svg';
import InfoIcon from '../../assets/icons/info.svg';
import ShareIcon from '../../assets/icons/share.svg';
import BirdIcon from '../../assets/icons/bird.svg';

function StyleView({ styleId, onBackClick }) {
  const style = styles.find(s => s.id === styleId);

  if (!style) {
    return <div>Стиль не знайдено</div>;
  }

  return (
    <>
      <div className="infopanel-header">
        <button className="icon-button" onClick={onBackClick}>
          <img src={BackIcon} alt="back" />
        </button>
        <div>
          <button className="icon-button"><img src={InfoIcon} alt="info" /></button>
          <button className="icon-button"><img src={ShareIcon} alt="share" /></button>
        </div>
      </div>

      <div className="style-image-gallery">
        {style.images.map((img, index) => (
          <img key={index} src={img} alt={`${style.name} example ${index + 1}`} />
        ))}
      </div>

      <h1 className="style-title">{style.name}</h1>
      <p className="style-description">{style.description}</p>
      
      <h2 className="section-title">Ключові символи</h2>
      <div className="symbols-gallery">
         <img src={BirdIcon} alt="bird symbol" />
      </div>

      <h2 className="section-title">Кольори</h2>
      <div className="colors-gallery">
        {style.colors.map((color, index) => (
          <div key={index} className="color-swatch" style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </>
  );
}

export default StyleView;