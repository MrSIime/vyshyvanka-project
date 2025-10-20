import React, { useState } from 'react';
import ModeSwitcher from './features/navigation/modeswitcher';
import './App.css';

function App() {
  const [activeMode, setActiveMode] = useState('vyshyvky');

  return (
    <div className="left-panel">
      <div className="logo">Vyshyvka</div>

      <ModeSwitcher 
        activeMode={activeMode} 
        onModeChange={setActiveMode} 
      />
    </div>
  );
}

export default App;