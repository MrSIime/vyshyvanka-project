import React, { useState } from 'react';
import Infopanel from './features/infopanel/infopanel';
import AnalysisModal from './features/analysis/analysismodal';
import './App.css';
import LogoIcon from './assets/icons/logo.svg';
import SearchIcon from './assets/icons/search.svg';

const AnalysisButton = ({ onClick }) => (
  <button className="analysis-button" onClick={onClick}>
    <img src={SearchIcon} className="search-icon" />
    <span>Аналіз</span>
  </button>
);

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app-container">
      <aside className="left-sidebar">
        <div className="logo">
          <img src={LogoIcon} className="logo-icon" />
          <span className="logo-title">Vyshyvka</span>
        </div>
        <AnalysisButton onClick={() => setModalOpen(true)} />
      </aside>

      <main className="main-content">
        {/* map */}
      </main>

      <aside className="right-sidebar">
        <Infopanel selectedartifactid={selectedId} />
      </aside>

      {modalOpen && <AnalysisModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;