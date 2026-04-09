import { motion } from "framer-motion";
import { Zap, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import InteractiveButton from "./InteractiveButton";
import FloatingCard from "./FloatingCard";
import heroImg from "@/assets/hero-cells.jpg";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Blood cells under microscope" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                <Zap className="w-4 h-4" />
              </motion.div>
              Biocon Ltd. — AI-Powered Diagnostics
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Malaria Detection
              <br />
              <span className="gradient-text">Powered by AI</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Advanced CNN model classifying red blood cell images as healthy or malaria-infected
              with Grad-CAM interpretability for medical experts.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <Link to="/dashboard">
              <InteractiveButton variant="primary" size="lg">
                Get Started 🚀
              </InteractiveButton>
            </Link>
            <Link to="/about">
              <InteractiveButton variant="outline" size="lg">
                Learn More 📚
              </InteractiveButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Brain, title: "EfficientNet + ViT", desc: "Hybrid CNN architecture for robust classification" },
            { icon: Shield, title: "98%+ Accuracy", desc: "Trained on balanced datasets with augmentation" },
            { icon: Zap, title: "Real-time Results", desc: "Instant diagnosis with confidence scoring" },
          ].map((f, i) => (
            <FloatingCard key={f.title} delay={0.8 + i * 0.15} intensity={0.5}>
              <f.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </FloatingCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
