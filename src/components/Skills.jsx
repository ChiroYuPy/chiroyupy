import { Box, Code2, Cpu, Database, Globe, Monitor, Terminal } from "lucide-react";
import skills from "../data/skills.json";
import { BRANDS, FALLBACKS } from "../techIcons.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

const ICONS = { cpu: Cpu, globe: Globe, monitor: Monitor, database: Database, box: Box, terminal: Terminal };

function Tech({ name }) {
  const brand = BRANDS[name];
  const Fallback = FALLBACKS[name] ?? Code2;
  return (
    <li className="group/tech inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.07]">
      {brand ? (
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-hidden
          className="h-4 w-4 shrink-0 fill-zinc-400 transition group-hover/tech:fill-amber-300"
        >
          <path d={brand.path} />
        </svg>
      ) : (
        <Fallback size={16} className="shrink-0 text-zinc-400 transition group-hover/tech:text-amber-300" />
      )}
      {name}
    </li>
  );
}

export default function Skills() {
  return (
    <Section
      id="competences"
      eyebrow="Compétences"
      title="Mon terrain de jeu"
      subtitle="Du plus près de la machine jusqu'à l'interface, avec les outils du quotidien."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {skills.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Box;
          // Grille de 6 colonnes : rangées de 3 cartes, la dernière rangée se répartit sur toute la largeur.
          const rest = skills.length % 3;
          const last = rest !== 0 && i >= skills.length - rest;
          const span = last ? (rest === 2 ? "lg:col-span-3" : "lg:col-span-6") : "lg:col-span-2";
          return (
            <Reveal key={s.title} delay={(i % 3) * 80} className={span}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900/60 p-6 transition hover:border-amber-300/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{s.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <Tech key={t} name={t} />
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
