// API URL configuration
// VITE_API_URL should be the backend origin, e.g. https://premierproduct-iyi9.onrender.com
// In development we default to http://localhost:5000, in production we default to the Render URL
const DEFAULT_ORIGIN = import.meta.env && import.meta.env.PROD
	? 'https://premierproduct-iyi9.onrender.com'
	: 'http://localhost:5000';

const API_ORIGIN = (import.meta.env.VITE_API_URL || DEFAULT_ORIGIN).replace(/\/+$/, '');

// Main API base for all /api routes
const API_BASE_URL = `${API_ORIGIN}/api`;

export { API_ORIGIN, API_BASE_URL };
export default API_BASE_URL;
