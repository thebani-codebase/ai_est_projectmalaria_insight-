import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Animated gradient orbs that follow cursor */}
      <motion.div
        animate={{
          x: isMoving ? mousePosition.x - 150 : 0,
          y: isMoving ? mousePosition.y - 150 : 0,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl"
        style={{ top: "-10%", right: "10%" }}
      />
      <motion.div
        animate={{
          x: isMoving ? -(mousePosition.x - 200) * 0.5 : 0,
          y: isMoving ? -(mousePosition.y - 200) * 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 25 }}
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-accent/5 to-primary/5 blur-3xl"
        style={{ bottom: "-15%", left: "-5%" }}
      />
    </div>
  );
};

export default InteractiveBackground;
