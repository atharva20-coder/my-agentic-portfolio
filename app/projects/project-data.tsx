export interface Link {
  text: string;
  url: string;
}

export interface ProjectDetails {
  overview: string;
  problem: string;
  tech: string[];
  scalability: string;
  impact: string;
  howToRun?: string;
  testCredentials?: string;
}

export interface Project {
  title: string;
  slug: string;
  date: string;
  description: string;
  links: Link[];
  details: ProjectDetails;
}

export const projects: Project[] = [
  {
    title: "Aria — Outbound Voice AI",
    slug: "aria",
    date: "01-03-2026",
    description:
      "AI that calls people and has real conversations. Load any script — collections, procurement, negotiation, identity verification, surveys — and Aria runs it live on the phone. Sub-600ms response time, fully agentic, handles objections.",
    links: [
      {
        text: "GitHub (private)",
        url: "https://github.com/atharva20-coder/rpc-voice-agent"
      }
    ],
    details: {
      problem: "Outbound calling at scale — collections, procurement follow-ups, negotiation, verification — requires armies of human agents. Expensive, inconsistent, limited to business hours. Companies need a voice AI they can give any script to and trust it runs correctly, every call, 24/7.",
      overview: "Aria is a programmable outbound voice AI. You define the goal and the script — collections, negotiation, procurement, verification, surveys — and Aria runs it in real conversations on live phone calls. It handles objections, navigates multi-stage flows, calls tools mid-conversation, and knows when to escalate to a human.\n\nNot a phone tree. Not a bot. A voice agent that sounds and responds like a trained rep.\n\nPowered by Gemini 3.1 Flash Live over WebRTC for real-time bidirectional speech. Each script is a multi-stage prompt graph loaded at session start — no mid-call injection latency spikes. Sub-600ms TTFT from last customer word to first Aria word.",
      tech: ["Python", "Gemini 3.1 Flash Live", "Deepgram STT", "ElevenLabs TTS", "Sarvam Voice", "WebRTC", "google-genai SDK", "asyncio", "FastAPI", "Redis", "PCM audio (16kHz in / 24kHz out)"],
      scalability: "Stateless agent instances — each call is independent. Session state in Redis. Horizontal scaling by adding pods. Context window compression via Gemini SlidingWindow for calls over 10 minutes. TTFT measured from last user speech fragment to first audio byte — target <600ms.",
      impact: "Cuts outbound calling cost by 10–50x vs human agents. Enables 24/7 campaigns without staffing. Running live in production with BFSI and NBFC clients. Accuracy on par with trained human reps in A/B testing.",
      howToRun: `# Install dependencies
pip install google-genai fastapi uvicorn redis asyncio

# Set environment variables
export GEMINI_API_KEY=your_key
export DEEPGRAM_API_KEY=your_key
export REDIS_URL=redis://localhost:6379

# Run the agent
python main.py`,
      testCredentials: "Repo is private. Contact atharvajoshi2520@gmail.com for a live demo."
    }
  },
  {
    title: "ArisX — Conversational AI Platform",
    slug: "arisx",
    date: "01-01-2026",
    description:
      "AI platform for BFSI, NBFC, Procurement, and Negotiation. Two products: Aria (voice bots that call customers) and WhatsApp agents that run the same workflows over chat. Both fully automated, both in production.",
    links: [
      {
        text: "GitHub (private)",
        url: "https://github.com/atharva20-coder/arisx-platform"
      }
    ],
    details: {
      problem: "Collections, procurement follow-ups, and negotiations in BFSI and NBFC rely on human agents at every step. They're expensive, inconsistent, and can't scale past business hours. ArisX replaces that layer entirely — not just one touchpoint, the whole workflow.",
      overview: "ArisX is a conversational AI platform with two products:\n\n1. Voice (Aria) — AI agents that call customers, handle any script, manage objections, and close. Ultra-low-latency speech-to-speech using Deepgram + Gemini 2.5 Flash / GPT for reasoning. Sub-600ms response time.\n\n2. WhatsApp — AI agents running the same workflows over WhatsApp Business. Full journey automation: outreach → identity verification → offer → OTP acceptance → payment confirmation.\n\nWhile building ArisX, met with CEOs and top leadership from YC-backed companies and shipped live voice and WhatsApp campaigns in production — real customers, real outcomes.",
      tech: ["Deepgram STT", "ElevenLabs TTS", "Sarvam Voice", "Gemini 3.1 Flash Live", "Gemini 2.5 Flash", "GPT-4o", "Next.js 15", "TypeScript", "Python", "React 19", "BullMQ", "Redis", "Supabase", "PostgreSQL", "WebSocket", "WebRTC", "WhatsApp Business API", "Better Auth", "TailwindCSS v4", "Vercel"],
      scalability: "Multi-instance deployment behind a load balancer. 3-level session cache: L1 in-memory (hot sessions), L2 Redis (shared, 7-day TTL), L3 Supabase Postgres (durable). Distributed locks via Redis prevent duplicate processing. BullMQ queues inbound messages at 20 workers by default. Webhook returns 200 in <100ms — all processing async. Voice instances stateless — scale horizontally by adding pods.",
      impact: "Live in production with BFSI and NBFC clients. Thousands of simultaneous conversations. Reduces cost-per-resolution from ₹200–500 (human) to under ₹10 (AI). Campaigns executed with YC-backed company leadership — not internal tests, actual production runs with real customers.",
      howToRun: `# Clone and install
git clone https://github.com/atharva20-coder/arisx-platform
npm install

# Set up environment variables
cp .env.example .env.local
# Required: GEMINI_API_KEY, DEEPGRAM_API_KEY, OPENAI_API_KEY,
# META_ACCESS_TOKEN, PHONE_NUMBER_ID,
# SUPABASE_URL, SUPABASE_KEY, DATABASE_URL,
# BETTER_AUTH_SECRET, REDIS_URL, ENCRYPTION_KEY

# Start (Next.js + WebSocket + BullMQ worker on port 3000)
npm run dev`,
      testCredentials: "Repo is private. Contact atharvajoshi2520@gmail.com for a demo or live walkthrough."
    }
  },
  {
    title: "LLM Intent & Entity Eval",
    slug: "llm-intent-entity-eval",
    date: "01-03-2026",
    description:
      "LLM-eval framework for measuring intent classification and entity extraction performance of ASR (speech-to-text) models. Useful for benchmarking STT pipelines in production voice agents.",
    links: [
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/llm_intent_entity"
      }
    ],
    details: {
      problem: "When building voice agents, STT model quality is critical — but there's no standard way to measure whether the transcribed text preserves intent and entities accurately enough for downstream LLM processing. Existing ASR benchmarks measure word error rate, not semantic accuracy.",
      overview: "Eval framework that runs structured test suites against ASR model outputs and scores them on intent classification accuracy and entity extraction precision/recall. Accepts audio files or transcripts, runs them through configurable LLM judges, and produces a scored report. Useful for comparing Whisper, Deepgram, Google STT, and Gemini Live transcription quality on domain-specific data.",
      tech: ["Python", "LLM-as-judge", "Whisper", "Deepgram API", "pandas", "JSON test fixtures"],
      scalability: "Batch eval mode processes test sets in parallel. Results logged to CSV/JSON. Pluggable model adapters — swap ASR provider without changing eval logic.",
      impact: "Used internally to benchmark ASR models for Aria. Helped select Gemini Live transcription over Whisper for fintech domain accuracy.",
      howToRun: `git clone https://github.com/atharva20-coder/llm_intent_entity
pip install -r requirements.txt

python eval.py --model whisper --test-set data/fintech_test.json`
    }
  },
  {
    title: "Paraxis — The Doing App",
    slug: "paraxis",
    date: "01-02-2026",
    description:
      "Task management app built with TypeScript. Focused on execution over planning — designed to get things done, not just tracked.",
    links: [
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/Paraxis_The_Doing_App"
      }
    ],
    details: {
      problem: "Most task apps are built for planning. You spend more time organising tasks than doing them. Paraxis strips away the overhead — no projects, no tags, no endless hierarchies. Just: what are you doing right now?",
      overview: "Minimal task management app that surfaces one thing at a time and tracks execution streaks. Built to reduce friction between deciding what to do and actually doing it.",
      tech: ["TypeScript", "Next.js", "TailwindCSS", "Supabase"],
      scalability: "Serverless on Vercel. Supabase handles auth and persistence. Stateless API routes.",
      impact: "Personal productivity tool. Built for daily use — designed to replace the mental overhead of context-switching between task managers.",
      howToRun: `git clone https://github.com/atharva20-coder/Paraxis_The_Doing_App
npm install
npm run dev`
    }
  },
  {
    title: "Swoopin",
    slug: "swoopin",
    date: "01-01-2026",
    description:
      "TypeScript app. Currently in active development.",
    links: [
      {
        text: "Live",
        url: "https://swoopin.vercel.app"
      },
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/swoopin"
      }
    ],
    details: {
      problem: "Currently in active development. Details coming soon.",
      overview: "TypeScript application actively being built. Visit the live link to see the current state.",
      tech: ["TypeScript", "Next.js", "TailwindCSS", "Vercel"],
      scalability: "Deployed on Vercel with serverless functions.",
      impact: "In development.",
      howToRun: `git clone https://github.com/atharva20-coder/swoopin
npm install
npm run dev`
    }
  },
  {
    title: "Nakshatra",
    slug: "nakshatra",
    date: "01-11-2025",
    description:
      "TypeScript project. Built as part of ongoing experiments with AI and automation.",
    links: [
      {
        text: "Live",
        url: "https://enakshatra.vercel.app"
      },
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/nakshatra"
      }
    ],
    details: {
      problem: "Experiment in AI-driven automation workflows. Built to explore how LLMs can be wired into everyday processes.",
      overview: "TypeScript project exploring AI automation. Visit the live link to see the current build.",
      tech: ["TypeScript", "Next.js", "TailwindCSS", "Vercel"],
      scalability: "Deployed on Vercel.",
      impact: "Exploration project feeding into ArisX's automation architecture.",
      howToRun: `git clone https://github.com/atharva20-coder/nakshatra
npm install
npm run dev`
    }
  },
  {
    title: "YouTube Downloader CLI",
    slug: "youtube-downloader",
    date: "01-03-2026",
    description:
      "Terminal-based YouTube downloader with search, batch download, and clip extraction. Built in Python — search by keyword, download full videos or trim clips by timestamp.",
    links: [
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/youtube-downloader"
      }
    ],
    details: {
      problem: "Existing YouTube downloaders have poor UX for power users: no interactive search, no batch queuing, no clip extraction from the command line.",
      overview: "Terminal-first YouTube downloader with an interactive TUI. Search by keyword, select from results, queue multiple downloads, extract clips by start/end timestamp. Built on yt-dlp with a cleaner interface layer.",
      tech: ["Python", "yt-dlp", "rich (TUI)", "asyncio"],
      scalability: "Runs locally. Async queue handles multiple simultaneous downloads.",
      impact: "Personal tool used daily. Open-source.",
      howToRun: `git clone https://github.com/atharva20-coder/youtube-downloader
pip install -r requirements.txt

python downloader.py
# or: python downloader.py --url "https://youtube.com/watch?v=..." --clip 1:30 3:45`
    }
  },
  {
    title: "KeepItUp",
    slug: "keepitup",
    date: "01-08-2025",
    description:
      "TypeScript app for staying consistent. Habit and streak tracking built to be simple and fast.",
    links: [
      {
        text: "Live",
        url: "https://keepitup-sepia.vercel.app"
      },
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/keepitup"
      }
    ],
    details: {
      problem: "Habit trackers are either too complex or too gamified. Wanted something minimal: did you do the thing today, yes or no.",
      overview: "Minimal habit and streak tracker. Add habits, check them off daily, see your streaks. localStorage-first with optional cloud sync. Fast, mobile-friendly, no friction.",
      tech: ["TypeScript", "Next.js", "TailwindCSS", "Supabase", "Vercel"],
      scalability: "Serverless on Vercel. Supabase for cloud sync. Works offline via localStorage.",
      impact: "Personal daily driver. Open-source.",
      howToRun: `git clone https://github.com/atharva20-coder/keepitup
npm install
npm run dev`,
      testCredentials: "No login required. Live at https://keepitup-sepia.vercel.app"
    }
  },
  {
    title: "AI Companion",
    slug: "ai-companion",
    date: "01-12-2023",
    description:
      "AI companion app built with TypeScript. Early experiment in conversational AI and persona-based chat before the LLM tooling matured.",
    links: [
      {
        text: "Live",
        url: "https://ai-companion-five-eta.vercel.app"
      },
      {
        text: "GitHub",
        url: "https://github.com/atharva20-coder/AI-Companion"
      }
    ],
    details: {
      problem: "Built in late 2023 when persona-based AI chat was still novel — wanted to see how far you could push character consistency before GPT-4 had robust system prompt adherence.",
      overview: "Persona-based AI companion with persistent memory. Users define a character, the AI maintains it across conversations. Heavy prompt engineering for character consistency — lessons that carried directly into how Aria's voice personas are built today.",
      tech: ["TypeScript", "Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Clerk Auth", "TailwindCSS"],
      scalability: "Deployed on Vercel. PostgreSQL via Supabase. Stateless API routes with DB-backed context.",
      impact: "Early exploration that directly shaped how I design system prompts and persona boundaries in Aria. 2023 prompt engineering problems = 2026 voice agent design.",
      howToRun: `git clone https://github.com/atharva20-coder/AI-Companion
npm install

# .env
OPENAI_API_KEY=your_key
DATABASE_URL=your_postgres_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

npm run dev`,
      testCredentials: "Visit https://ai-companion-five-eta.vercel.app — create a free account to test."
    }
  }
];
