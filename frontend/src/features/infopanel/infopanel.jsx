import React from 'react';

function Infopanel({ selectedartifactid }) {
  return (
    <div>
      <h3>Інформаційна панель</h3>
      <p>ID обраного артефакту: {selectedartifactid}</p>
    </div>
  );
}

export default Infopanel;