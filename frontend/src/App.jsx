import React, { useState } from 'react';
import ModeSwitcher from './features/navigation/modeswitcher';
import Infopanel from './features/infopanel/infopanel';
import './App.css';

import LogoIcon from './assets/icons/logo.svg';

function App() {
  const [activemode, setactivemode] = useState('vyshyvky');
  const [selectedartifactid, setselectedartifactid] = useState(1);
  const [selectedstyleid, setselectedstyleid] = useState(null);

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="logo">
          <img src={LogoIcon} className="icon" />
          <span id="logo-title">Vyshyvka</span>
        </div>

        <ModeSwitcher
          activemode={activemode}
          onModeChange={setactivemode}
        />
      </div>

      <div className="main-content">
        {/* map */}
      </div>

      <Infopanel
        activemode={activemode}
        selectedartifactid={selectedartifactid}
        selectedstyleid={selectedstyleid}
      />
    </div>
  );
}

export default App;