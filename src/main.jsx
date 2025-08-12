import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from './App.jsx'
import { ThemeContextProvider } from './hooks/useTheme.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContextProvider } from './components/toast/ToastContext.jsx'
import { ConfirmContextProvider } from './components/modal/ConfirmContext.jsx'

// CSS global pour les toasts - à ajouter au début
const globalToastStyles = `
  /* Styles globaux pour forcer l'affichage des toasts */
  #toast-portal {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    pointer-events: none !important;
    z-index: 999999 !important;
    overflow: hidden !important;
  }
  
  .toast-container {
    position: absolute !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 999999 !important;
    pointer-events: none !important;
  }
  
  .toast {
    pointer-events: auto !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
  }
  
  /* Reset pour éviter les conflits */
  .toast * {
    box-sizing: border-box !important;
  }
`;

// Injecter les styles globaux
const styleElement = document.createElement('style');
styleElement.textContent = globalToastStyles;
document.head.appendChild(styleElement);

// Debug: vérifier la structure DOM
console.log('DOM root element:', document.getElementById('root'));

createRoot(document.getElementById('root')).render(
    <ToastContextProvider>
        <StrictMode>
          <ConfirmContextProvider>
             <ThemeContextProvider> 
                {/* The ThemeContextProvider wraps the App to provide theme context */}
                <RouterProvider router={router} />
             </ThemeContextProvider> 
          </ConfirmContextProvider>
        </StrictMode>
    </ToastContextProvider>
)