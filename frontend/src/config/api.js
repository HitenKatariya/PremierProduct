// API URL configuration
// VITE_API_URL should be the backend origin, e.g. https://premierproduct-iyi9.onrender.com
const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

// Main API base for all /api routes
const API_BASE_URL = `${API_ORIGIN}/api`;

export { API_ORIGIN, API_BASE_URL };
export default API_BASE_URL;
