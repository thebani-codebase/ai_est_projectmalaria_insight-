import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const INITIAL: Message[] = [
  { role: "bot", text: "👋 Hi! I'm your healthcare AI assistant. Ask me about malaria diagnosis, treatment options, or follow-up tests." },
];

const BOT_RESPONSES: Record<string, string> = {
  treatment: "For uncomplicated malaria, Artemisinin-based Combination Therapy (ACT) is the WHO-recommended first-line treatment. Chloroquine can be used for P. vivax in areas without resistance. Always consult a physician for dosage.",
  test: "Recommended follow-up tests include: Complete Blood Count (CBC), Peripheral Blood Smear for parasite count, Rapid Diagnostic Test (RDT), and Liver Function Tests if severe malaria is suspected.",
  stage: "Malaria parasites go through stages: Ring → Trophozoite → Schizont → Gametocyte. The trophozoite stage is most commonly detected and is associated with clinical symptoms.",
  default: "That's a great question! For specific medical advice, please consult a healthcare professional. I can help with general information about malaria diagnosis, stages, and treatment guidelines.",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("treatment") || lower.includes("medicine") || lower.includes("dawai")) return BOT_RESPONSES.treatment;
  if (lower.includes("test") || lower.includes("follow")) return BOT_RESPONSES.test;
  if (lower.includes("stage") || lower.includes("trophozoite") || lower.includes("ring")) return BOT_RESPONSES.stage;
  return BOT_RESPONSES.default;
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [...p, { role: "bot", text: getResponse(userMsg.text) }]);
    }, 800);
  };

  return (
    <>
      {/* Bubble */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary ${open ? "hidden" : ""}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] glass-card flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-primary/5">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold text-foreground text-sm">Healthcare Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    {m.text}
                  </div>
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about treatment, tests…"
                  className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={send} className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
