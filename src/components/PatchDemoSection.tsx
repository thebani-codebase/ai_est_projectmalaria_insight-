import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Upload, X } from "lucide-react";

const PatchDemoSection = () => {
  const [hoveredPatch, setHoveredPatch] = useState<{ row: number; col: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const GRID_SIZE = 14; // 14×14 patch grid
  const patches = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
    id: i,
    row: Math.floor(i / GRID_SIZE),
    col: i % GRID_SIZE,
  }));

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate which patch is being hovered
    const patchWidth = rect.width / GRID_SIZE;
    const patchHeight = rect.height / GRID_SIZE;

    const col = Math.floor(x / patchWidth);
    const row = Math.floor(y / patchHeight);

    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      setHoveredPatch({ row, col });
    }
  };

  const handleCanvasLeave = () => {
    setHoveredPatch(null);
  };

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

  return (
    <section className="relative py-24 border-b border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-accent/5 to-background/0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Interactive <span className="gradient-text">Patch Visualization</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hover over patches to see embedded coordinates and visualization details
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Canvas with Patches */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 border-2 border-accent/30">
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                14×14 Patch Grid
              </h3>

              {uploadedImage ? (
                <div className="space-y-4 mb-4">
                  <div className="aspect-square bg-background rounded-lg p-2 border border-accent/30 overflow-hidden">
                    <img src={uploadedImage} alt="Uploaded cell" className="w-full h-full object-cover rounded" />
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> Clear Image
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-4 border-2 border-dashed border-accent/40 cursor-pointer hover:border-accent/60 transition-colors flex flex-col items-center justify-center mb-4"
                >
                  <Upload className="w-8 h-8 text-accent/60 mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Drop image here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG, or TIFF</p>
                </div>
              )}

              <div className="aspect-square bg-gradient-to-br from-background to-accent/5 rounded-lg p-1 border border-accent/30">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  onMouseMove={handleCanvasHover}
                  onMouseLeave={handleCanvasLeave}
                  className="w-full h-full rounded-md cursor-crosshair bg-background"
                  style={{
                    background: uploadedImage 
                      ? `url('${uploadedImage}') center/cover`
                      : "linear-gradient(135deg, rgba(88, 86, 214, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                  }}
                />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Grid Overlay Info */}
              <div className="mt-4 p-3 bg-accent/10 rounded border border-accent/20 text-xs text-muted-foreground">
                <div className="font-semibold text-foreground mb-1">224×224 Input Image</div>
                <div>• Divided into 196 patches (14×14)</div>
                <div>• Each patch: 16×16 pixels</div>
                <div>• Total coverage: 224×224 = 50,176 pixels</div>
              </div>
            </div>
          </motion.div>

          {/* Patch Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Hovered Patch Info */}
            <div className="glass-card p-8 border-2 border-primary/30 h-fit">
              <h3 className="font-display text-xl font-bold mb-4">Patch Information</h3>

              {hoveredPatch ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="glass-card bg-primary/5 p-4 rounded border border-primary/30">
                    <div className="text-sm text-muted-foreground font-medium mb-2">📍 Position</div>
                    <div className="font-mono text-lg font-semibold">
                      Row {hoveredPatch.row} × Col {hoveredPatch.col}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Patch Index: {hoveredPatch.row * GRID_SIZE + hoveredPatch.col}
                    </div>
                  </div>

                  <div className="glass-card bg-accent/5 p-4 rounded border border-accent/30">
                    <div className="text-sm text-muted-foreground font-medium mb-2">📐 Coordinates</div>
                    <div className="text-sm font-mono">
                      <div>Start: ({hoveredPatch.col * 16}, {hoveredPatch.row * 16})</div>
                      <div>End: ({(hoveredPatch.col + 1) * 16}, {(hoveredPatch.row + 1) * 16})</div>
                    </div>
                  </div>

                  <div className="glass-card bg-purple-500/5 p-4 rounded border border-purple-500/30">
                    <div className="text-sm text-muted-foreground font-medium mb-3">🔗 Patch Embedding</div>
                    <div className="text-xs bg-background/50 p-3 rounded font-mono text-primary">
                      x_p = E_patch · patch_{"{x,y}"} + E_pos_{"{x,y}"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Where E_patch ∈ ℝ^(768×256), E_pos ∈ ℝ^(768×196)
                    </div>
                  </div>

                  <div className="glass-card bg-emerald-500/5 p-4 rounded border border-emerald-500/30">
                    <div className="text-sm text-muted-foreground font-medium mb-2">✨ Output</div>
                    <div className="font-semibold">768-dim Embedding Vector</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Processed through multi-head attention (12 heads, 64 dims each)
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-4xl mb-3">👆</div>
                  <p>Hover over the patch grid to see details</p>
                </div>
              )}
            </div>

            {/* Patch Processing Info */}
            <div className="glass-card p-6 border border-border/50 text-sm">
              <div className="font-semibold mb-3 text-foreground">⚙️ Processing Pipeline</div>
              <div className="space-y-2 text-muted-foreground text-xs">
                <div>1. <span className="text-primary">Extract</span> 16×16 patch from image</div>
                <div>2. <span className="text-primary">Linear projection</span> to 768-dim</div>
                <div>3. <span className="text-primary">Add positional</span> embeddings</div>
                <div>4. <span className="text-primary">Process through</span> ViT layers</div>
                <div>5. <span className="text-primary">Concatenate</span> with CNN features</div>
                <div>6. <span className="text-primary">Attention gate</span> fusion</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Patches", value: "196" },
            { label: "Patch Dimension", value: "16×16px" },
            { label: "Embedding Size", value: "768-dim" },
            { label: "Attention Heads", value: "12" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center border border-border/50 hover:border-primary/30 transition-colors">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PatchDemoSection;
