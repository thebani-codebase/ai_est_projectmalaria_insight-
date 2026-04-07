import { motion } from "framer-motion";
import { Zap, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-cells.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Blood cells under microscope" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Biocon Ltd. — AI-Powered Diagnostics
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Malaria Detection
              <br />
              <span className="gradient-text">Powered by AI</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Advanced CNN model classifying red blood cell images as healthy or malaria-infected
              with Grad-CAM interpretability for medical experts.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-display font-semibold hover:brightness-110 transition-all glow-primary"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-foreground font-display font-medium hover:bg-secondary transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { icon: Brain, title: "EfficientNet + ViT", desc: "Hybrid CNN architecture for robust classification" },
              { icon: Shield, title: "98%+ Accuracy", desc: "Trained on balanced datasets with augmentation" },
              { icon: Zap, title: "Real-time Results", desc: "Instant diagnosis with confidence scoring" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="glass-card p-5 hover:border-primary/30 transition-colors"
              >
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
