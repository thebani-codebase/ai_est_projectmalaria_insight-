import { motion } from "framer-motion";
import { useState } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  intensity?: number;
}

const FloatingCard = ({ children, delay = 0, intensity = 1 }: FloatingCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        rotateX: isHovered ? mousePosition.y * intensity : 0,
        rotateY: isHovered ? -mousePosition.x * intensity : 0,
        transformPerspective: 1000,
      }}
      className="transition-all duration-300"
    >
      <motion.div
        animate={isHovered ? { boxShadow: "0 20px 60px rgba(88, 86, 214, 0.3)" } : { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
        className="relative rounded-lg p-6 glass-card border border-border/50 h-full"
      >
        <motion.div
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl -z-10"
        />
        {children}
      </motion.div>
    </motion.div>
  );
};

export default FloatingCard;
