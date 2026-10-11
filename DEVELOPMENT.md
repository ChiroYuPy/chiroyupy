# Portfolio – notes de développement

Vite + React + Tailwind CSS. Une seule page : Hero, Projets, Compétences, Parcours, À propos, Contact.

## Développer
```bash
npm install
npm run dev      # http://localhost:5173/chiroyupy/
```

## Modifier le contenu
Tout est dans `src/data/` :
- `projects.json` : projets (ordre = ordre d'affichage, `link: "#"` → « Code bientôt public »)
- `skills.json` : cartes de compétences (icônes : cpu, globe, monitor, database, box, terminal)
- `timeline.json` : formation et expériences
- `about.json` : texte et centres d'intérêt
- `profile.js` : contact, liens, disponibilité

Les images des projets sont dans `public/images/` (nom indiqué dans `projects.json`). Sans image, une vignette neutre s'affiche.

## Déployer sur GitHub Pages
1. Sur GitHub : *Settings → Pages → Source : GitHub Actions*.
2. Un push sur `main` lance `.github/workflows/deploy.yml`.

Le site est servi sur `https://chiroyupy.github.io/chiroyupy/` : la `base` Vite est `/chiroyupy/`
(`vite.config.js`). Pour un dépôt `chiroyupy.github.io`, construire avec `VITE_BASE=/ npm run build`.

## Défilement
Sur grand écran, un cran de molette (ou ↓ / Espace / PageDown) amène à la section suivante (`src/useSectionScroll.js`).
La section Projets, plus haute que l'écran, se parcourt librement avant de passer à la suite.
Sur mobile, ou avec « réduire les animations » activé, le défilement reste natif.
