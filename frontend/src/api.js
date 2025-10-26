const API_URL = import.meta.env.VITE_API_URL;

/**
 * Отримує список всіх артефактів для карти (id, title, coordinates).
 * @returns {Promise<Array>}
 */
export const fetchArtifactsForMap = async () => {
  const response = await fetch(`${API_URL}/api/artifacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch artifacts for map');
  }
  return response.json();
};

/**
 * 
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const fetchArtifactDetails = async (id) => {
  const response = await fetch(`${API_URL}/api/artifacts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch artifact details with id ${id}`);
  }
  return response.json();
};

/**
 * 
 * @param {File} file
 * @returns {Promise<Object>}
 */
export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/analysis`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to analyze image');
  }
  
  return response.json();
};