import React from 'react';
import './infopanel.css';

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#000000"/>
  </svg>
);

const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="black"/>
    </svg>
);

const InfoPanel = ({ artifact, isOpen, onToggle }) => {
  if (!artifact) {
    return null;
  }

  const panelClasses = `info-panel ${isOpen ? 'open' : 'closed'}`;

  return (
    <aside className={panelClasses}>
      <button className="panel-toggle-button" onClick={onToggle}>
        <ArrowIcon />
      </button>

      <div className="info-panel-layout">
        
        <header className="info-panel-header">
          <button className="info-button">
            <InfoIcon />
          </button>
        </header>

        <main className="info-panel-body">
          <div className="image-container">
            <img src={artifact.photo_url} alt={artifact.title} className="main-image" />
          </div>

          <h2 className="title">{artifact.title}</h2>

          <div className="section">
            <p className="label">Місцезнаходження:</p>
            <p className="value">{artifact.location}</p>
          </div>

          <div className="info-panel-divider" />

          <div className="section">
            <p className="label">Стиль:</p>
            <p className="value">{artifact.styleName}</p>
          </div>

          <div className="info-panel-divider" />

          <div className="section">
            <p className="label">Опис:</p>
            <p className="value description-text">{artifact.description}</p>
          </div>
        </main>
        
        <footer className="info-panel-footer">
          <a href={artifact.source_url} target="_blank" rel="noopener noreferrer" className="link museum-link">
            {artifact.museumName}
          </a>
        </footer>

      </div>
    </aside>
  );
};

export default InfoPanel;