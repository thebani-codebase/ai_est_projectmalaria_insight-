import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Zap, BarChart3 } from "lucide-react";
import FloatingCard from "./FloatingCard";

const DatasetSection = () => {
  const [activeDataset, setActiveDataset] = useState(0);

  const datasetSteps = [
    {
      cell: "CELL 1",
      title: "Install + Imports + Seed",
      description: "Initialize environment and dependencies",
      icon: "🔧",
    },
    {
      cell: "CELL 2",
      title: "Kaggle NIH Dataset Download",
      description: "Download + Extract (multi-species + IEEE dataport)",
      icon: "📥",
    },
    {
      cell: "CELL 3",
      title: "6-Class Unified Dataset Build",
      description: "Copy, normalize, split dataset classes",
      icon: "🗂️",
    },
    {
      cell: "CELL 4",
      title: "OpenCV + Augmentation",
      description: "Image preprocessing (Common Classes normalization)",
      icon: "🎨",
    },
    {
      cell: "CELL 5",
      title: "DOGAN - Rare Class Generation",
      description: "Synthetic data for rare classes (Schizont + Gametocyte)",
      icon: "✨",
    },
    {
      cell: "CELL 6",
      title: "PyTorch Dataset + DataLoader",
      description: "Weighted/Random Sampling for balanced batches",
      icon: "⚙️",
    },
    {
      cell: "CELL 7",
      title: "Novel CNN+ViT Hybrid Model",
      description: "Define architecture with attention gating",
      icon: "🧠",
    },
    {
      cell: "CELL 8",
      title: "Focal Loss + Regularization",
      description: "CosineAnnealing scheduler with AdamW",
      icon: "📉",
    },
    {
      cell: "CELL 9",
      title: "Training Loop (50 Epochs)",
      description: "Best Model Save + Early Stopping",
      icon: "🚀",
    },
    {
      cell: "CELL 10",
      title: "4 Baseline Models Evaluation",
      description: "CNN, ViT, ResNet50, EfficientNet-B1 comparison",
      icon: "📊",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative py-24 border-b border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-blue-500/5 to-background/0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Dataset & <span className="gradient-text">Training Pipeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive workflow from data collection to model evaluation with GAN-based balancing
          </p>
        </motion.div>

        {/* Dataset Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: Database,
              label: "Dataset Source",
              value: "Kaggle + NIH",
              desc: "Multi-species parasites",
            },
            {
              icon: Zap,
              label: "Data Balancing",
              value: "DOGAN GANs",
              desc: "Synthetic generation for rare classes",
            },
            {
              icon: BarChart3,
              label: "Total Classes",
              value: "6 Classes",
              desc: "5 parasite types + Uninfected",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-6 border border-border/50 hover:border-blue-500/50 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="glass-card p-8 border-2 border-blue-500/30">
            <h3 className="font-display text-2xl font-bold mb-8">10-Stage Training Pipeline</h3>

            {/* Interactive Pipeline */}
            <div className="mb-8">
              <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-2 min-w-max"
                >
                  {datasetSteps.map((step, idx) => (
                    <motion.button
                      key={step.cell}
                      variants={itemVariants}
                      onClick={() => setActiveDataset(idx)}
                      className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                        activeDataset === idx
                          ? "bg-gradient-to-r from-blue-500 to-accent text-white scale-110"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {step.icon} {step.cell}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Active Step Details */}
            <motion.div
              key={activeDataset}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card bg-gradient-to-br from-blue-500/10 to-accent/10 p-8 border border-blue-500/30 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-2">{datasetSteps[activeDataset].icon}</div>
                  <h4 className="text-2xl font-bold mb-2">{datasetSteps[activeDataset].title}</h4>
                  <p className="text-muted-foreground">{datasetSteps[activeDataset].description}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-400">
                    {activeDataset + 1}/{datasetSteps.length}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 h-2 bg-background rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeDataset + 1) / datasetSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-accent"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* GAN Data Balancing Info */}
        <FloatingCard delay={0.4} intensity={0.5}>
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🤖</span> DOGAN - GAN-Based Data Balancing
            </h3>
            <p className="text-muted-foreground mb-6">
              Deep Oversampling GAN (DOGAN) generates synthetic rare malaria parasite images to balance dataset imbalance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card bg-emerald-500/5 p-4 border border-emerald-500/30">
                <div className="font-semibold mb-2">🎯 Rare Classes Generated:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Schizont (mature stage)</li>
                  <li>• Gametocyte (transmission stage)</li>
                </ul>
              </div>

              <div className="glass-card bg-blue-500/5 p-4 border border-blue-500/30">
                <div className="font-semibold mb-2">✨ Benefits:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Improved minority class detection</li>
                  <li>• Reduced overfitting</li>
                </ul>
              </div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
};

export default DatasetSection;
