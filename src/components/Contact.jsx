import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/profile.js";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  return (
    <section id="contact" className="flex min-h-screen flex-col justify-center pb-8 pt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-8 sm:p-14">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/15 blur-[90px]" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">Contact</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Un stage de 16 semaines à proposer ?
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Je cherche un stage de développement du <strong className="text-white">25 janvier au 14 mai 2027</strong>.
                N'hésitez pas à m'écrire ou à m'appeler : je réponds vite.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-200"
                >
                  <Mail size={18} /> {profile.email}
                </a>
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-white/40"
                >
                  <Phone size={18} /> {profile.phone}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-zinc-400">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <Github size={17} /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <Linkedin size={17} /> LinkedIn
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={17} /> {profile.mobility}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-16 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} Adrian Leroux · Fait avec React, Vite et Tailwind
        </p>
      </div>
    </section>
  );
}
