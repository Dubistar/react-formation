import { createContext, useCallback, useContext, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Toast } from "./Toast.jsx";

const ToastContext = createContext();

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  // Factory Method pour créer un toast avec ID unique
  const createToast = useCallback((config) => {
    const id = config.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
      id,
      type: config.type || 'info',
      content: config.content,
      duration: config.duration || 3000
    };
  }, []);

  // Pattern Command pour l'ajout de toast
  const pushToast = useCallback((config) => {
    const toast = createToast(config);
    console.log('Toast ajouté:', toast);
    
    setToasts(prev => {
      const newToasts = [...prev, toast];
      console.log('Nouveaux toasts:', newToasts);
      return newToasts;
    });
    
    // Auto-remove avec cleanup
    if (toast.duration > 0) {
      const timeoutId = setTimeout(() => {
        console.log('Auto-suppression du toast:', toast.id);
        removeToast(toast.id);
      }, toast.duration);
      
      timeoutsRef.current.set(toast.id, timeoutId);
    }
    
    return toast.id;
  }, []);

  // Pattern Command pour la suppression avec délai pour l'animation
  const removeToast = useCallback((id) => {
    console.log('Suppression du toast:', id);
    
    // Nettoyer le timeout
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    
    // Supprimer le toast (Framer Motion gère l'animation de sortie)
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Cleanup à la destruction du composant
  const clearAllToasts = useCallback(() => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current.clear();
    setToasts([]);
  }, []);

  // Pattern Facade pour l'API publique
  const contextValue = {
    pushToast,
    removeToast,
    clearAllToasts,
    toasts
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Portal avec AnimatePresence pour les animations */}
      <div 
        id="toast-portal"
        style={{ 
          position: "fixed", 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 999999,
          overflow: "hidden"
        }}
      >
        <div
          className="toast-container"
          style={{ 
            position: "absolute", 
            top: "20px", 
            right: "20px", 
            zIndex: 999999,
            pointerEvents: "none"
          }}
        >
          {/* AnimatePresence gère les animations d'entrée/sortie */}
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => {
              console.log('Rendu du toast avec AnimatePresence:', toast);
              return (
                <div key={toast.id} style={{ pointerEvents: "auto" }}>
                  <Toast 
                    {...toast} 
                    onRemove={removeToast}
                  />
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

// Custom Hook avec Pattern Facade
export function useToasts() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToasts doit être utilisé dans un ToastContextProvider');
  }
  
  return context;
}