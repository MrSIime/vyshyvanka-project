// Визначаємо базову URL для API.
// Vite автоматично підставить правильне значення зі змінних середовища.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Отримує список всіх артефактів для карти.
 * @returns {Promise<Array>} Масив об'єктів артефактів.
 */
export const fetchArtifactsForMap = async () => {
  const response = await fetch(`${API_URL}/api/artifacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch artifacts');
  }
  return response.json();
};

/**
 * Отримує повну інформацію про один артефакт.
 * @param {number} id - ID артефакту.
 * @returns {Promise<Object>} Об'єкт з деталями артефакту.
 */
export const fetchArtifactDetails = async (id) => {
  const response = await fetch(`${API_URL}/api/artifacts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch artifact with id ${id}`);
  }
  return response.json();
};