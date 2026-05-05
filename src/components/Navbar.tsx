import { motion } from 'framer-motion';
import { Menu, X, Github, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ padding: '12px 24px' }}>
      {/* Main bar */}
      <div
        className="max-w-6xl mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(2,6,23,0.85)' : 'rgba(15,23,42,0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(51,65,85,0.5)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#" className="text-xl font-bold" style={{
          background: 'linear-gradient(to right, #22d3ee, #67e8f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CHANDRU
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-px h-5 bg-slate-700" />
          <a href="https://github.com/ChandruChandraan" target="_blank" rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.youtube.com/@Deoverse" target="_blank" rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors">
            <Youtube size={18} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-0 rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: 'rgba(2,6,23,0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(51,65,85,0.5)',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 pt-3 border-t border-slate-800">
            <a href="https://github.com/ChandruChandraan" className="text-slate-400 hover:text-white"><Github size={20} /></a>
            <a href="https://www.youtube.com/@Deoverse" className="text-slate-400 hover:text-white"><Youtube size={20} /></a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
