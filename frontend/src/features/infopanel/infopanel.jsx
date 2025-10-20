import React, { useState } from 'react';
import Vyshyvkaview from './vyshyvkaview';
import Styleview from './styleview';
import Generationview from './generationview';
import './infopanel.css';

function Infopanel({ activemode, selectedartifactid, selectedstyleid }) {
  const [isgenerating, setisgenerating] = useState(false);

  if (isgenerating) {
    return (
      <Generationview
        styleid={selectedstyleid}
        onback={() => setisgenerating(false)}
      />
    );
  }

  if (activemode === 'vyshyvky' && selectedartifactid) {
    return <Vyshyvkaview artifactid={selectedartifactid} />;
  }

  if (activemode === 'styles' && selectedstyleid) {
    return <Styleview styleid={selectedstyleid} ongenerateclick={() => setisgenerating(true)} />;
  }

  return (
    <div className="info-panel placeholder">
      <h3>Оберіть об'єкт на карті</h3>
      <p>Клікніть на артефакт або регіон, щоб побачити детальну інформацію.</p>
    </div>
  );
}

export default Infopanel;