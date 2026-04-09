import { useState } from "react";
import { motion } from "framer-motion";
import { Microscope } from "lucide-react";
import FloatingCard from "./FloatingCard";

const MalariaStagesSection = () => {
  const [activeStage, setActiveStage] = useState(0);

  const malariaCellStages = [
    {
      name: "Uninfected",
      icon: "🔵",
      color: "emerald",
      description: "Healthy Red Blood Cell (RBC)",
      details: "Normal biconcave disc shape, clear cytoplasm, no parasites present",
      characteristics: [
        "Intact cell membrane",
        "Normal hemoglobin content",
        "Circular morphology",
        "Smooth surface texture",
      ],
      visualCues: ["Uniform coloration", "Sharp edges", "Regular size", "No inclusions"],
      rarity: "Common (baseline)",
    },
    {
      name: "Ring Stage",
      icon: "💍",
      color: "blue",
      description: "Early Parasitized RBC (6-24 hours)",
      details:
        "Young parasite appears as ring with dark nucleus, occupies small portion of cell. Caused by P. falciparum, P. vivax.",
      characteristics: [
        "Small ring form visible",
        "Dark dot nucleus",
        "Parasite cytoplasm thin",
        "Cell size normal",
      ],
      visualCues: ["Ring-shaped dark spot", "Subtle cell distortion", "Pale cytoplasm", "Multiple rings possible"],
      rarity: "Very Common",
    },
    {
      name: "Trophozoite",
      icon: "🌙",
      color: "purple",
      description: "Intermediate Stage (24-48 hours)",
      details: "Parasite grows, cell becomes irregular. Various stages: early, mid, late. Occupies 25-75% of RBC.",
      characteristics: [
        "Irregular cell shape",
        "Larger parasite body",
        "Abundant cytoplasm",
        "Prominent nucleus",
      ],
      visualCues: [
        "Signet-ring form",
        "Cell membrane deformation",
        "Cytoplasm extension",
        "Maurer's clefts visible",
      ],
      rarity: "Common",
    },
    {
      name: "Schizont",
      icon: "⭐",
      color: "orange",
      description: "Late Maturation Stage (48+ hours)",
      details:
        "Parasite nucleus divides forming 8-32 merozoites. Heavily infected RBC near rupture. Largest & most visible stage.",
      characteristics: [
        "Multinucleated form",
        "Multiple daughter cells",
        "Severe cell distortion",
        "Large parasite mass",
      ],
      visualCues: [
        "Multiple chromatin dots",
        "Rosette-like pattern",
        "Pale/crenated RBC",
        "Irregular boundaries",
      ],
      rarity: "Less Common (Rare in blood films)",
    },
    {
      name: "Gametocyte",
      icon: "🔄",
      color: "red",
      description: "Sexual Stage (Mosquito Transmission)",
      details: "Specialized reproductive form. Two types: microgametocyte (male) & macrogametocyte (female). Transmissible.",
      characteristics: [
        "Elongated cell shape",
        "Crescent-shaped parasite",
        "Distinct cytoplasm",
        "Specialized organelles",
      ],
      visualCues: [
        "Prominent dark body",
        "Distorted cell outline",
        "Cytoplasm displacement",
        "Bright staining",
      ],
      rarity: "Rare in acute cases",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stage = malariaCellStages[activeStage];
  const colorMap = {
    emerald: "border-emerald-500/50 bg-emerald-500/5",
    blue: "border-blue-500/50 bg-blue-500/5",
    purple: "border-purple-500/50 bg-purple-500/5",
    orange: "border-orange-500/50 bg-orange-500/5",
    red: "border-red-500/50 bg-red-500/5",
  };

  return (
    <section className="relative py-24 border-b border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-purple-500/5 to-background/0" />

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
            Malaria Cell <span className="gradient-text">Infection Stages</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive guide through the lifecycle of malaria parasite development in red blood cells
          </p>
        </motion.div>

        {/* Interactive Stage Selector */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="glass-card p-8 border border-border/50">
            {/* Stage Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 justify-center w-full"
              >
                {malariaCellStages.map((stg, idx) => (
                  <motion.button
                    key={stg.name}
                    variants={itemVariants}
                    onClick={() => setActiveStage(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                      activeStage === idx
                        ? "bg-gradient-to-r from-primary to-accent text-white scale-105 shadow-lg"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary border border-border/50"
                    }`}
                  >
                    {stg.icon} {stg.name}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Active Stage Details */}
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`rounded-lg p-8 border-2 ${colorMap[stage.color as keyof typeof colorMap]}`}>
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{stage.icon}</span>
                      <div>
                        <h3 className="text-3xl font-bold">{stage.name}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border/30">
                      <p className="text-muted-foreground leading-relaxed">{stage.details}</p>
                    </div>

                    {/* Characteristics */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Microscope className="w-4 h-4" /> Microscopic Characteristics
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {stage.characteristics.map((char, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-green-400 mt-0.5">✓</span>
                            <span className="text-muted-foreground">{char}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Rarity Badge */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-background/70 border`}
                    >
                      {stage.rarity}
                    </motion.div>
                  </div>

                  {/* Right: Visual Cues */}
                  <div>
                    <h4 className="font-semibold mb-4">Visual Indicators in Microscopy</h4>

                    {/* Visual Cues */}
                    <div className="space-y-2">
                      {stage.visualCues.map((cue, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + idx * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border/30"
                        >
                          <span className="text-lg">👁️</span>
                          <span className="text-sm text-muted-foreground">{cue}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Info */}
            <div className="mt-8 p-4 bg-background/50 rounded-lg border border-border/30 text-sm text-muted-foreground">
              <strong>ℹ️ Parasite Lifecycle Timeline:</strong> Ring (6-24h) → Trophozoite (24-48h) → Schizont (48h+) →
              Merozoite Release → New infection | Gametocytes form for mosquito transmission
            </div>
          </div>
        </motion.div>

        {/* Key Challenge */}
        <FloatingCard delay={0.4} intensity={0.5}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">⚖️</div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">Detection Challenge</h3>
              <p className="text-muted-foreground mb-3">
                Subtle visual differences between healthy and infected cells make automated malaria detection challenging.
                Ring and Trophozoite stages can be difficult to distinguish without careful microscopic examination.
              </p>
              <div className="text-sm text-blue-400 font-semibold">
                💡 Solution: Hybrid CNN-ViT fusion with Grad-CAM interpretability assists medical experts
              </div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
};

export default MalariaStagesSection;
