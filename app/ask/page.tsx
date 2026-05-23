import type { Metadata } from "next";
import AskAtharva from "./ask-atharva";

export const metadata: Metadata = {
  title: "Ask Atharva",
  description: "AI assistant trained on Atharva Joshi's profile — ask about his experience, projects, and tech stack.",
};

export default function AskPage() {
  return (
    <section>
      <AskAtharva />
    </section>
  );
}