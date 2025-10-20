import React, { useState } from 'react';
import ModeSwitcher from './features/navigation/modeswitcher';
import './App.css';

import LogoIcon from './assets/icons/logo.svg';

function App() {
  const [activeMode, setActiveMode] = useState('vyshyvky');

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="logo">
          <img src={LogoIcon} className="icon" />
          <span id="logo-title">Vyshyvka</span>
        </div>

        <ModeSwitcher
          activeMode={activeMode}
          onModeChange={setActiveMode}
        />
      </div>

      <div className="main-content">
        {/* map + right panel */}
      </div>
    </div>
  );
}

export default App;