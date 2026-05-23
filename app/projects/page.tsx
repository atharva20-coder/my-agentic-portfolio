import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "My Projects",
};

export default function Projects() {
  return (
    <section>
      {/* <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1> */}
      <div className="space-y-6">
        {projects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="block p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 group transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <div className="flex flex-col">
                <div className="w-full flex justify-between items-baseline">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-black dark:text-white font-medium tracking-tight hover:underline"
                  >
                    {project.title}
                  </Link>
                  <span className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                    {project.date}
                  </span>
                </div>
                <p className="prose prose-neutral dark:prose-invert pt-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-3 items-center">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={`${link.text}-${linkIndex}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm inline-flex items-center gap-1"
                    >
                      {link.text}
                      <span className="text-xs">↗</span>
                    </a>
                  ))}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 text-sm ml-auto"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
