import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import GlobeCanvas from './GlobeCanvas'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function TypingText({ phrases }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    let timer
    if (!deleting && displayed.length < phrase.length) {
      timer = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 45)
    } else if (!deleting && displayed.length === phrase.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length - 1)), 22)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
    }
    return () => clearTimeout(timer)
  }, [displayed, deleting, phraseIdx, phrases])

  return (
    <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
      {displayed}
      <span className="cursor-blink" style={{ borderLeft: '2px solid var(--cyan)', marginLeft: '2px' }}>&nbsp;</span>
    </span>
  )
}

const BADGES = ['Python 3.8+', 'AI / ML', 'Cybersecurity', 'Multi-threaded', 'Scapy']

export default function Hero() {
  const { lang } = useLang()
  const tx = t[lang].hero

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D Globe */}
      <GlobeCanvas />

      {/* Radial glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,255,255,0.05) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '0 1.5rem',
        maxWidth: '64rem', margin: '0 auto',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.25)', background: 'rgba(0,255,255,0.05)',
            marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)',
          }}
        >
          <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
          {tx.badge}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron"
          style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 7vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}
        >
          <span className="animated-gradient-text">{tx.title1}</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>{tx.title2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            margin: '0 auto 1.25rem', lineHeight: 1.6, maxWidth: '40rem',
          }}
        >
          {tx.subtitle}
        </motion.p>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.5rem', marginBottom: '2.5rem', height: '2rem',
            maxWidth: '100%', overflow: 'hidden',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>$</span>
          <TypingText phrases={tx.terminal} />
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}
        >
          {BADGES.map((b) => (
            <motion.span 
              key={b} 
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(124,58,237,0.5)', borderColor: 'rgba(124,58,237,0.8)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.25rem 0.875rem', fontSize: '0.75rem', fontWeight: 500,
                borderRadius: '9999px', border: '1px solid rgba(124,58,237,0.3)',
                background: 'rgba(124,58,237,0.08)', color: '#a78bfa', fontFamily: 'var(--font-mono)',
                cursor: 'default', transition: 'border-color 0.2s'
              }}
            >
              {b}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hero-buttons"
        >
          <a
            href="https://github.com/Amine-NAHLI/smart-network-mapper"
            target="_blank" rel="noreferrer"
            className="hero-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '9999px',
              fontWeight: 700, fontSize: '0.9rem',
              background: 'linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)',
              color: '#050508', textDecoration: 'none',
              boxShadow: '0 0 30px rgba(0,255,255,0.25)',
              transition: 'box-shadow 0.3s, transform 0.2s',
              fontFamily: 'var(--font-heading)',
              minHeight: '52px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 50px rgba(0,255,255,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <GithubIcon size={16} /> {tx.btnGithub} →
          </a>
          <button
            onClick={() => document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '9999px',
              fontWeight: 600, fontSize: '0.9rem',
              border: '1px solid rgba(0,255,255,0.35)', color: 'var(--cyan)',
              background: 'transparent', cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              fontFamily: 'var(--font-heading)',
              minHeight: '52px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {tx.btnStart} ↓
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}>{tx.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
