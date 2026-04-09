import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import FloatingCard from "./FloatingCard";

const ModelHeroSection = () => {
  const stats = [
    { label: "Validation Accuracy", value: "96.76%", color: "text-emerald-400", icon: "📊" },
    { label: "F1 Score", value: "93.1%", color: "text-blue-400", icon: "🎯" },
    { label: "AUC Score", value: "0.95", color: "text-purple-400", icon: "📈" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 border-b border-border/50">
      {/* Animated gradient background blobs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" /> Hybrid CNN-ViT Model
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Advanced
            <br />
            <span className="gradient-text">Malaria Detection Architecture</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Fusion of MobileNetV2 CNN and Vision Transformer with Attention-based gating for
            intelligent classification of blood cell images.
          </p>

          {/* Key Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
          >
            {stats.map((stat, i) => (
              <FloatingCard key={stat.label} delay={0.5 + i * 0.15} intensity={0.8}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-sm text-muted-foreground font-medium mb-3 group-hover:text-primary transition-colors">
                  {stat.label}
                </div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.8 }}
                  className={`text-4xl md:text-5xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </motion.div>
              </FloatingCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelHeroSection;
