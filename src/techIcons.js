import {
  siC, siCplusplus, siCss, siDocker, siEclipseide, siGit, siGithub, siGnubash, siHtml5, siJavascript, siJetbrains,
  siLinux, siOpenjdk, siPostgresql, siPython, siReact, siRust, siSpigotmc, siTailwindcss, siTypescript,
  siVite, siWebgpu, siXyflow,
} from "simple-icons";
import { Code2, Database, Gamepad2, Layers, Sparkles, Triangle } from "lucide-react";

// Logos de marque (simple-icons) : nom affiché -> icône. Les autres retombent sur une icône lucide.
export const BRANDS = {
  Rust: siRust,
  "C++": siCplusplus,
  C: siC,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  React: siReact,
  "React Flow": siXyflow,
  Vite: siVite,
  "Tailwind CSS": siTailwindcss,
  HTML: siHtml5,
  CSS: siCss,
  Java: siOpenjdk,
  Python: siPython,
  PostgreSQL: siPostgresql,
  WebGPU: siWebgpu,
  Spigot: siSpigotmc,
  Git: siGit,
  Docker: siDocker,
  GitHub: siGithub,
  Linux: siLinux,
  Bash: siGnubash,
  JetBrains: siJetbrains,
  Eclipse: siEclipseide,
};

export const FALLBACKS = {
  SQL: Database,
  JavaFX: Layers,
  Pygame: Gamepad2,
  "Paper API": Code2,
  OpenGL: Triangle,
  Vulkan: Triangle,
  WebGL: Triangle,
  WGSL: Sparkles,
  "VS Code": Code2,
};
