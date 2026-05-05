import { motion } from 'framer-motion';
import { Gamepad2, Code2, Cpu, Globe } from 'lucide-react';

const CYAN = '#22d3ee';

const skillCategories = [
  {
    title: 'Game & VR',
    icon: <Gamepad2 size={24} color={CYAN} />,
    skills: ['Unreal Engine', 'Blueprints', 'Game Mechanics', 'Level Design'],
  },
  {
    title: 'Programming',
    icon: <Code2 size={24} color={CYAN} />,
    skills: ['Python', 'Dart', 'C++ (Basic)', 'JavaScript'],
  },
  {
    title: 'IoT',
    icon: <Cpu size={24} color={CYAN} />,
    skills: ['ESP32', 'MQTT', 'Networking', 'Sensors Integration'],
  },
  {
    title: 'Development',
    icon: <Globe size={24} color={CYAN} />,
    skills: ['Web Apps', 'Flutter (Basics)', 'Tailwind CSS', 'React'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24" style={{ background: 'rgba(2,6,23,0.8)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: CYAN }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: CYAN }}>Toolkit</span>
            <div className="h-px w-8" style={{ backgroundColor: CYAN }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Technical <span style={{ color: CYAN }}>Toolkit</span>
          </h2>
          <p className="text-slate-400">Specialized skills in immersive tech and smart systems</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-3xl p-7 flex flex-col gap-5 group cursor-default transition-all duration-300"
              style={{
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(51,65,85,0.5)',
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}
              >
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 hover:text-white transition-colors"
                    style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.5)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
