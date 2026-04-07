import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3, Stethoscope } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Sample", desc: "Drag & drop your blood cell microscope image" },
  { icon: Cpu, title: "AI Processing", desc: "CNN model with stain normalization analyzes the cell" },
  { icon: BarChart3, title: "Grad-CAM Analysis", desc: "Visual explanation highlights regions of interest" },
  { icon: Stethoscope, title: "Clinical Report", desc: "Confidence score, urgency tag, and treatment guidance" },
];

const HowItWorks = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From sample upload to clinical-grade diagnosis in seconds
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center relative"
          >
            <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative z-10">
              <s.icon className="w-10 h-10 text-primary" />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground font-display font-bold text-xs flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
