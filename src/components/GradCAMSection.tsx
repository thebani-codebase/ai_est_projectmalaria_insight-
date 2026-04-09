import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, RotateCcw, Upload, X } from "lucide-react";

const GradCAMSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [animatedStep, setAnimatedStep] = useState(0);
  const [generatingHeatmap, setGeneratingHeatmap] = useState(false);
  const [heatmapData, setHeatmapData] = useState<ImageData | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Generate a simple heatmap simulation
  const generateHeatmap = () => {
    setGeneratingHeatmap(true);
    setTimeout(() => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      // Create a gradient heatmap
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
      gradient.addColorStop(0, "rgba(255, 68, 68, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 200, 0, 0.6)");
      gradient.addColorStop(1, "rgba(0, 150, 255, 0.2)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add some noise for realism
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 30 + Math.random() * 40;
        const heat = ctx.createRadialGradient(x, y, 0, x, y, radius);
        heat.addColorStop(0, "rgba(255, 100, 68, 0.4)");
        heat.addColorStop(1, "rgba(255, 100, 68, 0)");
        ctx.fillStyle = heat;
        ctx.fillRect(0, 0, width, height);
      }

      setHeatmapData(ctx.getImageData(0, 0, width, height));
      setGeneratingHeatmap(false);
    }, 800);
  };

  useEffect(() => {
    generateHeatmap();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    {
      icon: "↗️",
      title: "Forward Pass",
      desc: "Input cell image through hybrid model",
      formula: "y_hat = f_model(x) ; f = CNN ⊕ ViT",
    },
    {
      icon: "∇",
      title: "Compute Gradients",
      desc: "Backprop gradients from target class",
      formula: "∂y^c/∂A^k_ij = gradients w.r.t activation maps",
    },
    {
      icon: "Σ",
      title: "Global Pool",
      desc: "Average pooling over spatial dimensions",
      formula: "α^c_k = (1/Z) Σ_ij ∂y^c/∂A^k_ij",
    },
    {
      icon: "🗺️",
      title: "Generate Heatmap",
      desc: "Create class activation map using weights",
      formula: "L^c = ReLU(Σ_k α^c_k · A^k)",
    },
    {
      icon: "📈",
      title: "Upsample",
      desc: "Resize heatmap to original dimensions",
      formula: "H_up = interpolate(L^c, target_size)",
    },
    {
      icon: "🎨",
      title: "Overlay",
      desc: "Blend heatmap with original image",
      formula: "Result = α·Original + (1-α)·Heatmap",
    },
  ];

  return (
    <section className="relative py-24 border-b border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-orange-500/5 to-background/0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Grad-CAM <span className="gradient-text">Visualization</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            6-step process for generating visual explanations of model predictions
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onViewportEnter={() => setAnimatedStep(idx)}
              className={`glass-card p-6 border-2 transition-all ${
                animatedStep === idx ? "border-orange-500/60 bg-orange-500/5" : "border-border/30"
              }`}
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="font-display font-bold mb-2 text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>

              <div className="p-3 bg-background/50 rounded border border-border/30">
                <div className="text-xs font-mono text-primary">{step.formula}</div>
              </div>

              {idx < steps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden lg:block">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-orange-400"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Live Simulation Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 border-2 border-orange-500/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display text-2xl font-bold">Live Grad-CAM Simulation</h3>
                <p className="text-muted-foreground text-sm mt-1">Interactive visualization with regenerate capability</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateHeatmap}
                disabled={generatingHeatmap}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg border border-orange-500/50 transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                {generatingHeatmap ? "Generating..." : "Regenerate"}
              </motion.button>
            </div>

            {/* Canvas Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Original Image */}
              <div className="flex flex-col items-center">
                {uploadedImage ? (
                  <div className="w-full flex flex-col items-center gap-2 mb-3">
                    <div className="w-full aspect-square bg-background rounded-lg border border-blue-500/30 flex items-center justify-center overflow-hidden">
                      <img src={uploadedImage} alt="Uploaded cell" className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full aspect-square bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg border-2 border-dashed border-blue-500/40 hover:border-blue-500/60 flex items-center justify-center mb-3 overflow-hidden cursor-pointer transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-blue-400/60 mx-auto mb-2" />
                        <div className="text-xs text-muted-foreground">Upload cell image</div>
                      </div>
                    </div>
                    <canvas
                      width={256}
                      height={256}
                      className="hidden"
                      ref={(el) => {
                        if (!el) return;
                        const ctx = el.getContext("2d");
                        if (!ctx) return;

                        // Draw a simple cell image
                        ctx.fillStyle = "#1e293b";
                        ctx.fillRect(0, 0, 256, 256);

                        // Cell nucleus
                        ctx.fillStyle = "#6b7280";
                        ctx.beginPath();
                        ctx.arc(128, 128, 50, 0, Math.PI * 2);
                        ctx.fill();

                        // Cytoplasm
                        ctx.fillStyle = "#4b5563";
                        ctx.beginPath();
                        ctx.arc(128, 128, 90, 0, Math.PI * 2);
                        ctx.fill();
                      }}
                    />
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="font-semibold text-sm">Original Cell</div>
                  <div className="text-xs text-muted-foreground">128×128 input</div>
                </div>
              </div>

              {/* Heatmap */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-square bg-gradient-to-br from-orange-500/20 to-red-600/10 rounded-lg border border-orange-500/30 flex items-center justify-center mb-3 overflow-hidden">
                  <canvas
                    width={256}
                    height={256}
                    ref={canvasRef}
                    className="w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">Attention Heatmap</div>
                  <div className="text-xs text-muted-foreground">Grad-CAM activation</div>
                </div>
              </div>

              {/* Overlay */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-square bg-gradient-to-br from-emerald-500/20 to-green-600/10 rounded-lg border border-emerald-500/30 flex items-center justify-center mb-3 overflow-hidden">
                  <canvas
                    width={256}
                    height={256}
                    ref={(el) => {
                      if (!el || !heatmapData) return;
                      const ctx = el.getContext("2d");
                      if (!ctx) return;

                      // Draw cell
                      ctx.fillStyle = "#1e293b";
                      ctx.fillRect(0, 0, 256, 256);
                      ctx.fillStyle = "#4b5563";
                      ctx.beginPath();
                      ctx.arc(128, 128, 90, 0, Math.PI * 2);
                      ctx.fill();

                      // Overlay heatmap
                      ctx.globalAlpha = 0.6;
                      ctx.putImageData(heatmapData, 0, 0);
                      ctx.globalAlpha = 1;
                    }}
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">Overlay Result</div>
                  <div className="text-xs text-muted-foreground">Heatmap + Original</div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card bg-blue-500/5 p-4 border border-blue-500/30">
                <div className="text-sm text-blue-400 font-medium mb-2">🟠 Red Regions</div>
                <div className="text-xs text-muted-foreground">
                  High importance areas — Strong indicators of parasitized/gametocyte cells
                </div>
              </div>

              <div className="glass-card bg-yellow-500/5 p-4 border border-yellow-500/30">
                <div className="text-sm text-yellow-400 font-medium mb-2">🟡 Yellow Regions</div>
                <div className="text-xs text-muted-foreground">
                  Medium importance — Contributing features for classification
                </div>
              </div>

              <div className="glass-card bg-blue-500/5 p-4 border border-blue-500/30">
                <div className="text-sm text-blue-400 font-medium mb-2">🔵 Blue Regions</div>
                <div className="text-xs text-muted-foreground">
                  Low importance — Background or noise; less relevant to prediction
                </div>
              </div>

              <div className="glass-card bg-emerald-500/5 p-4 border border-emerald-500/30">
                <div className="text-sm text-emerald-400 font-medium mb-2">🎯 Why This Matters</div>
                <div className="text-xs text-muted-foreground">
                  Enables medical experts to validate AI predictions and build trust in diagnosis
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mathematical Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-8 border border-border/50"
        >
          <h3 className="font-display text-xl font-bold mb-6">Mathematical Foundation</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card bg-background/50 p-4 border border-border/30 rounded">
              <div className="text-sm text-primary font-medium mb-2">1️⃣ Gradient Computation</div>
              <div className="text-xs font-mono bg-background p-2 rounded text-primary">
                ∂y^c/∂A^k_ij
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Partial derivatives of class score w.r.t. activation map channels
              </div>
            </div>

            <div className="glass-card bg-background/50 p-4 border border-border/30 rounded">
              <div className="text-sm text-accent font-medium mb-2">2️⃣ Weighted Sum</div>
              <div className="text-xs font-mono bg-background p-2 rounded text-accent">
                α^c_k = (1/Z)Σ ∂y^c/∂A^k_ij
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Channel-wise importance weights via spatial average of gradients
              </div>
            </div>

            <div className="glass-card bg-background/50 p-4 border border-border/30 rounded">
              <div className="text-sm text-emerald-400 font-medium mb-2">3️⃣ Class Activation Map</div>
              <div className="text-xs font-mono bg-background p-2 rounded text-emerald-400">
                L^c = ReLU(Σ α^c_k · A^k)
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Rectified linear combination of weighted activation maps
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-orange-500/5 rounded border border-orange-500/30">
            <div className="text-xs text-muted-foreground">
              <strong>Key Formula:</strong> CAM(x,y) = ∑_k w_k^c · f_k(x,y) where w_k^c = GAP(∂y^c/∂A^k)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GradCAMSection;
