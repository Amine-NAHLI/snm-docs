import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

function NavLink({ label, href, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => onClick(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0.5rem 1rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: hovered ? '#fff' : 'var(--text-secondary)',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'transparent',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'var(--font-heading)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {label}
    </button>
  )
}

function LangToggle({ large = false }) {
  const { lang, toggle } = useLang()
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: large ? '0.5rem 1.25rem' : '0.3rem 0.75rem',
        borderRadius: '9999px',
        border: `1px solid ${hovered ? 'var(--cyan)' : 'rgba(0,255,255,0.3)'}`,
        background: hovered ? 'rgba(0,255,255,0.1)' : 'transparent',
        color: 'var(--cyan)',
        cursor: 'pointer',
        fontSize: large ? '0.95rem' : '0.75rem',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        marginLeft: large ? 0 : '0.5rem',
        minHeight: '44px',
      }}
    >
      {lang === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang } = useLang()

  const LINKS = [
    { label: t[lang].nav.overview, href: '#overview' },
    { label: t[lang].nav.features, href: '#features' },
    { label: t[lang].nav.docs, href: '#docs' },
    { label: t[lang].nav.aiEngine, href: '#ai-engine' },
    { label: t[lang].nav.dataset, href: '#dataset' },
    { label: t[lang].nav.author, href: '#author' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (href) => {
    setOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: '1rem', left: '50%', zIndex: 1000,
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          transition: 'all 0.3s',
          width: 'fit-content',
          maxWidth: 'calc(100% - 2rem)',
        }}
      >
        <div style={{
          padding: '0.5rem 0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        }}>
          {/* Logo */}
          <button
            onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0.5rem' }}
          >
            <span className="font-orbitron glow-cyan" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em' }}>
              SNM
            </span>
          </button>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {LINKS.map((l) => <NavLink key={l.href} label={l.label} href={l.href} onClick={scrollTo} />)}
            
            <div style={{ width: '1px', height: '1.5rem', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }} />
            
            <LangToggle />
            
            <a
              href="https://github.com/Amine-NAHLI/smart-network-mapper"
              target="_blank" rel="noreferrer"
              style={{
                marginLeft: '0.5rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 700,
                borderRadius: '9999px', border: 'none', color: '#0A0F1C',
                background: '#ffffff', cursor: 'pointer', textDecoration: 'none',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              GITHUB
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: open ? 'var(--cyan)' : 'var(--text-secondary)',
              padding: '0.5rem', minHeight: '44px', minWidth: '44px',
              alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.2s',
            }}
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '4rem', left: 0, right: 0, bottom: 0,
              background: 'rgba(5,5,8,0.45)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '2rem 1.5rem',
              overflowY: 'auto',
            }}
          >
            {/* Subtle top glow */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent)' }} />

            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  width: '100%', maxWidth: '320px',
                  minHeight: '56px',
                  textAlign: 'center',
                  padding: '0 1.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,255,255,0.1)',
                  borderRadius: '0.875rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.3)'; e.currentTarget.style.background = 'rgba(0,255,255,0.05)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                {l.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <LangToggle large />
              <a
                href="https://github.com/Amine-NAHLI/smart-network-mapper"
                target="_blank" rel="noreferrer"
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.5rem', borderRadius: '9999px',
                  border: '1px solid rgba(0,255,255,0.3)', color: 'var(--cyan)',
                  background: 'rgba(0,255,255,0.06)', textDecoration: 'none',
                  fontSize: '0.9rem', fontWeight: 600, minHeight: '44px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                GitHub →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
