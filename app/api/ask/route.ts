import { GoogleGenerativeAI, FunctionCallingMode, SchemaType } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

let scriptCache: string | null = null;
function getScript() {
  if (scriptCache) return scriptCache;
  scriptCache = readFileSync(join(process.cwd(), "public", "script.md"), "utf-8");
  return scriptCache;
}

// ── Project data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    slug: "aria",
    title: "Aria — Outbound Voice AI",
    description: "AI that calls people and has real conversations. Load any script — collections, procurement, negotiation, identity verification — and Aria runs it live on the phone. Sub-600ms response time, fully agentic, handles objections.",
    tags: ["Voice AI", "Gemini Live", "Python", "WebRTC"],
    category: "voice_ai",
    url: null,
    github: "https://github.com/atharva20-coder/rpc-voice-agent",
  },
  {
    slug: "arisx",
    title: "ArisX — Conversational AI Platform",
    description: "AI platform for BFSI, NBFC, Procurement, and Negotiation. Two products: Aria (voice bots that call customers) and WhatsApp agents. Both in production.",
    tags: ["Platform", "WhatsApp", "Voice", "Next.js"],
    category: "voice_ai",
    url: null,
    github: "https://github.com/atharva20-coder/arisx-platform",
  },
  {
    slug: "llm-intent-entity-eval",
    title: "LLM Intent & Entity Eval",
    description: "Eval framework for measuring intent classification and entity extraction performance of ASR models. Used to benchmark Deepgram vs Whisper vs Gemini Live for fintech.",
    tags: ["Python", "LLM-as-judge", "Deepgram", "Whisper"],
    category: "tools",
    url: null,
    github: "https://github.com/atharva20-coder/llm_intent_entity",
  },
  {
    slug: "paraxis",
    title: "Paraxis — The Doing App",
    description: "Minimal task management app focused on execution over planning. No project trees, no tags — just what are you doing right now.",
    tags: ["TypeScript", "Next.js", "Supabase"],
    category: "web",
    url: "https://paraxis.vercel.app",
    github: "https://github.com/atharva20-coder/Paraxis_The_Doing_App",
  },
  {
    slug: "keepitup",
    title: "KeepItUp — Habit Tracker",
    description: "Minimal habit and streak tracker. localStorage-first, optional Supabase sync. No friction, no gamification.",
    tags: ["TypeScript", "Next.js", "TailwindCSS"],
    category: "web",
    url: "https://keepitup-sepia.vercel.app",
    github: "https://github.com/atharva20-coder/keepitup",
  },
  {
    slug: "youtube-downloader",
    title: "YouTube Downloader CLI",
    description: "Terminal-based YouTube downloader with search, batch download, and clip extraction by timestamp.",
    tags: ["Python", "yt-dlp", "CLI"],
    category: "tools",
    url: null,
    github: "https://github.com/atharva20-coder/youtube-downloader",
  },
];

const CONTACT_LINKS = [
  { name: "Email", url: "mailto:atharvajoshi2520@gmail.com", icon: "mail", handle: "atharvajoshi2520@gmail.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/atharva20/", icon: "linkedin", handle: "atharva20" },
  { name: "GitHub", url: "https://github.com/atharva20-coder", icon: "github", handle: "atharva20-coder" },
  { name: "Twitter / X", url: "https://x.com/ceo_joshi", icon: "twitter", handle: "@ceo_joshi" },
  { name: "Instagram", url: "https://www.instagram.com/joshileejoshiji/", icon: "instagram", handle: "joshileejoshiji" },
];

// ── Tool definitions ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tools: any[] = [
  {
    functionDeclarations: [
      {
        name: "show_projects",
        description:
          "Show Atharva's projects as interactive cards. Call this when the visitor asks about projects, portfolio, work he has built, or what he has shipped.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            filter: {
              type: SchemaType.STRING,
              enum: ["all", "voice_ai", "web", "tools"],
              description: "Filter by category. Default 'all'.",
            },
          },
        },
      },
      {
        name: "show_contact_links",
        description:
          "Show Atharva's contact links and social profiles. Call this when the visitor asks how to reach him, contact info, or wants to connect.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
      {
        name: "show_project_detail",
        description: "Show detailed information about one specific project by its slug.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            slug: {
              type: SchemaType.STRING,
              description:
                "Project slug: aria | arisx | llm-intent-entity-eval | paraxis | keepitup | youtube-downloader",
            },
          },
          required: ["slug"],
        },
      },
    ],
  },
];

function executeTool(name: string, args: Record<string, string>) {
  switch (name) {
    case "show_projects": {
      const filter = args.filter || "all";
      const filtered =
        filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
      return { projects: filtered };
    }
    case "show_contact_links":
      return { links: CONTACT_LINKS };
    case "show_project_detail": {
      const project = PROJECTS.find((p) => p.slug === args.slug);
      return project ? { project } : { error: "Project not found" };
    }
    default:
      return { error: "Unknown tool" };
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    const script = getScript();

    const systemInstruction = `${script}

---
RULES:
- You ARE Atharva Joshi. Speak as yourself, first person, always.
- Use only information from this script. Never fabricate.
- Pick up the visitor's name and pronouns from the chat history and use them naturally — address them by name in responses, not every sentence but enough to feel personal. Respect their stated pronouns.
- When asked about projects or portfolio → call show_projects tool.
- When asked about contact, links, social, email, how to reach you → call show_contact_links tool.
- When asked about a specific project in detail → call show_project_detail tool.
- After a tool call, give a short natural first-person response alongside the displayed results — don't just repeat the card data.
- Out-of-scope questions: "Yaar I'm only set up to talk about my work right now — what do you want to know about what I'm building?"
- Format with markdown (bold, bullets) where it adds clarity.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction,
      tools,
      toolConfig: { functionCallingConfig: { mode: FunctionCallingMode.AUTO } },
    });

    const chatHistory = (history || [])
      .filter((m: { role: string }) => m.role === "user" || m.role === "model")
      .map((msg: { role: "user" | "model"; content: string }) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = result.response;

    const functionCalls = response.functionCalls?.();

    if (functionCalls && functionCalls.length > 0) {
      const toolResults: { type: string; data: unknown }[] = [];
      const functionResponses = functionCalls.map((call) => {
        const toolData = executeTool(call.name, call.args as Record<string, string>);
        toolResults.push({ type: call.name, data: toolData });
        return {
          functionResponse: { name: call.name, response: toolData },
        };
      });

      // Second turn — get text response after tool execution
      const finalResult = await chat.sendMessage(functionResponses);
      const finalText = finalResult.response.text();

      return NextResponse.json({ response: finalText, toolResults }, { headers: CORS_HEADERS });
    }

    return NextResponse.json({ response: response.text(), toolResults: [] }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("Ask API error:", err);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500, headers: CORS_HEADERS });
  }
}
