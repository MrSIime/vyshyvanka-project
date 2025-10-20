import React from 'react';

function Styleview({ styleid, ongenerateclick }) {
  return (
    <div className="info-panel">
      <div className="gallery">
      </div>
      <h2>Борщівська вишивка</h2>
      <p>Легенда, втілена у чорних нитках...</p>
      
      <h4>Ключові символи</h4>
      
      <h4>Кольори</h4>

      <button className="button-generate" onClick={ongenerateclick}>
        Згенерувати орнамент
      </button>
    </div>
  );
}

export default Styleview;