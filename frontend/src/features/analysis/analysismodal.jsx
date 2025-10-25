import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './analysismodal.css';
import { analyzeImage } from '../../api';

// Іконки
const UploadIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" fill="#111111"/></svg> );
const FileIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#111111"/></svg> );
const DownloadIcon = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="black"/></svg> );
const StarIcon = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="black"/></svg> );

const LoadingSpinner = () => (
  <div className="modal-body loading-view">
    <div className="loading-spinner"></div>
    <p>Аналізуємо зображення...</p>
  </div>
);

const AnalysisResult = ({ result, originalImage, onNewAnalysis }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = result.ornamentImage;
        link.download = 'ornament.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="modal-body result-view">
                <div className="result-gallery">
                    <img src={URL.createObjectURL(originalImage)} alt="Original" className="result-image"/>
                    <img src={result.ornamentImage} alt="Ornament" className="result-image"/>
                </div>
                <h2 className="result-title">{result.name}</h2>
                <div className="result-details-grid">
                    <p className="detail-label">Імовірне походження:</p>
                    <p className="detail-value">{result.origin}</p>
                    
                    <p className="detail-label">Символи:</p>
                    <div className="symbols-container">
                        {result.symbols.map((symbol, i) => (
                            <span key={i} className="symbol-item">
                                <StarIcon/> {symbol}
                            </span>
                        ))}
                    </div>

                    <p className="detail-label">Ключові техніки:</p>
                    <div className="techniques-container">
                        {result.techniques.map((tech, i) => <p key={i} className="detail-value">{tech}</p>)}
                    </div>

                    <p className="detail-label">Домінантні кольори:</p>
                    <div className="colors-container">
                        {result.colors.map((color, i) => <div key={i} className="color-swatch" style={{ backgroundColor: color }}></div>)}
                    </div>
                </div>
                
                {/* Блок "Схожі знахідки" видалено згідно з прототипом */}
            </div>
            <div className="modal-footer">
                <button className="footer-button secondary" onClick={handleDownload}><DownloadIcon/> орнамент</button>
                <button className="footer-button primary" onClick={onNewAnalysis}>Новий аналіз</button>
            </div>
        </>
    );
};

// Решта коду залишається без змін
function AnalysisModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const onDrop = useCallback(acceptedFiles => { setFile(acceptedFiles[0]); }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, maxFiles: 1 });

  const handleAnalyze = async () => {
    if (!file || !termsAccepted) return;
    setStatus('loading');
    setError('');
    try {
      const analysisResult = await analyzeImage(file);
      setResult(analysisResult);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Сталася невідома помилка');
      setStatus('error');
    }
  };

  const handleNewAnalysis = () => {
    setFile(null);
    setResult(null);
    setTermsAccepted(false);
    setStatus('idle');
  };

  const renderContent = () => {
    if (status === 'loading') return <LoadingSpinner />;
    if (status === 'success') return <AnalysisResult result={result} originalImage={file} onNewAnalysis={handleNewAnalysis} />;

    return (
      <div className="modal-body">
        {file ? (
          <div className="file-preview">
            <FileIcon />
            <span>{file.name}</span>
          </div>
        ) : (
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <UploadIcon />
            <p>Перетягніть файл сюди або <span className="upload-link">натисніть</span>, щоб завантажити</p>
          </div>
        )}
        <button className="analyze-button" onClick={handleAnalyze} disabled={!file || !termsAccepted}>Аналізувати</button>
        <div className="terms-container">
          <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
          <label htmlFor="terms">Я згоден з <a href="#">Умовами користування</a></label>
        </div>
        { (status === 'error') && <p className="error-message">{error}</p> }
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Аналіз вишивки</h2>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default AnalysisModal;