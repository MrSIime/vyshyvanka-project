import React, { useState } from 'react';
import MapView from './features/map/mapview';
import Infopanel from './features/infopanel/infopanel';
import AnalysisModal from './features/analysis/analysismodal';
import './App.css';
import LogoIcon from './assets/icons/logo.svg';
import SearchIcon from './assets/icons/search.svg';
// Оновлений і правильний шлях до єдиного файлу з даними
import { artifacts } from './mockdata.js';

const AnalysisButton = ({ onClick }) => (
  <button className="analysis-button" onClick={onClick}>
    <img src={SearchIcon} alt="search" className="button-icon" />
    <span>Аналіз</span>
  </button>
);

const ApiButton = () => (
    <a href="#" className="api-button">
      <span>API</span>
      <span>↗</span>
    </a>
);

function App() {
  // Встановлюємо ID першого артефакту з нового масиву
  const [selectedId, setSelectedId] = useState(artifacts[0]?.id || null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleMarkerClick = (id) => {
    setSelectedId(id);
    setIsPanelOpen(true);
  };

  const handleNavigateFromModal = (artifactId) => {
    setSelectedId(artifactId);
    setModalOpen(false);
    setIsPanelOpen(true);
  };
  
  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const selectedArtifact = artifacts.find(artifact => artifact.id === selectedId);

  return (
    <div className="app-container">
      <aside className="left-sidebar">
        <div className="left-sidebar-top">
          <div className="logo-container">
            <img src={LogoIcon} className="logo-icon" alt="logo" />
            <span className="logo-title">Vyshyvka</span>
          </div>
          <AnalysisButton onClick={() => setModalOpen(true)} />
          <ApiButton />
        </div>
        <span className="social-handle">@vyshyvka</span>
      </aside>

      <main className="main-content-wrapper">
        <MapView
          artifacts={artifacts}
          selectedId={selectedId}
          onMarkerClick={handleMarkerClick}
          isPanelOpen={isPanelOpen}
        />
        <Infopanel
          artifact={selectedArtifact}
          isOpen={isPanelOpen}
          onToggle={handlePanelToggle}
        />
      </main>

      {modalOpen && <AnalysisModal onClose={() => setModalOpen(false)} onNavigate={handleNavigateFromModal} />}
    </div>
  );
}

export default App;