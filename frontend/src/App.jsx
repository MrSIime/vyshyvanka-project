import React, { useState } from 'react';
import Infopanel from './features/infopanel/infopanel';
import MapView from './features/map/mapview';
import './App.css';
import LogoIcon from './assets/icons/logo.svg';
import SearchIcon from './assets/icons/search.svg';

const AnalysisButton = ({ onClick }) => (
  <button className="analysis-button" onClick={onClick}>
    <img src={SearchIcon} alt="search" className="button-icon" />
    <span>Аналіз</span>
  </button>
);

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMarkerClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="app-container">
      <aside className="left-sidebar">
        <div className="logo-container">
          <img src={LogoIcon} className="logo-icon" alt="logo" />
          <span className="logo-title">Vyshyvka</span>
        </div>
        <AnalysisButton onClick={() => setModalOpen(true)} />
      </aside>

      <main className="main-content">
        <MapView selectedId={selectedId} onMarkerClick={handleMarkerClick} />
      </main>

      <aside className="right-sidebar">
        <Infopanel selectedartifactid={selectedId} />
      </aside>

      {/* {modalOpen && <AnalysisModal onClose={() => setModalOpen(false)} />} */}
    </div>
  );
}

export default App;