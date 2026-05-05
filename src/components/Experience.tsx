import { motion } from 'framer-motion';
import { Briefcase, Youtube, CheckCircle2 } from 'lucide-react';

const CYAN = '#22d3ee';

const responsibilities = [
  'Drone Simulation in VR (physics + real-time control)',
  'Architectural Visualization (PC & VR)',
  'Selfie Booth Kiosk Application',
  'Gameplay systems using Unreal Engine Blueprints',
  'Optimization for real-time performance',
];

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase size={16} color={CYAN} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: CYAN }}>Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-4 bottom-0 w-px" style={{ background: 'rgba(51,65,85,0.7)' }} />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-16"
          >
            {/* Dot */}
            <div
              className="absolute left-[13px] top-[6px] w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: CYAN,
                boxShadow: '0 0 12px rgba(34,211,238,0.6)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-slate-950" />
            </div>

            {/* Card */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(51,65,85,0.5)',
                borderLeft: `4px solid ${CYAN}`,
              }}
            >
              {/* Role + Duration */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Game / VR Developer</h3>
                  <p className="font-semibold" style={{ color: CYAN }}>DEO VERSE (Startup)</p>
                </div>
                <span
                  className="self-start sm:self-auto px-4 py-1.5 rounded-full text-sm font-medium text-slate-400"
                  style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(51,65,85,0.5)' }}
                >
                  2022 – Present
                </span>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-3 mb-8">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400">
                    <CheckCircle2 size={18} color={CYAN} className="mt-0.5 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="https://www.youtube.com/@Deoverse"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                }}
              >
                <Youtube size={20} color="#ef4444" />
                View Work on YouTube
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
