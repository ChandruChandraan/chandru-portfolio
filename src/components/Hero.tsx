import { motion } from 'framer-motion';
import { Github, Youtube, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Glowing background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse pointer-events-none"
        style={{ background: 'rgba(34,211,238,0.12)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-pulse pointer-events-none"
        style={{ background: 'rgba(6,182,212,0.08)', filter: 'blur(80px)', animationDelay: '1s' }} />

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#22d3ee' }}>
            Welcome to my space
          </span>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight">
            I'm{' '}
            <span style={{
              background: 'linear-gradient(to right, #22d3ee, #67e8f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Chandru
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-3 leading-relaxed">
            Game Developer | VR Developer | IoT Engineer
          </p>
          <p className="text-lg text-slate-500 max-w-xl mb-10">
            Building immersive simulations, real-time games, and smart systems.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-slate-950 transition-all"
              style={{ backgroundColor: '#22d3ee', boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
            >
              View Projects <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="https://github.com/ChandruChandraan"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-full border border-slate-700 text-slate-300 hover:text-white transition-colors"
              style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(12px)' }}
            >
              <Github size={20} />
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@Deoverse"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-full border border-slate-700 text-slate-300 hover:text-white transition-colors"
              style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(12px)' }}
            >
              <Youtube size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-600">Scroll</span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #22d3ee, transparent)' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
