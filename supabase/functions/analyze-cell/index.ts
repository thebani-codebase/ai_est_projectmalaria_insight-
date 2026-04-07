import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert malaria blood cell image classifier AI. Analyze the microscope image of blood cells provided.

You must respond ONLY with a valid JSON object (no markdown, no explanation outside JSON) with these exact fields:
{
  "prediction": "Infected" or "Healthy",
  "stage": one of "Uninfected RBC", "Ring Stage", "Trophozoite Stage", "Schizont Stage", "Gametocyte Stage", "Leukocyte",
  "confidence": a number between 50 and 99.9 representing your confidence percentage,
  "urgency": "healthy" or "mild" or "severe",
  "urgencyLabel": "Normal" or "Outpatient" or "Emergency / ICU",
  "needsReferral": true if confidence < 70 or image quality is poor,
  "details": a brief 1-2 sentence explanation of what you observed in the cell
}

Classification guidelines:
- Uninfected RBC: Normal biconcave disc shape, uniform color, no inclusions
- Ring Stage: Small ring-shaped parasite inside RBC, thin cytoplasm ring with chromatin dot
- Trophozoite Stage: Larger, irregular parasite filling more of the RBC, may show pigment
- Schizont Stage: Multiple merozoites visible inside the RBC, about to burst
- Gametocyte Stage: Banana/crescent shaped (P. falciparum) or round (other species)
- Leukocyte: White blood cell, much larger, visible nucleus

Urgency mapping:
- healthy: Uninfected RBC or Leukocyte
- mild: Ring Stage with confidence > 70%
- severe: Trophozoite, Schizont, Gametocyte stages, or any stage with very high parasitemia indicators

If the image doesn't appear to be a blood cell microscope image, still return valid JSON with prediction "Healthy", confidence around 50, and needsReferral true with details explaining the image doesn't appear to be a valid blood smear.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    // Determine mime type from base64 header or default to jpeg
    let mimeType = "image/jpeg";
    if (imageBase64.startsWith("data:")) {
      const match = imageBase64.match(/^data:(image\/\w+);base64,/);
      if (match) mimeType = match[1];
    }
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this blood cell microscope image and classify it. Return only valid JSON." },
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Data}` } },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI service error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response (handle potential markdown wrapping)
    let result;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      result = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      result = {
        prediction: "Healthy",
        stage: "Uninfected RBC",
        confidence: 50,
        urgency: "mild",
        urgencyLabel: "Outpatient",
        needsReferral: true,
        details: "Could not parse AI response. Manual review recommended.",
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
