import { motion } from 'framer-motion';
import { Github, ExternalLink, FolderCode, PlayCircle } from 'lucide-react';

const CYAN = '#22d3ee';

const projects = [
  {
    title: 'Drone Simulation VR',
    description: 'Advanced physics-based drone simulation built with Unreal Engine. Features real-time control and immersive VR environment.',
    type: 'VR / Game Dev',
    github: 'https://github.com/ChandruChandraan',
    youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Unreal Engine', 'Blueprints', 'Physics', 'VR'],
  },
  {
    title: 'Architectural Visualization',
    description: 'High-fidelity real-time architectural walkthrough for PC and VR platforms using Unreal Engine 5 Lumen.',
    type: 'Visualization',
    github: 'https://github.com/ChandruChandraan',
    tags: ['UE5', 'Lumen', 'ArchViz', 'VR'],
  },
  {
    title: 'Smart Home System',
    description: 'IoT-based home automation system using ESP32 and MQTT protocol for real-time device control.',
    type: 'IoT / Embedded',
    github: 'https://github.com/ChandruChandraan/SmartHome',
    tags: ['ESP32', 'MQTT', 'Python', 'C++'],
  },
  {
    title: 'Selfie Booth',
    description: 'Custom kiosk application for interactive selfie booths with real-time filters and social sharing.',
    type: 'Desktop App',
    github: 'https://github.com/ChandruChandraan/SelfieBooth',
    tags: ['Unreal Engine', 'Kiosk', 'UI/UX'],
  },
  {
    title: 'Expenses Tracker',
    description: 'Clean and functional expenses management application to track personal finances.',
    type: 'Web App',
    github: 'https://github.com/ChandruChandraan/Expenses',
    tags: ['React', 'Tailwind', 'State Management'],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24" style={{ background: 'rgba(2,6,23,0.6)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <FolderCode size={16} color={CYAN} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: CYAN }}>Portfolio</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Featured Projects</h2>
            <p className="text-slate-400 max-w-sm">A selection of my work in game development, VR simulations, and IoT systems.</p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-3xl overflow-hidden flex flex-col group transition-all duration-300"
              style={{
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(51,65,85,0.5)',
              }}
              whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.3)' } as any}
            >
              {/* Media */}
              <div className="aspect-video relative overflow-hidden" style={{ background: '#0f172a' }}>
                {project.youtube ? (
                  <iframe
                    className="w-full h-full"
                    src={project.youtube}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderCode size={56} color="rgba(51,65,85,0.8)" />
                  </div>
                )}
                {/* Type badge */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-950"
                  style={{ backgroundColor: CYAN }}
                >
                  {project.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono uppercase text-slate-600">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(51,65,85,0.4)' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <Github size={15} /> Code
                  </a>
                  {project.youtube && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-600">
                      <PlayCircle size={15} /> Demo
                    </span>
                  )}
                  <div className="ml-auto">
                    <ExternalLink size={16} className="text-slate-700 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
