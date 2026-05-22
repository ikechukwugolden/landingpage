const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/* =========================================================
   🧠 CORE GEMINI ENGINE (REUSABLE + CLEAN)
========================================================= */
async function callGemini(prompt, options = {}) {
  if (!GOOGLE_API_KEY) {
    throw new Error("Missing Gemini API key. Set VITE_GEMINI_API_KEY in .env");
  }

  const {
    temperature = 0.6,
    maxOutputTokens = 300,
    topP = 0.9,
  } = options;

  const response = await fetch(`${GEMINI_API_URL}?key=${GOOGLE_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens,
        topP,
        candidateCount: 1,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${err}`);
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      ?.join("") ||
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Empty Gemini response");

  return text;
}

/* =========================================================
   🧠 AGENT SYSTEM (READY FOR SCALE)
========================================================= */
function routeAgent(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes("budget") || msg.includes("cost") || msg.includes("price"))
    return "finance";

  if (msg.includes("vendor") || msg.includes("caterer") || msg.includes("dj"))
    return "vendor";

  if (msg.includes("plan") || msg.includes("event") || msg.includes("schedule"))
    return "planner";

  if (msg.includes("logistics") || msg.includes("setup") || msg.includes("venue"))
    return "logistics";

  return "general";
}

const AGENTS = {
  planner:
    "You are OMA Planner AI. Create structured, actionable event plans with timelines.",
  vendor:
    "You are OMA Vendor AI. Recommend and evaluate vendors based on quality and budget.",
  finance:
    "You are OMA Finance AI. Break down budgets, optimize spending, and detect overspending risks.",
  logistics:
    "You are OMA Logistics AI. Focus on execution, operations, and coordination plans.",
  general:
    "You are OMA AI. Provide helpful, concise event intelligence support.",
};

/* =========================================================
   💬 MAIN CHAT FUNCTION (MULTI-AGENT READY)
========================================================= */
export async function getAIResponse(userMessage, pageContext = "") {
  try {
    const agent = routeAgent(userMessage);
    const system = AGENTS[agent];

    const prompt = `
${system}

SYSTEM RULES:
- Be concise and structured
- Focus only on event-related intelligence
- If page context exists, prioritize it

PAGE CONTEXT:
${pageContext || "None"}

USER REQUEST:
${userMessage}

FORMAT:
- Direct answer first
- Then actionable steps
- Max 10-15 lines
`;

    return await callGemini(prompt, {
      temperature: 0.6,
      maxOutputTokens: 350,
    });
  } catch (error) {
    console.error("OMA AI Error:", error);

    return "OMA AI is temporarily unavailable. Please check your API key or connection.";
  }
}

/* =========================================================
   📊 PAGE INTELLIGENCE ANALYZER
========================================================= */
export async function analyzePageContent(pageTitle, pageDescription) {
  try {
    const prompt = `
You are OMA AI — an event operations analyst.

Analyze this page and give 3 high-impact improvements.

TITLE: ${pageTitle}
DESCRIPTION: ${pageDescription}

RULES:
- Focus on revenue, efficiency, vendors, and automation
- Be extremely concise
- Output only insights

FORMAT:
1.
2.
3.
`;

    return await callGemini(prompt, {
      temperature: 0.7,
      maxOutputTokens: 250,
    });
  } catch (error) {
    console.error("OMA Analysis Error:", error);
    return null;
  }
}