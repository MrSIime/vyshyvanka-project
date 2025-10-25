import React, { useState, useEffect } from 'react';
import MapView from './features/map/mapview';
import Infopanel from './features/infopanel/infopanel';
import AnalysisModal from './features/analysis/analysismodal';
import './App.css';
import LogoIcon from './assets/icons/logo.svg';
import SearchIcon from './assets/icons/search.svg';
import { fetchArtifactsForMap, fetchArtifactDetails } from './api.js';

const AnalysisButton = ({ onClick }) => ( <button className="analysis-button" onClick={onClick}><img src={SearchIcon} alt="search" className="button-icon" /><span>Аналіз</span></button> );
const ApiButton = () => ( <a href="#" className="api-button"><span>API</span><span>↗</span></a> );

function App() {
  const [artifacts, setArtifacts] = useState([]); 
  const [selectedArtifact, setSelectedArtifact] = useState(null); 
  const [selectedId, setSelectedId] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const mapData = await fetchArtifactsForMap();
        setArtifacts(mapData);

        if (mapData && mapData.length > 0) {
          handleMarkerClick(mapData[0].id);
        }
      } catch (error) {
        console.error("Не вдалося завантажити початкові дані:", error);
      }
    };

    loadInitialData();
  }, []);

  const handleMarkerClick = async (id) => {
    setSelectedId(id);
    try {
      const details = await fetchArtifactDetails(id);
      setSelectedArtifact(details);
      setIsPanelOpen(true);
    } catch (error) {
      console.error(`Не вдалося завантажити деталі для артефакту ${id}:`, error);
    }
  };

  const handlePanelToggle = () => setIsPanelOpen(!isPanelOpen);

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

      {modalOpen && <AnalysisModal onClose={() => setModalOpen(false)} onNavigate={() => {}} />}
    </div>
  );
}

export default App;