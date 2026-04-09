import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import FloatingCard from "./FloatingCard";

const ArchitectureSection = () => {
  const branchVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 * i, duration: 0.8 },
    }),
  };

  return (
    <section className="relative py-24 border-b border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Model <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dual-pathway processing with CNN feature extraction and Vision Transformer attention mechanism
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* CNN Branch */}
            <motion.div
              custom={0}
              variants={branchVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FloatingCard delay={0.2} intensity={0.6}>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"
                  >
                    <span className="text-blue-400 font-bold">🔷</span>
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold">CNN Branch</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Input", value: "128×128 RGB Images", color: "blue" },
                    { label: "Model", value: "MobileNetV2", color: "blue", desc: "Efficient depthwise separable convolutions" },
                    { label: "Global Average Pooling", value: "1408 → 512-dim", color: "blue", desc: "Spatial aggregation to feature vector" },
                    { label: "CNN Features", value: "512-dim Vector", color: "emerald" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`glass-card bg-${item.color}-500/5 p-4 border border-${item.color}-500/20 hover:border-${item.color}-500/50 transition-colors`}
                    >
                      <div className={`text-sm text-${item.color}-400 font-medium`}>{item.label}</div>
                      <div className="text-lg font-semibold mt-1">{item.value}</div>
                      {item.desc && <div className="text-xs text-muted-foreground mt-2">{item.desc}</div>}
                    </motion.div>
                  ))}
                </div>
              </FloatingCard>
            </motion.div>

            {/* ViT Branch */}
            <motion.div
              custom={1}
              variants={branchVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FloatingCard delay={0.35} intensity={0.6}>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center"
                  >
                    <span className="text-purple-400 font-bold">🟪</span>
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold">ViT Branch</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Input", value: "224×224 RGB Images", color: "purple" },
                    { label: "Patch Division", value: "14×14 = 196 Patches", color: "purple", desc: "16×16 pixels per patch" },
                    { label: "ViT Transformer", value: "768-dim Embeddings", color: "purple", desc: "Multi-head attention layers" },
                    { label: "Linear Projection", value: "768 → 512-dim", color: "emerald" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`glass-card bg-${item.color}-500/5 p-4 border border-${item.color}-500/20 hover:border-${item.color}-500/50 transition-colors`}
                    >
                      <div className={`text-sm text-${item.color}-400 font-medium`}>{item.label}</div>
                      <div className="text-lg font-semibold mt-1">{item.value}</div>
                      {item.desc && <div className="text-xs text-muted-foreground mt-2">{item.desc}</div>}
                    </motion.div>
                  ))}
                </div>
              </FloatingCard>
            </motion.div>
          </div>

          {/* Fusion Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FloatingCard delay={0.5} intensity={0.4}>
              <h3 className="font-display text-2xl font-bold mb-8 text-center">Fusion & Classification Pipeline</h3>

              <div className="space-y-4">
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 glass-card bg-blue-500/5 p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-sm text-blue-400 font-medium">CNN Features</div>
                      <div className="font-semibold">512-dim</div>
                    </div>
                  </motion.div>

                  <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                  <ArrowDown className="w-6 h-6 text-muted-foreground md:hidden" />

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 glass-card bg-purple-500/5 p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-sm text-purple-400 font-medium">ViT Features</div>
                      <div className="font-semibold">512-dim</div>
                    </div>
                  </motion.div>
                </div>

                {/* Arrows */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex justify-center"
                >
                  <ArrowDown className="w-6 h-6 text-emerald-400" />
                </motion.div>

                <motion.div
                  whileHover={{ borderColor: "rgb(16, 185, 129)" }}
                  className="glass-card bg-emerald-500/5 p-6 border border-emerald-500/30 hover:bg-emerald-500/10 transition-all cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="text-sm text-emerald-400 font-medium mb-2">Concatenation</div>
                    <div className="font-semibold">Combined: 1024-dim</div>
                  </div>
                </motion.div>

                {/* Continue with remaining pipeline steps... */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="flex justify-center"
                >
                  <ArrowDown className="w-6 h-6 text-emerald-400" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)" }}
                  className="glass-card bg-accent/5 p-6 border-2 border-accent/30 hover:border-accent/50 transition-all cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-sm text-accent font-medium mb-2">⚡ Attention Gate</div>
                    <div className="font-semibold mb-3">Adaptive Feature Weighting</div>
                    <div className="text-xs text-muted-foreground bg-background/50 p-3 rounded font-mono">
                      α = σ(W₂ relu(W₁ · [CNN; ViT]))
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  className="flex justify-center"
                >
                  <ArrowDown className="w-6 h-6 text-emerald-400" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-6 border-2 border-emerald-500/50 hover:border-emerald-500/70 transition-all cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-sm text-emerald-400 font-medium mb-2">Softmax</div>
                    <div className="font-semibold text-lg">🔬 Diagnosis: Health / Malaria</div>
                    <div className="text-xs text-muted-foreground mt-2">+ Confidence Score</div>
                  </div>
                </motion.div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
