import { useEffect } from "react";

const IDS = ["top", "projets", "competences", "parcours", "a-propos", "contact"];
const LOCK_MS = 750; // durée d'une transition
const GAP_MS = 60; // silence nécessaire entre deux gestes (évite l'inertie du pavé tactile)

// Défilement section par section sur grand écran :
// un cran de molette amène à la section suivante ; une section plus haute que l'écran
// (les projets) se parcourt normalement, puis le scroll suivant passe à la section d'après.
export default function useSectionScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lockUntil = 0;
    let lastEvent = 0;

    const sections = () =>
      IDS.map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => ({ top: el.getBoundingClientRect().top + window.scrollY, height: el.offsetHeight }));

    // Retourne true si le déplacement a été pris en charge (événement à annuler).
    const step = (delta) => {
      const list = sections();
      if (!list.length) return false;
      const vh = window.innerHeight;
      const y = window.scrollY;
      let i = 0;
      list.forEach((s, k) => {
        if (s.top <= y + 2) i = k;
      });
      const cur = list[i];
      const go = (top) => {
        window.scrollTo({ top, behavior: "smooth" });
        lockUntil = performance.now() + LOCK_MS;
        return true;
      };
      const locked = performance.now() < lockUntil;

      if (delta > 0) {
        const bottomEdge = cur.top + Math.max(cur.height, vh) - vh;
        if (y < bottomEdge - 2 && y + delta < bottomEdge) return false; // défilement libre dans la section
        if (i === list.length - 1 && y >= bottomEdge - 2) return false; // fin de page
        if (locked) return true;
        return go(y < bottomEdge - 2 ? bottomEdge : list[i + 1].top);
      }

      if (y > cur.top + 2 && y + delta > cur.top) return false; // défilement libre
      if (y <= cur.top + 2 && i === 0) return false; // haut de page
      if (locked) return true;
      if (y > cur.top + 2) return go(cur.top);
      const prev = list[i - 1];
      return go(prev.top + Math.max(prev.height - vh, 0));
    };

    const active = () => desktop.matches && !reduced.matches;

    const onWheel = (e) => {
      if (!active() || e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = performance.now();
      const gap = now - lastEvent;
      lastEvent = now;
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      if (Math.abs(delta) < 4) return;
      // inertie d'un geste déjà traité : on l'absorbe sans rien déclencher
      if (now < lockUntil + 200 && gap < GAP_MS * 3 && now >= lockUntil - LOCK_MS) {
        if (now < lockUntil || gap < GAP_MS) {
          e.preventDefault();
          return;
        }
      }
      if (step(delta)) e.preventDefault();
    };

    const onKey = (e) => {
      if (!active() || e.altKey || e.ctrlKey || e.metaKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
      const down = ["ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && !e.shiftKey);
      const up = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (step((down ? 1 : -1) * window.innerHeight * 0.9)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
}
