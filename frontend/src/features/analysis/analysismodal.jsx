import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './analysismodal.css';
// ВИПРАВЛЕНИЙ ШЛЯХ: Тепер веде до єдиного файлу mockdata.js у корені src
import { artifacts as allArtifacts, styles } from '../../mockdata.js';
import UploadIcon from '../../assets/icons/upload.svg';
import BirdIcon from '../../assets/icons/bird.svg';
import DownloadIcon from '../../assets/icons/download.svg';

const AnalysisResult = ({ analysisData, imageBase64, similarArtifacts, onArtifactClick }) => (
  <div className="result-view modal-body">
    <div className="result-image-gallery">
       <div className="result-image-container">
            {imageBase64 ? (
                <img src={imageBase64} alt="extracted-ornament" className="result-image" />
            ) : (
                <p className="error-message centered">Немає орнаменту</p>
            )}
        </div>
    </div>

    {analysisData && (
        <div className="result-details">
            <h2 className="result-main-title">{analysisData.name || "Стиль не визначено"}</h2>
            <div className="details-grid">
                <span className="detail-label">Імовірне походження:</span>
                <span className="detail-value">{analysisData.mockLocation || "-"}</span>

                <span className="detail-label">Символи:</span>
                <span className="detail-value symbols">
                    {analysisData.key_elements?.map((el, i) => (
                        <span key={i} title={el.description}>
                            {el.name === 'Птахи' ? <img src={BirdIcon} alt="Птахи" className="symbol-icon"/> : el.name}
                        </span>
                     )) || "-"}
                     {(!analysisData.key_elements || analysisData.key_elements.length === 0) && <span>-</span>}
                </span>

                <span className="detail-label">Ключові техніки:</span>
                <span className="detail-value">{analysisData.technique || "-"}</span>

                <span className="detail-label">Домінантні кольори:</span>
                <div className="colors-gallery-inline">
                    {analysisData.key_colors?.map((item, i) => (
                    <div key={i} className="color-swatch-inline" style={{ backgroundColor: item.hex }} title={item.name}></div>
                    ))}
                    {(!analysisData.key_colors || analysisData.key_colors.length === 0) && <span>-</span>}
                </div>
            </div>
        </div>
    )}

    <hr className="divider" />

    {similarArtifacts?.length > 0 && (
        <div>
            <h3 className="result-section-title similar-title">Схожі знахідки з Атласу</h3>
            <div className="similar-artifacts-list">
                {similarArtifacts.map((artifact) => (
                    <button key={artifact.id} className="similar-artifact-item" onClick={() => onArtifactClick(artifact.id)}>
                        <img src={artifact.photo_url || 'https://placehold.co/80x80?text=?'} alt={artifact.title} className="similar-artifact-image" />
                        <div className="similar-artifact-info">
                            <h5 className="similar-artifact-title">{artifact.title}</h5>
                            <p className="similar-artifact-location">{artifact.location}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )}
     {(!similarArtifacts || similarArtifacts.length === 0) && (
         <div>
            <h3 className="result-section-title similar-title">Схожі знахідки з Атласу</h3>
            <p className="no-similar-found">Схожих артефактів у базі не знайдено.</p>
         </div>
     )}
  </div>
);

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Аналізуємо зображення...</p>
    <p className="loading-note">Це може зайняти до хвилини</p>
  </div>
);

// Функція тепер приймає ID стилю, а не весь об'єкт
function findSimilarArtifacts(styleId) {
   if (!styleId) return [];
    return allArtifacts
        .filter(artifact => artifact.style_id === styleId)
        .slice(0, 2);
}

function AnalysisModal({ onClose, onNavigate }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [resultImage, setResultImage] = useState(null); // Починаємо з null, щоб не показувати placeholder
  const [analysisData, setAnalysisData] = useState(null);
  const [similarArtifacts, setSimilarArtifacts] = useState([]);
  const [error, setError] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const currentFile = acceptedFiles[0];
    if (currentFile) {
        setFile(currentFile);
        // Показуємо прев'ю завантаженого зображення
        const reader = new FileReader();
        reader.onload = (e) => setResultImage(e.target.result);
        reader.readAsDataURL(currentFile);
        setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handleAnalyze = () => {
    if (!file) return;
    setStatus('loading');
    setError(null);
    setAnalysisData(null);
    setSimilarArtifacts([]);

    setTimeout(() => {
        try {
            // ВИПРАВЛЕНА ЛОГІКА: працюємо з об'єктом `styles`, а не масивом
            const styleIds = Object.keys(styles).map(Number); // Отримуємо масив ID: [2, 4, 8]
            const randomId = styleIds[Math.floor(Math.random() * styleIds.length)];
            const randomStyleName = styles[randomId];

            // Створюємо mock-об'єкт для аналізу
            const mockStyleAnalysis = {
                id: randomId,
                name: randomStyleName,
                mockLocation: "Приклад області, Регіон",
                // Додаємо mock-дані, щоб компонент не був порожнім
                key_elements: [{ name: 'Птахи', description: 'Символ свободи' }],
                technique: 'Хрестик, низинка',
                key_colors: [{ hex: '#CC0000', name: 'Червоний' }, { hex: '#000000', name: 'Чорний' }],
            };
            
            setAnalysisData(mockStyleAnalysis);

            // Шукаємо схожі артефакти за ID стилю
            const foundSimilar = findSimilarArtifacts(mockStyleAnalysis.id);
            setSimilarArtifacts(foundSimilar);
            
            setStatus('success');
        } catch (e) {
            console.error("Помилка обробки mock даних:", e);
            setError("Сталася помилка під час аналізу.");
            setStatus('idle');
        }
    }, 1500);
  };
  
  const handleNewAnalysis = () => {
    setFile(null);
    setStatus('idle');
    setResultImage(null);
    setAnalysisData(null);
    setSimilarArtifacts([]);
    setError(null);
  };

  const handleArtifactClick = (artifactId) => {
    if (onNavigate) {
        onNavigate(artifactId);
    }
    onClose(); // Завжди закриваємо модалку після кліку
  };

  const renderContent = () => {
    if (status === 'success') {
      return <AnalysisResult 
                analysisData={analysisData}
                imageBase64={resultImage}
                similarArtifacts={similarArtifacts}
                onArtifactClick={handleArtifactClick} 
             />;
    }

    if (status === 'loading') {
      return <LoadingSpinner />;
    }

    return (
      <div className="idle-view">
        {file ? (
          <div className="file-preview">
            <p title={file.name}>{file.name}</p>
            <button onClick={handleNewAnalysis} className="remove-file-button">×</button>
          </div>
        ) : (
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <img src={UploadIcon} alt="upload" className="upload-icon"/>
            <p>Перетягнітe файл сюди або <span className="upload-link">натисніть</span></p>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <button 
          className="analysis-action-button main-analyze-button" 
          onClick={handleAnalyze} 
          disabled={!file || status === 'loading'}
        >
          Аналізувати
        </button>
      </div>
    );
  };

  const renderFooter = () => {
    if (status === 'success') {
      return (
         <div className="modal-footer success-footer">
            <button className="download-button" onClick={() => {/* Логіка завантаження */}}>
                <img src={DownloadIcon} alt="download" className="button-icon-small"/>
                <span>орнамент</span>
            </button>
            <button className="analysis-action-button new-analysis-button" onClick={handleNewAnalysis}>
                Новий аналіз
            </button>
         </div>
      );
    }
     return null; 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Аналіз вишивки</h2>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        {renderContent()}
        {renderFooter()}
      </div>
    </div>
  );
}

export default AnalysisModal;