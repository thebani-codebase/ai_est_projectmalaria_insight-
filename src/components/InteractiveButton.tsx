import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const InteractiveButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  size = "md" 
}: InteractiveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-accent text-primary-foreground border border-primary/50",
    secondary:
      "bg-secondary text-secondary-foreground border border-secondary/50 hover:border-primary/50",
    outline:
      "border-2 border-primary text-primary hover:bg-primary/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg font-semibold transition-all duration-300 ${baseClasses[size]} ${variantClasses[variant]} group`}
    >
      {/* Ripple effect */}
      {isHovered && (
        <motion.span
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}

      {/* Shimmer effect */}
      <motion.div
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          transform: isHovered ? "translateX(0)" : "translateX(-100%)",
        }}
      />

      {/* Content */}
      <motion.span
        className="relative flex items-center justify-center gap-2"
        animate={isHovered ? { letterSpacing: "0.05em" } : { letterSpacing: "0" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl rounded-lg -z-10" />
      )}
    </motion.button>
  );
};

export default InteractiveButton;
