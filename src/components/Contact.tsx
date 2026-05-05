import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Send } from 'lucide-react';

const CYAN = '#22d3ee';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: CYAN }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: CYAN }}>Contact</span>
            <div className="h-px w-8" style={{ backgroundColor: CYAN }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Get In Touch</h2>
          <p className="text-slate-400">Have a project in mind? Let's build something extraordinary together.</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] overflow-hidden"
          style={{ border: '1px solid rgba(51,65,85,0.5)' }}
        >
          <div className="flex flex-col md:flex-row">

            {/* LEFT – Contact Info */}
            <div className="md:w-2/5 p-10 flex flex-col justify-between" style={{ backgroundColor: CYAN }}>
              <div>
                <h3 className="text-3xl font-bold text-slate-950 mb-2">Let's build something</h3>
                <p className="text-4xl font-bold italic text-slate-900 opacity-70 mb-10">extraordinary.</p>

                <div className="space-y-6">
                  {[
                    { icon: <Mail size={20} />, label: 'Email', value: 'chandruchandran0712@gmail.com' },
                    { icon: <Phone size={20} />, label: 'Phone', value: '8270773803' },
                    { icon: <MapPin size={20} />, label: 'Location', value: 'Chennai, India' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl flex-shrink-0 text-slate-950" style={{ background: 'rgba(2,6,23,0.15)' }}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{item.label}</p>
                        <p className="font-semibold text-slate-950 break-all">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                <a
                  href="https://github.com/ChandruChandraan"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl text-white transition-all hover:scale-110"
                  style={{ backgroundColor: '#020617' }}
                >
                  <Github size={22} />
                </a>
              </div>
            </div>

            {/* RIGHT – Form */}
            <div className="md:w-3/5 p-10" style={{ background: 'rgba(15,23,42,0.8)' }}>
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                  ].map(field => (
                    <div key={field.label} className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl px-5 py-3.5 text-white placeholder-slate-600 outline-none transition-all text-sm"
                        style={{
                          background: 'rgba(30,41,59,0.5)',
                          border: '1px solid rgba(51,65,85,0.6)',
                        }}
                        onFocus={e => (e.target.style.borderColor = CYAN)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(51,65,85,0.6)')}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    className="w-full rounded-xl px-5 py-3.5 text-white placeholder-slate-600 outline-none transition-all text-sm"
                    style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(51,65,85,0.6)' }}
                    onFocus={e => (e.target.style.borderColor = CYAN)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(51,65,85,0.6)')}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full rounded-xl px-5 py-3.5 text-white placeholder-slate-600 outline-none transition-all resize-none text-sm"
                    style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(51,65,85,0.6)' }}
                    onFocus={e => (e.target.style.borderColor = CYAN)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(51,65,85,0.6)')}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-slate-950 transition-all"
                  style={{ backgroundColor: CYAN, boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
                >
                  Send Message <Send size={18} />
                </motion.button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
