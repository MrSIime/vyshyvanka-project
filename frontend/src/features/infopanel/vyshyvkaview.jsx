import React from 'react';

function Vyshyvkaview({ artifactid }) {
  return (
    <div className="info-panel">
      <img className="panel-image" src="URL_TO_ARTIFACT_IMAGE" />
      <h2>Сорочка жіноча, поч. XX ст</h2>
      
      <div className="metadata">
        <span className="label">Локація:</span>
        <span className="value">Київська область, Полісся</span>
      </div>
      <div className="metadata">
        <span className="label">Стиль:</span>
        <a href="#" className="link">Петриківський розпис ↗</a>
      </div>
      
      <button className="button-3d">Подивитися в 3D</button>
    </div>
  );
}

export default Vyshyvkaview;