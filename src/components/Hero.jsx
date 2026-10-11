import { ArrowRight, ChevronDown, Download, Gamepad2, Github, Linkedin, Settings2, Sprout } from "lucide-react";
import { profile } from "../data/profile.js";
import { imageUrl } from "../lib.js";

const ABOUT = [
  { icon: Sprout, text: "Je me concentre sur le développement logiciel, du bas niveau jusqu'au web." },
  {
    icon: Settings2,
    text: "Ce qui m'attire : la programmation graphique, les moteurs de jeu et de physique, le back end et l'architecture logicielle.",
  },
  {
    icon: Gamepad2,
    text: "Je construis mes propres projets, souvent nés de ma passion pour les jeux vidéo, et je m'intéresse de près à l'IA.",
  },
];

const FACTS = [
  { label: "Formation", value: "BUT Informatique", sub: "3ᵉ année · IUT de Vannes" },
  { label: "Recherche", value: "Stage de 16 semaines", sub: "25 janv. → 14 mai 2027 · ou alternance", live: true },
  { label: "Dernier stage", value: "RTsys", sub: "Rust · React · WebGL" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-amber-300/10 blur-[130px]" />
        <div className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Développeur logiciel · {profile.region}
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-2xl font-medium leading-snug text-zinc-200 sm:text-3xl">
            Programmation graphique, moteurs de jeu et applications web.
          </p>

          <ul className="mt-6 max-w-xl space-y-3 text-lg leading-relaxed text-zinc-400">
            {ABOUT.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3">
                <Icon size={20} className="mt-1.5 shrink-0 text-amber-300" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projets"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-200"
            >
              Voir mes projets
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}${profile.cv}`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-white/40"
            >
              <Download size={18} />
              Mon CV
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full p-3 text-zinc-400 transition hover:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-3 text-zinc-400 transition hover:text-white"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <dl className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {f.live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  {f.label}
                </dt>
                <dd className="mt-1.5 font-medium text-white">{f.value}</dd>
                <dd className="text-sm text-zinc-400">{f.sub}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto lg:mx-0 lg:justify-self-center">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-full border border-amber-300/30" />
            <img
              src={imageUrl("images/avatar.jpg")}
              alt="Portrait d'Adrian Leroux"
              className="relative h-full w-full rounded-full object-cover ring-1 ring-white/15"
            />
          </div>
        </div>
      </div>

      <a
        href="#projets"
        aria-label="Aller aux projets"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-zinc-600 transition hover:text-zinc-300 md:block"
      >
        <ChevronDown size={26} className="animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
