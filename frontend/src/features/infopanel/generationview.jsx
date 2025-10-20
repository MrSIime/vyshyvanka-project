import React from 'react';

function Generationview({ styleid, onback }) {
  return (
    <div className="info-panel">
      <button className="back-button" onClick={onback}>← Назад</button>
      
      <h2>Генерація</h2>
      <div className="metadata">
        <span className="label">Вибраний стиль:</span>
        <span className="value">Борщівська вишивка</span>
      </div>
      
      <label htmlFor="prompt" className="prompt-label">Промпт:</label>
      <textarea id="prompt" className="prompt-textarea" placeholder="Введіть ваші ідеї..."></textarea>
      
      <button className="button-generate">Згенерувати</button>
    </div>
  );
}

export default Generationview;