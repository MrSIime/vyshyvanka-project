import React from 'react';
import './analysismodal.css';

function AnalysisModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2>Аналіз вишивки</h2>
        <p>Перетягніть файл сюди або <a>натисніть</a>, щоб завантажити</p>
      </div>
    </div>
  );
}

export default AnalysisModal;