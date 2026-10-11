import timeline from "../data/timeline.json";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

export default function Timeline() {
  return (
    <Section id="parcours" eyebrow="Parcours" title="Formation et expériences">
      <div className="grid gap-12 md:grid-cols-2">
        {timeline.timeline.map((block) => (
          <Reveal key={block.title}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">{block.title}</h3>
            <ol className="mt-6 space-y-8 border-l border-white/10 pl-6">
              {block.items.map((item) => (
                <li key={item.title} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-300 ring-4 ring-zinc-950" />
                  <p className="text-xs font-medium uppercase tracking-wider text-amber-300">{item.period}</p>
                  <h4 className="mt-1 text-lg font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
