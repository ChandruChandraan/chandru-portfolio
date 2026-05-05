import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Clock } from 'lucide-react';

const CYAN = '#22d3ee';

const About = () => {
  const stats = [
    { icon: <GraduationCap size={22} color={CYAN} />, label: 'Education', value: 'Pursuing BCA (2025–Present)' },
    { icon: <MapPin size={22} color={CYAN} />, label: 'Location', value: 'Chennai, India' },
    { icon: <Clock size={22} color={CYAN} />, label: 'Experience', value: '3.5+ Years in Development' },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT – Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8" style={{ backgroundColor: CYAN }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: CYAN }}>
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Turning ideas into{' '}
              <span style={{ color: CYAN }}>interactive reality.</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Results-driven developer with 3.5 years of experience in Unreal Engine game development,
              virtual reality (VR &amp; AR), and IoT systems. Specialized in building real-time simulations,
              interactive applications, and immersive environments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 flex flex-col gap-2"
                  style={{
                    background: 'rgba(15,23,42,0.6)',
                    border: '1px solid rgba(51,65,85,0.5)',
                  }}
                >
                  {stat.icon}
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                  <p className="text-sm font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT – Image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Floating "available" badge */}
            <div
              className="absolute -top-4 -right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-white"
              style={{
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(51,65,85,0.6)',
                backdropFilter: 'blur(12px)',
                animation: 'float 5s ease-in-out infinite',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </div>

            <div
              className="rounded-3xl overflow-hidden relative group"
              style={{ border: '1px solid rgba(51,65,85,0.5)' }}
            >
              <img
                src="/tech_abstract.png"
                alt="VR and IoT Abstract"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ opacity: 0.75, aspectRatio: '1/1', objectFit: 'cover' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #020617 20%, transparent 60%)' }}
              />
              <div className="absolute bottom-8 left-8">
                <p className="text-2xl font-bold text-white tracking-widest">C H A N D R U</p>
                <p className="text-sm font-semibold mt-1" style={{ color: CYAN }}>VR &amp; IoT SPECIALIST</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
