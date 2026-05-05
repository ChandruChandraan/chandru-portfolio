import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#020617] min-h-screen text-slate-300" style={{ backgroundColor: '#020617', color: '#cbd5e1' }}>
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="space-y-12">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

