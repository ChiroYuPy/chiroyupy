import { useEffect, useState } from "react";

const SECTIONS = [
  ["top", "Accueil"],
  ["projets", "Projets"],
  ["competences", "Compétences"],
  ["parcours", "Parcours"],
  ["a-propos", "À propos"],
  ["contact", "Contact"],
];

// Indicateur de position : points cliquables sur le bord droit (grands écrans).
export default function SideDots() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <ul className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {SECTIONS.map(([id, label]) => (
        <li key={id}>
          <a href={`#${id}`} aria-label={label} title={label} className="group flex items-center justify-end gap-3">
            <span className="text-xs text-zinc-500 opacity-0 transition group-hover:opacity-100">{label}</span>
            <span
              className={`block rounded-full transition-all ${
                active === id ? "h-6 w-1.5 bg-amber-300" : "h-1.5 w-1.5 bg-zinc-600 group-hover:bg-zinc-300"
              }`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
