import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Mail, MapPin, GraduationCap, Shield } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIAL_META = [
  { Icon: GithubIcon, label: 'GitHub', href: 'https://github.com/Amine-NAHLI', hoverColor: '#e2e8f0' },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/in/amine-nahli-48b2a734b/', hoverColor: '#0ea5e9' },
  { Icon: Globe, label: 'Website', href: 'https://amine-nahli.dev', hoverColor: '#00ffff' },
  { Icon: Mail, label: 'Email', href: 'mailto:nahliamine2@gmail.com', hoverColor: '#ff00ff' },
]

function SocialButton({ s }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={s.href}
      target={s.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      whileHover={{ scale: 1.12, y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={s.label}
      style={{
        width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? `${s.hoverColor}10` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? s.hoverColor + '55' : 'rgba(255,255,255,0.08)'}`,
        color: hovered ? s.hoverColor : 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.2s, border-color 0.2s, background 0.2s',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <s.Icon size={17} />
    </motion.a>
  )
}

function AuthorPhoto() {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        position: 'absolute', inset: '-8px', borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(0,255,255,0.2), rgba(124,58,237,0.15), rgba(255,0,255,0.2))',
        filter: 'blur(12px)',
        opacity: hovered ? 0.8 : 0.5,
        transition: 'opacity 0.3s',
      }} />
      <motion.img
        src="/nahli.png"
        alt="Amine Nahli"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative', width: '200px', height: '260px', objectFit: 'cover',
          borderRadius: '16px',
          border: hovered ? '2px solid rgba(0,255,255,0.55)' : '2px solid rgba(0,255,255,0.3)',
          boxShadow: hovered
            ? '0 0 40px rgba(0,255,255,0.3), 0 0 80px rgba(124,58,237,0.15)'
            : '0 0 30px rgba(0,255,255,0.2), 0 0 60px rgba(124,58,237,0.1)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          display: 'block',
        }}
      />
    </div>
  )
}

export default function Author() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].author

  return (
    <section id="author" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 80%, rgba(0,255,255,0.03) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Shield size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            {tx.title} <span className="gradient-text">{tx.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="author-grid">
          {/* Left: Photo + Social */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
          >
            <AuthorPhoto />
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {SOCIAL_META.map((s) => <SocialButton key={s.label} s={s} />)}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Amine <span className="gradient-text">Nahli</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '2rem',
              background: 'linear-gradient(135deg, var(--cyan), var(--magenta))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {tx.role}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              {tx.bio}
            </p>

            {/* Info cards */}
            <div className="info-grid" style={{ marginBottom: '1.75rem' }}>
              {[
                { Icon: MapPin, label: lang === 'en' ? 'Location' : 'Localisation', value: tx.location, color: '#a78bfa' },
                { Icon: GraduationCap, label: lang === 'en' ? 'Education' : 'Formation', value: tx.university, color: 'var(--cyan)' },
              ].map(({ Icon, label, value, color }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '0.875rem', padding: '1rem',
                  backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                    <Icon size={14} style={{ color }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.8125rem' }}>{label}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7,
              borderLeft: '2px solid rgba(0,255,255,0.3)', paddingLeft: '1rem', marginBottom: '1.75rem',
            }}>
              "{tx.quote}"
            </p>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {tx.skills.map((skill) => (
                <span key={skill} style={{
                  padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 500,
                  borderRadius: '9999px', border: '1px solid rgba(0,255,255,0.2)',
                  background: 'rgba(0,255,255,0.04)', color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
