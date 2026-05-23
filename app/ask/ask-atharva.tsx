"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, ChevronRight, Sparkles } from "lucide-react";
import { PromptInputBox } from "app/components/ui/ai-prompt-box";
import ReactMarkdown from "react-markdown";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "model";
  content: string;
  toolResults?: ToolResult[];
}
interface ToolResult { type: string; data: unknown; }
interface Project { slug: string; title: string; description: string; tags: string[]; url: string | null; github: string | null; }
interface ContactLink { name: string; url: string; icon: string; handle: string; }

// ── Rich cards ────────────────────────────────────────────────────────────────
function GithubSVG({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">{project.title}</p>
        <div className="flex gap-2 flex-shrink-0">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-500 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-500 transition-colors">
              <GithubSVG />
            </a>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-100 dark:border-indigo-900">{tag}</span>
        ))}
      </div>
    </div>
  );
}

const LINK_ICONS: Record<string, React.ReactNode> = {
  mail: <Mail className="w-4 h-4" />,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  github: <GithubSVG size={16} />,
  twitter: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
};

function ContactLinkCard({ link }: { link: ContactLink }) {
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
      <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-indigo-500 transition-colors">
        {LINK_ICONS[link.icon] ?? <ExternalLink className="w-4 h-4" />}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{link.name}</p>
        <p className="text-xs text-gray-400 dark:text-neutral-500 truncate">{link.handle}</p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 group-hover:text-indigo-400 transition-colors" />
    </a>
  );
}

function ToolResultRenderer({ result }: { result: ToolResult }) {
  if (result.type === "show_projects") {
    const { projects } = result.data as { projects: Project[] };
    return <div className="mt-3 space-y-2">{projects.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>;
  }
  if (result.type === "show_contact_links") {
    const { links } = result.data as { links: ContactLink[] };
    return <div className="mt-3 space-y-2">{links.map((l) => <ContactLinkCard key={l.name} link={l} />)}</div>;
  }
  if (result.type === "show_project_detail") {
    const data = result.data as { project?: Project };
    if (data.project) return <div className="mt-3"><ProjectCard project={data.project} /></div>;
  }
  return null;
}

// ── Thinking animation ────────────────────────────────────────────────────────
function ThinkingIndicator() {
  return (
    <div className="flex items-start gap-3 py-1">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-0.5 ring-2 ring-indigo-100 dark:ring-indigo-900">
        <Image src="/profile.jpg" alt="Atharva" width={32} height={32} className="object-cover" unoptimized />
      </div>
      <div className="flex flex-col gap-2 pt-1.5">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          </motion.div>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">Thinking</span>
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="w-1 h-1 rounded-full bg-indigo-400 block"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
        </div>
        {/* Shimmer lines */}
        <div className="space-y-1.5">
          {[80, 60, 40].map((w, i) => (
            <motion.div key={i}
              className="h-2.5 rounded-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700"
              style={{ width: `${w}%` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bot avatar ────────────────────────────────────────────────────────────────
function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-0.5 ring-2 ring-indigo-100 dark:ring-indigo-900">
      <Image src="/profile.jpg" alt="Atharva" width={32} height={32} className="object-cover" unoptimized />
    </div>
  );
}

// ── Suggested questions ───────────────────────────────────────────────────────
const SUGGESTED = [
  "Show me your projects",
  "How do I contact you?",
  "Tell me about Aria",
  "What's your tech stack?",
  "Are you open to roles?",
];

// ── Initial greeting ──────────────────────────────────────────────────────────
const GREETING: Message = {
  role: "model",
  content: "Hey! I'm Atharva — I build voice AI systems, currently running ArisX in production.\n\nAsk me anything about my work, projects, or experience. Who am I talking to?",
  toolResults: [],
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AskAtharva() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll window to bottom on new messages
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages, isLoading]);

  async function handleSend(userMessage: string) {
    if (!userMessage.trim() || isLoading) return;
    setError(null);

    const apiHistory = messages
      .slice(1)
      .filter((m) => m.role === "user" || m.role === "model")
      .map((m) => ({ role: m.role, content: m.content }));

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: apiHistory }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessages([...newMessages, { role: "model", content: data.response, toolResults: data.toolResults ?? [] }]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Messages — normal page flow, window scrolls */}
      <div className="py-4 space-y-6 pb-40">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {msg.role === "model" ? (
                <div className="flex items-start gap-3">
                  <BotAvatar />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                    {msg.toolResults && msg.toolResults.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.toolResults.map((r, ri) => <ToolResultRenderer key={ri} result={r} />)}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="max-w-[75%] bg-neutral-100 dark:bg-neutral-800 rounded-3xl rounded-br-md px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 pl-11">
            {SUGGESTED.map((q) => (
              <button key={q} onClick={() => handleSend(q)}
                className="text-xs px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all">
                {q}
              </button>
            ))}
          </motion.div>
        )}

        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <ThinkingIndicator />
          </motion.div>
        )}

        {error && (
          <p className="text-center text-xs text-red-500 dark:text-red-400 py-1">
            {error} — try again?
          </p>
        )}
      </div>

      {/* Input fixed to viewport bottom — always visible */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-[640px] mx-auto px-6 sm:px-4 md:px-0 pb-4 pt-3 bg-white dark:bg-[#111010]">
          <PromptInputBox
            onSend={handleSend}
            isLoading={isLoading}
            placeholder="Ask me anything..."
          />
          <p className="text-center text-[11px] text-gray-400 dark:text-gray-600 mt-1.5">
            Powered by Gemini · Ask me anything
          </p>
        </div>
      </div>
    </>
  );
}
