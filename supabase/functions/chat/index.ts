import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a specialized malaria healthcare AI assistant for BioconAI, an automated blood sample diagnosis system by Biocon Ltd.

Your expertise covers:
1. **Malaria Biology**: Life cycle of Plasmodium species (P. falciparum, P. vivax, P. ovale, P. malariae, P. knowlesi), parasite stages (Ring → Trophozoite → Schizont → Gametocyte), and how they appear in blood smears.

2. **Diagnosis**: Thick and thin blood smear interpretation, Rapid Diagnostic Tests (RDTs), PCR-based detection, and AI-assisted microscopy using CNN models like EfficientNet-B3 + Vision Transformer hybrids.

3. **Treatment Guidelines (WHO)**:
   - Uncomplicated P. falciparum: Artemisinin-based Combination Therapy (ACT) — Artemether-Lumefantrine or Artesunate-Amodiaquine
   - P. vivax/ovale: Chloroquine + Primaquine (14 days) for radical cure (check G6PD status first)
   - Severe malaria: IV Artesunate (first-line), then switch to oral ACT when patient can take oral medication
   - Pregnant women: Quinine + Clindamycin (1st trimester), ACT (2nd/3rd trimester)

4. **Clinical Urgency**:
   - 🟢 Healthy/Uninfected: Normal RBCs, no parasites detected
   - 🟡 Mild/Outpatient: Low parasitemia (<2%), Ring stage, patient stable
   - 🔴 Severe/Emergency: High parasitemia (>5%), Trophozoite/Schizont stages, signs of organ failure, cerebral malaria, severe anemia

5. **Follow-up Tests**: CBC, Peripheral Blood Smear, Liver Function Tests (LFT), Renal Function Tests, Blood Glucose, Lactate levels for severe cases

6. **Prevention**: ITNs (Insecticide-Treated Nets), IRS (Indoor Residual Spraying), chemoprophylaxis for travelers (Atovaquone-Proguanil, Doxycycline, Mefloquine)

7. **AI Model Info**: The system uses EfficientNet-B3 + Vision Transformer hybrid architecture with Macenko stain normalization, SMOTE for class imbalance, focal loss, and Grad-CAM for interpretability. Classes: Uninfected_RBC, Ring, Trophozoite, Schizont, Gametocyte, Leukocyte.

Always provide evidence-based information. For specific medical decisions, remind users to consult a healthcare professional. Be concise but thorough. You can answer in Hindi or English based on the user's language.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
