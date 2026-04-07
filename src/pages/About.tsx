import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { Brain, Layers, BarChart3, Shield, Microscope, Zap } from "lucide-react";

const techStack = [
  { icon: Brain, title: "EfficientNet-B3 + Vision Transformer", desc: "Hybrid architecture combining CNN's spatial feature extraction with ViT's global attention mechanism for robust cell classification." },
  { icon: Layers, title: "Class Imbalance Handling", desc: "SMOTE oversampling, focal loss, and weighted cross-entropy to handle imbalanced parasite stage distributions in training data." },
  { icon: Microscope, title: "Stain Normalization (Macenko)", desc: "Optical density decomposition to normalize H&E stain variations across different laboratories and imaging conditions." },
  { icon: BarChart3, title: "Grad-CAM Interpretability", desc: "Gradient-weighted Class Activation Mapping generates heatmaps showing which cell regions drive the model's predictions." },
  { icon: Shield, title: "Uncertainty Quantification", desc: "Monte Carlo Dropout and prediction entropy flag low-confidence samples for expert review, reducing false negatives." },
  { icon: Zap, title: "Data Augmentation Pipeline", desc: "Random rotations, flips, color jitter, elastic deformations, and Mixup to improve generalization on noisy microscope images." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
        <h1 className="font-display text-4xl font-bold mb-4 text-foreground">
          AI <span className="gradient-text">Methodology</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our malaria detection system is built on a state-of-the-art deep learning pipeline, designed for clinical reliability. 
          The model addresses key challenges: class imbalance across parasite stages, image noise from varying microscope 
          setups, staining variability across labs, and the critical need for interpretable predictions in medical contexts.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {techStack.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-primary/30 transition-all"
          >
            <t.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-2">{t.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline diagram */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-8">
        <h2 className="font-display text-2xl font-bold mb-6 text-foreground">Model Pipeline</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {["Raw Image", "→", "Stain Normalization", "→", "Augmentation", "→", "EfficientNet-B3", "→", "ViT Encoder", "→", "Classification Head", "→", "Grad-CAM"].map((s, i) => (
            <span key={i} className={s === "→" ? "text-primary font-bold text-lg" : "px-4 py-2 rounded-lg bg-secondary text-foreground font-display font-medium"}>
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
    <Chatbot />
  </div>
);

export default About;
