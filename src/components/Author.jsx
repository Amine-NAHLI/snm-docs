import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Mail, MapPin, GraduationCap, User, Shield } from 'lucide-react'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIALS = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/Amine-NAHLI',
    color: '#e2e8f0',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/amine-nahli-48b2a734b/',
    color: '#0ea5e9',
  },
  {
    icon: Globe,
    label: 'Website',
    href: 'https://amine-nahli.dev',
    color: '#00ffff',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:nahliamine2@gmail.com',
    color: '#ff00ff',
  },
]

export default function Author() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="author" className="section-pad relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(0,255,255,0.03) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Avatar & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-magenta-400"
              />
              <div 
                className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl flex items-center justify-center text-6xl sm:text-7xl font-orbitron font-black gradient-text border border-white/10 glass shadow-2xl"
              >
                AN
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl glass border border-cyan-400/30 flex items-center justify-center animate-bounce shadow-lg shadow-cyan-500/20">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-end max-w-sm">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title={s.label}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = s.color}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio & Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-6">
              <Shield className="w-3.5 h-3.5" />
              CORE ARCHITECT
            </div>
            
            <h2 className="font-orbitron font-bold text-4xl sm:text-6xl text-white mb-2">
              Amine <span className="gradient-text">Nahli</span>
            </h2>
            <p className="text-xl font-mono mb-8" style={{ color: '#00ffff' }}>
              Security Engineer × Full-Stack Builder
            </p>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I am a Security Engineer and Full-Stack Developer who views every system as a puzzle. 
                Based in Fès, Morocco, I bridge the gap between aggressive security research and high-performance product engineering.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="glass p-4 rounded-2xl border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-semibold">Location</span>
                  </div>
                  <p className="text-sm">Fès, Morocco</p>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-semibold">Education</span>
                  </div>
                  <p className="text-sm">UPF — Software Engineering, 3rd Year</p>
                </div>
              </div>

              <p className="text-sm italic border-l-2 border-cyan-400/30 pl-4">
                "Understand the vulnerability, master the architecture, and rebuild it with absolute integrity."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
