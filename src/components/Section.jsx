import Reveal from "./Reveal.jsx";

// Chaque section occupe au moins un écran et sert de point d'arrêt au défilement.
export default function Section({ id, eyebrow, title, subtitle, children, align = "center" }) {
  return (
    <section
      id={id}
      className={`flex min-h-screen pb-16 pt-24 ${align === "center" ? "items-center" : "items-start"}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-zinc-400">{subtitle}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
