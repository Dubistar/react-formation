import { motion } from "framer-motion";

// Pattern Strategy pour les styles des toasts
const ToastStyleStrategy = {
  success: {
    background: "#4ade80",
    borderColor: "#22c55e",
    color: "#ffffff"
  },
  error: {
    background: "#ef4444", 
    borderColor: "#dc2626",
    color: "#ffffff"
  },
  warning: {
    background: "#f59e0b",
    borderColor: "#d97706", 
    color: "#ffffff"
  },
  info: {
    background: "#3b82f6",
    borderColor: "#2563eb",
    color: "#ffffff"
  }
};

// Pattern Strategy pour les animations
const ToastAnimationStrategy = {
  success: {
    initial: { x: 300, opacity: 0, scale: 0.8 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: 300, opacity: 0, scale: 0.8 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  error: {
    initial: { x: 300, opacity: 0, rotateX: -90 },
    animate: { x: 0, opacity: 1, rotateX: 0 },
    exit: { x: 300, opacity: 0, rotateX: 90 },
    transition: { type: "spring", stiffness: 400, damping: 30 }
  },
  warning: {
    initial: { x: 300, opacity: 0, y: -20 },
    animate: { x: 0, opacity: 1, y: 0 },
    exit: { x: 300, opacity: 0, y: 20 },
    transition: { type: "tween", duration: 0.3, ease: "easeOut" }
  },
  info: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

export function Toast({ id, type = 'info', content, onRemove }) {
  const styles = ToastStyleStrategy[type] || ToastStyleStrategy.info;
  const animations = ToastAnimationStrategy[type] || ToastAnimationStrategy.info;
  
  console.log('Rendu du Toast avec Framer Motion:', { id, type, content });
  
  return (
    <motion.div 
      className={`toast toast-${type}`}
      layout  // Smooth layout animations when toasts are added/removed
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={animations.transition}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      style={{
        ...styles,
        border: `2px solid ${styles.borderColor}`,
        padding: "12px 16px",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "300px",
        maxWidth: "400px",
        position: "relative",
        zIndex: 999999,
        fontSize: "14px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: "1.4",
        cursor: "default"
      }}
    >
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start" 
      }}>
        <div style={{ flex: 1 }}>
          <motion.div 
            style={{ 
              fontWeight: "600", 
              marginBottom: "4px", 
              textTransform: "capitalize",
              color: styles.color
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {type}
          </motion.div>
          <motion.div 
            style={{ 
              fontSize: "14px", 
              lineHeight: "1.4",
              color: styles.color
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {content}
          </motion.div>
        </div>
        
        <motion.button
          onClick={() => {
            console.log('Fermeture manuelle du toast:', id);
            onRemove(id);
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 90,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: "none",
            border: "none",
            color: styles.color,
            cursor: "pointer",
            fontSize: "18px",
            padding: "0",
            marginLeft: "12px",
            opacity: 0.7,
            lineHeight: "1",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%"
          }}
        >
          ×
        </motion.button>
      </div>
    </motion.div>
  );
}