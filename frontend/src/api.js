// Vite автоматично підставить правильну URL зі змінних середовища.
// Для локальної розробки це буде http://localhost:8000, а для Vercel - ваша URL на Render.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Отримує список всіх артефактів для карти (id, title, coordinates).
 * @returns {Promise<Array>} Масив об'єктів артефактів.
 */
export const fetchArtifactsForMap = async () => {
  const response = await fetch(`${API_URL}/api/artifacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch artifacts for map');
  }
  return response.json();
};

/**
 * Отримує повну інформацію про один артефакт за його ID.
 * @param {number} id - ID артефакту.
 * @returns {Promise<Object>} Об'єкт з деталями артефакту.
 */
export const fetchArtifactDetails = async (id) => {
  const response = await fetch(`${API_URL}/api/artifacts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch artifact details with id ${id}`);
  }
  return response.json();
};

/**
 * Надсилає зображення на аналіз.
 * @param {File} file - Файл зображення для аналізу.
 * @returns {Promise<Object>} Об'єкт з результатами аналізу.
 */
export const analyzeImage = async (file) => {
  // Створюємо об'єкт FormData для надсилання файлу
  const formData = new FormData();
  formData.append('file', file);

  // Надсилаємо POST-запит на ендпоінт /api/analysis
  const response = await fetch(`${API_URL}/api/analysis`, {
    method: 'POST',
    body: formData,
  });

  // Обробляємо можливі помилки
  if (!response.ok) {
    const errorData = await response.json();
    // Викидаємо помилку з текстом, який надіслав бекенд
    throw new Error(errorData.detail || 'Failed to analyze image');
  }
  
  // Повертаємо результат у форматі JSON
  return response.json();
};