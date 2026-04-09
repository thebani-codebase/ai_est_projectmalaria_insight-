import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

const ResultsSection = () => {
  const [userInView, setUserInView] = useState(false);
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  const [animatedF1, setAnimatedF1] = useState(0);

  useEffect(() => {
    if (!userInView) return;

    const accuracyInterval = setInterval(() => {
      setAnimatedAccuracy((prev) => Math.min(prev + 1, 96.76));
    }, 20);

    const f1Interval = setInterval(() => {
      setAnimatedF1((prev) => Math.min(prev + 0.93, 93.1));
    }, 20);

    return () => {
      clearInterval(accuracyInterval);
      clearInterval(f1Interval);
    };
  }, [userInView]);

  const models = [
    { name: "MobileNetV2 (CNN Only)", accuracy: 94.2, f1: 91.3, auc: 0.92 },
    { name: "ViT (ViT Only)", accuracy: 92.8, f1: 89.5, auc: 0.90 },
    { name: "ResNet50", accuracy: 90.5, f1: 87.2, auc: 0.88 },
    { name: "EfficientNet-B1", accuracy: 93.1, f1: 90.1, auc: 0.91 },
    { name: "Hybrid CNN-ViT ⭐", accuracy: 96.76, f1: 93.1, auc: 0.95 },
  ];

  const perClassResults = [
    { class: "Uninfected", precision: 99.2, recall: 98.8, f1: 99.0 },
    { class: "Parasitized", precision: 94.3, recall: 93.5, f1: 93.9 },
    { class: "Gametocyte", precision: 86.7, recall: 87.2, f1: 86.95 },
  ];

  return (
    <section className="relative py-24 border-b border-border/50 overflow-hidden">
      <div className="absolute inset-0" />
      <motion.div
        animate={{
          background: ["rgba(88, 86, 214, 0.05)", "rgba(139, 92, 246, 0.1)", "rgba(88, 86, 214, 0.05)"],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Performance <span className="gradient-text">Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive evaluation metrics across multiple baseline models and per-class analysis
          </p>
        </motion.div>

        {/* Model Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onViewportEnter={() => setUserInView(true)}
          className="mb-12"
        >
          <div className="glass-card overflow-hidden">
            {/* Title */}
            <div className="border-b border-border/50 p-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h3 className="font-display text-xl font-bold">Model Comparison</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Model</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Accuracy</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">F1 Score</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">AUC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {models.map((model, idx) => (
                    <motion.tr
                      key={model.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`hover:bg-secondary/30 transition-colors ${
                        model.name.includes("⭐") ? "bg-primary/10" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium">{model.name}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <motion.div
                          className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                        >
                          {model.accuracy}%
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <motion.div
                          className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-semibold"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                        >
                          {model.f1}%
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <motion.div
                          className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1 + 0.4, duration: 0.5 }}
                        >
                          {model.auc}
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Accuracy Donut */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 text-center h-full flex flex-col justify-between">
              <h3 className="font-display text-lg font-bold mb-6">Validation Accuracy</h3>

              <div className="flex justify-center mb-6">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="rgba(88, 86, 214, 0.2)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="8"
                    strokeDasharray="251.2 314.16"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 314.16 }}
                    whileInView={{ strokeDashoffset: 314.16 - 251.2 * (animatedAccuracy / 100) }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#58A3E8" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <motion.div className="text-4xl font-bold mb-2">{animatedAccuracy.toFixed(2)}%</motion.div>
              <div className="text-sm text-muted-foreground">Validation Accuracy</div>
            </div>
          </motion.div>

          {/* F1 Score - Average */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 text-center h-full flex flex-col justify-between">
              <h3 className="font-display text-lg font-bold mb-6">Weighted F1 Score</h3>

              <div className="flex justify-center mb-6">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.2)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="8"
                    strokeDasharray="232.6 314.16"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 314.16 }}
                    whileInView={{ strokeDashoffset: 314.16 - 232.6 * (animatedF1 / 100) }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <motion.div className="text-4xl font-bold mb-2">{animatedF1.toFixed(2)}%</motion.div>
              <div className="text-sm text-muted-foreground">Weighted Average F1</div>
            </div>
          </motion.div>

          {/* AUC Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 text-center h-full flex flex-col justify-between">
              <h3 className="font-display text-lg font-bold mb-6">AUC-ROC Score</h3>

              <div className="text-6xl font-bold text-emerald-400 mb-4">0.95</div>
              <div className="text-sm text-muted-foreground">Area Under Curve</div>
              <div className="mt-4 text-xs bg-emerald-500/10 p-2 rounded border border-emerald-500/30">
                Excellent discrimination
              </div>
            </div>
          </motion.div>
        </div>

        {/* Per-Class Results */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 border-2 border-accent/30">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h3 className="font-display text-xl font-bold">Per-Class Metrics</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {perClassResults.map((result, idx) => (
                <motion.div
                  key={result.class}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card bg-secondary/50 p-6 border border-border/50"
                >
                  <h4 className="font-semibold text-lg mb-4">{result.class}</h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Precision</span>
                        <span className="text-sm font-semibold text-blue-400">{result.precision}%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${result.precision}%` }}
                          transition={{ delay: idx * 0.15 + 0.2, duration: 0.8 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Recall</span>
                        <span className="text-sm font-semibold text-purple-400">{result.recall}%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${result.recall}%` }}
                          transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">F1 Score</span>
                        <span className="text-sm font-semibold text-emerald-400">{result.f1}%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${result.f1}%` }}
                          transition={{ delay: idx * 0.15 + 0.4, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
