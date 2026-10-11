import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile.js";

const LINKS = [
  ["projets", "Projets"],
  ["competences", "Compétences"],
  ["parcours", "Parcours"],
  ["a-propos", "À propos"],
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "border-b border-white/5 bg-zinc-950/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight text-white">
          adrian<span className="text-amber-300">.</span>leroux
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                  active === id ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="rounded-full bg-amber-300 px-4 py-1.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          >
            Me contacter
          </a>
          <button
            className="rounded-lg p-2 text-zinc-300 hover:bg-white/5 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/5 px-5 pb-4 pt-2 md:hidden">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-2.5 text-zinc-300">
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 text-xs text-zinc-500">{profile.availability}</li>
        </ul>
      )}
    </header>
  );
}
