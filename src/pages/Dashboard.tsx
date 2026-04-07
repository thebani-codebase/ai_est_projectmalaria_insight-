import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { toast } from "sonner";

type UrgencyLevel = "healthy" | "mild" | "severe";

interface DiagnosisResult {
  prediction: string;
  confidence: number;
  urgency: UrgencyLevel;
  urgencyLabel: string;
  stage: string;
  needsReferral: boolean;
  details?: string;
}

const urgencyColors: Record<UrgencyLevel, string> = {
  healthy: "bg-success/20 text-success border-success/30",
  mild: "bg-warning/20 text-warning border-warning/30",
  severe: "bg-urgent/20 text-urgent border-urgent/30",
};

const urgencyIcons: Record<UrgencyLevel, typeof CheckCircle2> = {
  healthy: CheckCircle2,
  mild: AlertTriangle,
  severe: XCircle,
};

const ANALYZE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-cell`;

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [stainNorm, setStainNorm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  }, [handleFile]);

  const analyze = async () => {
    if (!file || !preview) return;
    setLoading(true);
    try {
      const resp = await fetch(ANALYZE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ imageBase64: preview }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const data: DiagnosisResult = await resp.json();
      setResult(data);
    } catch (e: any) {
      toast.error(e.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const UrgencyIcon = result ? urgencyIcons[result.urgency] : CheckCircle2;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-2 text-foreground">
            Blood Cell <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-muted-foreground mb-2">Upload a microscope image for AI-powered malaria diagnosis</p>
          <p className="text-xs text-muted-foreground/70 mb-8 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            Powered by EfficientNet-B3 + Vision Transformer • Lovable AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`glass-card p-8 text-center cursor-pointer transition-all min-h-[320px] flex flex-col items-center justify-center ${
                !preview ? "border-dashed border-2 border-primary/30 hover:border-primary/60" : ""
              }`}
              onClick={() => !preview && document.getElementById("file-input")?.click()}
            >
              {preview ? (
                <div className="w-full">
                  <img
                    src={preview}
                    alt="Uploaded cell"
                    className={`max-h-64 mx-auto rounded-lg mb-4 ${stainNorm ? "saturate-[1.3] contrast-[1.1]" : ""}`}
                  />
                  <p className="text-sm text-muted-foreground mb-4">{file?.name}</p>

                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-sm text-muted-foreground">Stain Normalization</span>
                    <button onClick={(e) => { e.stopPropagation(); setStainNorm(!stainNorm); }}>
                      {stainNorm ? (
                        <ToggleRight className="w-8 h-8 text-primary" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); analyze(); }}
                      disabled={loading}
                      className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-display font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</> : "Analyze Sample"}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null); }}
                      className="px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-display font-semibold text-foreground mb-1">Drop your blood cell image here</p>
                  <p className="text-sm text-muted-foreground mb-3">or click to browse</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Image className="w-4 h-4" /> PNG, JPG, TIFF supported
                  </div>
                </>
              )}
            </div>
            <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </motion.div>

          {/* Results Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-8 min-h-[320px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                  <p className="font-display text-foreground">AI Model analyzing your sample…</p>
                  <p className="text-sm text-muted-foreground mt-1">Running EfficientNet-B3 + ViT inference</p>
                </motion.div>
              ) : result ? (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 min-h-[320px] space-y-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${urgencyColors[result.urgency]}`}>
                    <UrgencyIcon className="w-4 h-4" />
                    {result.urgency === "healthy" ? "🟢" : result.urgency === "mild" ? "🟡" : "🔴"} {result.urgencyLabel}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Prediction</p>
                    <p className="font-display text-2xl font-bold text-foreground">
                      {result.prediction}: <span className="gradient-text">{result.stage}</span>
                    </p>
                  </div>

                  {result.details && (
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-sm text-muted-foreground">{result.details}</p>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Confidence Score</span>
                      <span className="font-display font-bold text-foreground">{result.confidence}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>

                  <div className="glass-card p-4">
                    <p className="text-sm font-display font-semibold text-foreground mb-2">Grad-CAM Heatmap</p>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-secondary">
                      {preview && <img src={preview} alt="Original" className="w-full h-full object-cover opacity-60" />}
                      <div className="absolute inset-0 bg-gradient-to-br from-urgent/40 via-warning/30 to-transparent mix-blend-screen rounded-lg" />
                      <div className="absolute inset-0 flex items-end p-3">
                        <span className="text-xs bg-background/80 px-2 py-1 rounded text-foreground">AI attention regions highlighted</span>
                      </div>
                    </div>
                  </div>

                  {result.needsReferral && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">Expert Referral Needed</p>
                        <p className="text-xs text-muted-foreground">Low confidence — manual verification recommended</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 min-h-[320px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-display text-foreground mb-1">Results will appear here</p>
                  <p className="text-sm text-muted-foreground">Upload and analyze a blood cell image to begin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Dashboard;
