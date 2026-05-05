const Footer = () => {
  const CYAN = '#22d3ee';
  return (
    <footer className="py-10" style={{ borderTop: '1px solid rgba(51,65,85,0.4)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold" style={{
          background: 'linear-gradient(to right, #22d3ee, #67e8f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CHANDRU
        </div>
        <p className="text-slate-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Chandru. All rights reserved. Designed &amp; Built for Immersive Experiences.
        </p>
        <div className="flex gap-6 text-sm text-slate-500">
          {['#about', '#projects', '#contact'].map((href) => (
            <a key={href} href={href} className="hover:text-white transition-colors capitalize">
              {href.replace('#', '')}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
