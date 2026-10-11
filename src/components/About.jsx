import { Box, Brain, Gamepad2, Monitor } from "lucide-react";
import about from "../data/about.json";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

const ICONS = { monitor: Monitor, gamepad: Gamepad2, box: Box, brain: Brain };

export default function About() {
  return (
    <Section id="a-propos" eyebrow="À propos" title="Ce qui me motive">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-zinc-400">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {about.interests.map((it, i) => {
            const Icon = ICONS[it.icon] ?? Box;
            return (
              <Reveal key={it.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                  <Icon size={22} className="text-amber-300" />
                  <h3 className="mt-4 font-semibold text-white">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{it.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
