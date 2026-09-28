import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Languages from "./components/Languages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import { ScrollTrigger } from "./lib/gsap";

const SelectedWork = lazy(() => import("./components/SelectedWork"));
const UnrealEngine = lazy(() => import("./components/UnrealEngine"));

function SectionLoader({ label }: { label: string }) {
  return (
    <div className="wrap section-pad border-t border-white/5" aria-hidden="true">
      <div className="flex items-center gap-4">
        <span className="skeleton h-4 w-24 rounded" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-ash">{label}</span>
      </div>
      <div className="skeleton mt-8 h-28 w-full max-w-2xl rounded-2xl" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <span className="skeleton h-40 rounded-2xl" />
        <span className="skeleton h-40 rounded-2xl" />
      </div>
    </div>
  );
}

export default function App() {
  /* keep scroll measurements honest once fonts & media settle */
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="relative">
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Suspense fallback={<SectionLoader label="LOADING // SELECTED WORK" />}>
          <SelectedWork />
        </Suspense>
        <Suspense fallback={<SectionLoader label="LOADING // UNREAL ENGINE" />}>
          <UnrealEngine />
        </Suspense>
        <Skills />
        <Education />
        <Languages />
        <Contact />
      </main>

      <Footer />

      {/* film grain */}
      <div
        className="grain pointer-events-none fixed inset-0 z-[92] opacity-[0.05]"
        aria-hidden="true"
      />
    </div>
  );
}
