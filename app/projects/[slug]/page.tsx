import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "../project-data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const { details } = project;

  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums">
            {project.date}
          </span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{project.description}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm inline-flex items-center gap-1"
            >
              {link.text} <span className="text-xs">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-8 prose prose-neutral dark:prose-invert max-w-none">

        <div>
          <h2 className="text-lg font-medium mb-2">Problem</h2>
          <p>{details.problem}</p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Overview</h2>
          <p>{details.overview}</p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 not-prose">
            {details.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Scalability & Architecture</h2>
          <p>{details.scalability}</p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Impact</h2>
          <p>{details.impact}</p>
        </div>

        {details.howToRun && (
          <div>
            <h2 className="text-lg font-medium mb-2">How to Run</h2>
            <pre className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 text-sm overflow-x-auto">
              <code>{details.howToRun}</code>
            </pre>
          </div>
        )}

        {details.testCredentials && (
          <div>
            <h2 className="text-lg font-medium mb-2">Test Credentials</h2>
            <p className="text-sm">{details.testCredentials}</p>
          </div>
        )}

      </div>

      <div className="mt-10">
        <a
          href="/projects"
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
        >
          ← Back to projects
        </a>
      </div>
    </section>
  );
}
