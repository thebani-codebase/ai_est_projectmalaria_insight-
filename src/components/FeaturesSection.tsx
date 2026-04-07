import { motion } from "framer-motion";
import { Eye, Layers, MessageSquare, Activity, ShieldCheck, Palette } from "lucide-react";

const features = [
  { icon: Eye, title: "Grad-CAM Heatmaps", desc: "Visual explanations showing exactly which cell regions triggered the AI's diagnosis, building trust with medical professionals." },
  { icon: Layers, title: "Class Imbalance Handling", desc: "SMOTE oversampling and focal loss to ensure accurate detection even for rare malaria stages." },
  { icon: Palette, title: "Stain Normalization", desc: "Macenko method normalizes color variations from different labs, ensuring consistent predictions." },
  { icon: Activity, title: "Clinical Urgency Tags", desc: "Automatic severity classification: Healthy, Outpatient, or Emergency/ICU based on parasite stage." },
  { icon: ShieldCheck, title: "Uncertainty Detection", desc: "When the model is unsure, it flags results for expert referral instead of making risky predictions." },
  { icon: MessageSquare, title: "AI Chatbot", desc: "Gemini-powered assistant answers treatment questions and recommends follow-up tests." },
];

const FeaturesSection = () => (
  <section className="py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
          Key <span className="gradient-text">Features</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Built for clinical reliability and medical expert validation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 group hover:border-primary/30 transition-all hover:glow-primary"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
