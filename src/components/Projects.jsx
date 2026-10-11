import { useMemo, useState } from "react";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import projects from "../data/projects.json";
import { hasLink, imageUrl } from "../lib.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

const CATEGORIES = ["Tous", "Applications", "Bas niveau", "Simulations", "Jeux"];
const label = (c) => c.charAt(0).toUpperCase() + c.slice(1);
const formatYear = (y) => y.replace(/-Ajd$/i, " → auj.");

function Cover({ project }) {
  const [failed, setFailed] = useState(false);
  const src = imageUrl(project.image);
  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950">
        <span className="text-5xl font-bold text-white/10">{project.title.slice(0, 2)}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={project.title}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}

function ProjectCard({ project }) {
  const open = hasLink(project.link);
  const Wrapper = open ? "a" : "div";
  const props = open ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Wrapper
      {...props}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition hover:-translate-y-1 hover:border-white/25 hover:bg-zinc-900"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <Cover project={project} />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {open ? (
            <ArrowUpRight size={18} className="mt-1 shrink-0 text-zinc-500 transition group-hover:text-amber-300" />
          ) : (
            <Lock size={15} className="mt-1.5 shrink-0 text-zinc-600" aria-label="Pas encore public" />
          )}
        </div>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
          {label(project.category)} · {formatYear(project.year)}
        </p>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.map((t) => (
            <li key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500">
          {open ? (
            <>
              <Github size={14} /> Voir le code source
            </>
          ) : (
            project.note ?? "Code bientôt public"
          )}
        </p>
      </div>
    </Wrapper>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("Tous");
  const list = useMemo(
    () => projects.filter((p) => filter === "Tous" || label(p.category) === filter),
    [filter],
  );

  return (
    <Section
      id="projets"
      eyebrow="Projets"
      align="start"
      title="Ce que j'ai construit"
      subtitle="Moteurs, outils et applications : des projets personnels et de formation, du bas niveau jusqu'au web."
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                filter === c
                  ? "border-amber-300 bg-amber-300 font-semibold text-zinc-950"
                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
