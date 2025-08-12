import { useToasts } from "../components/toast/ToastContext";
import { motion } from "framer-motion";

export default function ToastPage() {
  const { pushToast, clearAllToasts } = useToasts();
  
  const handleSuccess = () => {
    pushToast({
      content: "Opération réussie avec succès ! Animation spring élégante.",
      type: "success",
      duration: 4000,
    });
  };

  const handleError = () => {
    pushToast({
      content: "Une erreur critique est survenue. Animation avec rotation 3D.",
      type: "error",
      duration: 5000,
    });
  };

  const handleWarning = () => {
    pushToast({
      content: "Attention ! Cette action nécessite une confirmation. Animation fluide.",
      type: "warning",
      duration: 6000,
    });
  };

  const handleInfo = () => {
    pushToast({
      content: "Nouvelle fonctionnalité disponible ! Animation douce et naturelle.",
      type: "info",
      duration: 3000,
    });
  };

  const handleMultiple = () => {
    // Test avec plusieurs toasts en cascade
    setTimeout(() => pushToast({ content: "Premier toast", type: "info", duration: 8000 }), 0);
    setTimeout(() => pushToast({ content: "Deuxième toast", type: "success", duration: 8000 }), 200);
    setTimeout(() => pushToast({ content: "Troisième toast", type: "warning", duration: 8000 }), 400);
    setTimeout(() => pushToast({ content: "Dernier toast", type: "error", duration: 8000 }), 600);
  };

  // Variants pour les boutons
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 16,
        maxWidth: "600px",
        padding: "20px",
        margin: "0 auto"
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎉 Test du Système Toast avec Framer Motion
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ color: "#666", marginBottom: "20px" }}
      >
        Chaque type de toast a sa propre animation personnalisée !
      </motion.p>
      
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleSuccess}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        ✅ Toast Success (Spring Animation)
      </motion.button>
      
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleError}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #dc2626, #b91c1c)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        ❌ Toast Error (3D Rotation)
      </motion.button>
      
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleWarning}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #d97706, #c2410c)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        ⚠️ Toast Warning (Smooth Tween)
      </motion.button>
      
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleInfo}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        ℹ️ Toast Info (Natural Spring)
      </motion.button>
      
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleMultiple}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        🚀 Multiple Toasts (Stagger Effect)
      </motion.button>
      
      <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={clearAllToasts}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #6b7280, #4b5563)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        🗑️ Effacer tous les toasts
      </motion.button>
    </div>
  );
}