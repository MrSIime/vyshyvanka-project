import React from 'react';
import { artifacts, styles } from './mockData';
import './infopanel.css'; 
import InfoIcon from '../../assets/icons/info.svg';
import ShareIcon from '../../assets/icons/share.svg';

function VyshyvkaView({ artifactId, onStyleClick }) {
  const artifact = artifacts.find(a => a.id === artifactId);
  
  if (!artifact) {
    return <div>Артефакт не знайдено</div>;
  }
  
  const style = styles.find(s => s.id === artifact.styleId);

  return (
    <>
      <div className="infopanel-header">
        <button className="icon-button"><img src={InfoIcon} alt="info" /></button>
        <button className="icon-button"><img src={ShareIcon} alt="share" /></button>
      </div>
      
      <div className="image-gallery">
        <div className="main-image-container">
          <img src={artifact.mainImage} alt={artifact.title} className="main-image" />
        </div>
        <img src={artifact.ornamentImage} alt="ornament" className="ornament-image" />
      </div>

      <h1 className="artifact-title">{artifact.title}</h1>
      
      <div className="data-section">
        <div className="data-block">
          <span className="data-label">Локація:</span>
          <span className="data-value">{artifact.location}</span>
        </div>
        <div className="data-block">
          <span className="data-label">Стиль:</span>
          <a href="#" className="data-link" onClick={() => onStyleClick(artifact.styleId)}>
            {style.name}
          </a>
        </div>
        <div className="data-block">
          <span className="data-label">Опис:</span>
          <span className="data-value">{artifact.description}</span>
        </div>
        <div className="data-block">
           <a href="#" className="data-link">{artifact.museum}</a>
        </div>
      </div>

      <button className="action-button-3d">Подивитися в 3D</button>
    </>
  );
}

export default VyshyvkaView;