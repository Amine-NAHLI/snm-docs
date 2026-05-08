import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Mail, MapPin, GraduationCap, User } from 'lucide-react'

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
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-6">
            <User className="w-3.5 h-3.5" />
            ABOUT THE AUTHOR
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4">
            Meet the <span className="gradient-text">Builder</span>
          </h2>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl p-0.5 animated-border"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.2), rgba(124,58,237,0.2), rgba(255,0,255,0.2))',
          }}
        >
          <div className="rounded-3xl p-8 sm:p-12" style={{ background: 'rgba(10,10,20,0.95)' }}>
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              {/* Avatar */}
              <motion.div
                animate={{ boxShadow: ['0 0 20px rgba(0,255,255,0.2)', '0 0 40px rgba(124,58,237,0.3)', '0 0 20px rgba(255,0,255,0.2)', '0 0 20px rgba(0,255,255,0.2)'] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-orbitron font-black gradient-text border border-cyan-400/20"
                style={{ background: 'rgba(0,255,255,0.05)' }}
              >
                AN
              </motion.div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-orbitron font-bold text-2xl sm:text-3xl text-white mb-1">
                  Amine Nahli
                </h3>
                <p className="text-sm font-mono mb-4" style={{ color: '#00ffff' }}>
                  Security Engineer × Full-Stack Builder
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    Fès, Morocco
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    UPF — Software Engineering, 3rd Year
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  I am a Security Engineer and Full-Stack Developer who views every system as a puzzle.
                  My approach is simple: understand the vulnerability, master the architecture, and rebuild
                  it with absolute integrity. Based in Fès, I bridge the gap between aggressive security
                  research and high-performance product engineering.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent)' }} />

            {/* Socials */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: `${s.color}0d`,
                    border: `1px solid ${s.color}25`,
                    color: s.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.color}18`
                    e.currentTarget.style.borderColor = `${s.color}50`
                    e.currentTarget.style.boxShadow = `0 0 15px ${s.color}20`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${s.color}0d`
                    e.currentTarget.style.borderColor = `${s.color}25`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
