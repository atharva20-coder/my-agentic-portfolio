import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import Analytics from './components/Analytics'
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./config";
import {PosthogScript} from "./components/PosthogScript"

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  keywords: [
    "Atharva Joshi",
    "AI voice agent developer",
    "voice AI engineer",
    "Gemini Live",
    "WebRTC voice agent",
    "STT LLM TTS pipeline",
    "WhatsApp AI agent",
    "ArisX",
    "Aria voice bot",
    "Next.js developer",
    "TypeScript engineer",
    "AI automation",
    "speech-to-text",
    "fintech AI",
    "hire AI engineer",
  ],
  authors: [{ name: metaData.name, url: metaData.baseUrl }],
  creator: metaData.name,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "profile",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: metaData.name,
    card: "summary_large_image",
    creator: "@ceo_joshi",
    description: metaData.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atharva Joshi",
              url: metaData.baseUrl,
              image: `${metaData.baseUrl}profile.jpg`,
              jobTitle: "AI Voice Agent Engineer",
              description: metaData.description,
              email: "atharvajoshi2520@gmail.com",
              sameAs: [
                "https://x.com/ceo_joshi",
                "https://github.com/atharva20-coder",
                "https://www.linkedin.com/in/atharva20/",
              ],
              knowsAbout: [
                "AI voice agents",
                "Gemini 3.1 Flash Live",
                "WebRTC",
                "Speech-to-Text",
                "Text-to-Speech",
                "LLM pipelines",
                "WhatsApp Business API",
                "Next.js",
                "TypeScript",
                "Python",
                "Redis",
                "BullMQ",
                "Supabase",
                "real-time AI systems",
              ],
            }),
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
        <PosthogScript/>
      </head>
      <body className="antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
