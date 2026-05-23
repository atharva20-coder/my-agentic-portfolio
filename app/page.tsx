// Inline SVG icon components — official brand colors
function DeepgramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" className="inline-block shrink-0">
      <rect width="32" height="32" rx="5" fill="#6B4EFF"/>
      <path d="M8 8h6.5C18.09 8 21 10.91 21 14.5S18.09 21 14.5 21H11v5H8V8zm3 3v7h3.5c1.93 0 3.5-1.57 3.5-3.5S16.43 11 14.5 11H11z" fill="white"/>
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="inline-block shrink-0">
      <path d="M14 28A14 14 0 0114 0a6.562 6.562 0 000 13.125A6.562 6.562 0 0114 28z" fill="url(#gi-a)"/>
      <path d="M14 0a14 14 0 010 28 6.562 6.562 0 010-13.125A6.562 6.562 0 0114 0z" fill="url(#gi-b)"/>
      <defs>
        <linearGradient id="gi-a" x1="14" y1="0" x2="14" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1C72EB"/><stop offset="1" stopColor="#8AB4F8"/>
        </linearGradient>
        <linearGradient id="gi-b" x1="28" y1="14" x2="0" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1C72EB"/><stop offset="1" stopColor="#8AB4F8"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function OpenAIIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="inline-block shrink-0">
      <circle cx="14" cy="14" r="14" fill="#10A37F"/>
      <path d="M20.5 10.9a4.8 4.8 0 00-.41-3.93 4.86 4.86 0 00-5.23-2.33A4.83 4.83 0 0011.24 3a4.86 4.86 0 00-4.63 3.37A4.83 4.83 0 004.38 8.7a4.86 4.86 0 00.6 5.69 4.8 4.8 0 00.41 3.93 4.86 4.86 0 005.23 2.33 4.83 4.83 0 003.63 1.62 4.86 4.86 0 004.64-3.37 4.83 4.83 0 003.22-2.34 4.86 4.86 0 00-.6-5.69zM14 20.2a3.6 3.6 0 01-2.31-.84l.11-.07 3.84-2.22a.63.63 0 00.32-.55V11.3l1.62.94a.06.06 0 01.04.04v4.49A3.63 3.63 0 0114 20.2zm-7.77-3.33a3.6 3.6 0 01-.43-2.43l.11.07 3.84 2.22a.63.63 0 00.64 0l4.69-2.71v1.87a.06.06 0 01-.02.05l-3.88 2.24a3.63 3.63 0 01-4.95-1.31zM5.22 10.3a3.6 3.6 0 011.88-1.59v4.58a.63.63 0 00.32.55l4.69 2.71-1.63.94a.06.06 0 01-.05 0L6.5 15.22a3.63 3.63 0 01-.77-4.92zm13.38 3.12l-4.69-2.71 1.63-.94a.06.06 0 01.05 0l3.93 2.27a3.63 3.63 0 01-.57 6.55v-4.58a.63.63 0 00-.35-.59zm1.61-2.45l-.11-.07-3.84-2.22a.63.63 0 00-.64 0L11.13 11.6V9.73a.06.06 0 01.02-.05l3.88-2.24a3.63 3.63 0 015.18 3.53zm-10.15 3.35L8.43 13.4a.06.06 0 01-.03-.04V8.87a3.63 3.63 0 015.95-2.78l-.11.07L10.4 8.38a.63.63 0 00-.32.55l-.02 5.39zm.88-1.9l2.09-1.21 2.09 1.21v2.41l-2.09 1.21-2.09-1.21v-2.41z" fill="white"/>
    </svg>
  );
}

function ElevenLabsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="inline-block shrink-0">
      <rect width="28" height="28" rx="5" fill="#111"/>
      <rect x="7" y="6" width="4" height="16" rx="1.5" fill="white"/>
      <rect x="14" y="6" width="4" height="16" rx="1.5" fill="white"/>
    </svg>
  );
}

function SarvamIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="inline-block shrink-0">
      <rect width="28" height="28" rx="5" fill="#FF6B35"/>
      <text x="14" y="20" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="14" fontWeight="700" fill="white">S</text>
    </svg>
  );
}

function WebRTCIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="inline-block shrink-0">
      <rect width="28" height="28" rx="5" fill="#E84D20"/>
      <circle cx="14" cy="14" r="7" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="14" cy="14" r="3" fill="white"/>
    </svg>
  );
}

function YCIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="inline-block shrink-0">
      <rect width="28" height="28" rx="5" fill="#F26625"/>
      <text x="14" y="20" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="800" fill="white">YC</text>
    </svg>
  );
}

function TechBadge({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 align-middle mx-0.5 px-1.5 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all no-underline">
      {icon}
      <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 leading-none">{label}</span>
    </a>
  );
}

export default function Page() {
  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <ul>
          <li>I make AI that talks to people — voice bots that call customers, WhatsApp agents that close deals, all without a human in the loop. That&apos;s <strong>ArisX</strong>.</li>
          <li>We work with BFSI, NBFC, and procurement teams. I&apos;ve sat across the table from CEOs at <TechBadge href="https://www.ycombinator.com" icon={<YCIcon />} label="YC-backed" /> companies and shipped live campaigns in production — not just demos.</li>
          <li>
            The tech I live in:&nbsp;
            <TechBadge href="https://deepgram.com" icon={<DeepgramIcon />} label="Deepgram" />&nbsp;
            <TechBadge href="https://deepmind.google/technologies/gemini/" icon={<GeminiIcon />} label="Gemini Live" />&nbsp;
            <TechBadge href="https://openai.com" icon={<OpenAIIcon />} label="GPT" />&nbsp;
            <TechBadge href="https://elevenlabs.io" icon={<ElevenLabsIcon />} label="ElevenLabs" />&nbsp;
            <TechBadge href="https://www.sarvam.ai" icon={<SarvamIcon />} label="Sarvam" />&nbsp;
            <TechBadge href="https://webrtc.org" icon={<WebRTCIcon />} label="WebRTC" />.&nbsp;
            Getting AI to sound human on a live call is genuinely hard and I can&apos;t stop trying.
          </li>
          <li>Current obsession: <strong>latency</strong> — the biggest unsolved hurdle in voice AI. Reliability and hallucination? Solved those. Now it&apos;s about getting response time to the point where nobody notices the machine.</li>
          <li>My weekends and nights go into experimentation. Saturdays are for shipping things that probably shouldn&apos;t work. Sundays are for figuring out why they don&apos;t. My cortisol levels are basically a product roadmap at this point.</li>
          <li>When I&apos;m not doing that, I&apos;m building other things. Some are on my <a href="/projects" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">projects page ↗</a>. A lot aren&apos;t.</li>
        </ul>
      </div>
      <div className="prose prose-neutral dark:prose-invert mt-2">
        <p>This website is my answer to the question — tell me about yourself.</p>
      </div>
    </section>
  );
}
