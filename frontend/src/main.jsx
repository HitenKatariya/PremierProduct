import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Ensure session-based auth data is cleared on tab close or refresh
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
    } catch (e) {
      // Ignore storage errors
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
