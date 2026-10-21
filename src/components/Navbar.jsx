import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

function NavLink({ label, href, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => onClick(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0.32rem 0.65rem',
        fontSize: '0.72rem',
        fontWeight: 500,
        color: hovered ? '#ffffff' : 'rgba(240, 244, 248, 0.72)',
        background: hovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        fontFamily: 'var(--font-heading)',
        letterSpacing: '0.04em',
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
      title={lang === 'en' ? 'Passer en Français' : 'Switch to English'}
      style={{
        padding: large ? '0.5rem 1.2rem' : '0.25rem 0.55rem',
        borderRadius: '9999px',
        border: `1px solid ${hovered ? 'rgba(0,255,255,0.45)' : 'rgba(255,255,255,0.1)'}`,
        background: hovered ? 'rgba(0,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        color: hovered ? 'var(--cyan)' : 'rgba(240, 244, 248, 0.8)',
        cursor: 'pointer',
        fontSize: large ? '0.85rem' : '0.68rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        height: large ? '40px' : '28px',
      }}
    >
      <Globe size={large ? 15 : 12} style={{ opacity: 0.85 }} />
      <span>{lang.toUpperCase()}</span>
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
    const onScroll = () => setScrolled(window.scrollY > 30)
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
        initial={{ y: -60, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: scrolled ? '0.65rem' : '0.85rem',
          left: '50%',
          zIndex: 1000,
          background: scrolled ? 'rgba(7, 10, 22, 0.92)' : 'rgba(10, 14, 28, 0.82)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          boxShadow: scrolled
            ? '0 12px 35px -5px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,255,255,0.06)'
            : '0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          width: 'fit-content',
          maxWidth: 'calc(100% - 2rem)',
        }}
      >
        <div style={{
          padding: '0.28rem 0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
        }}>
          {/* Logo */}
          <button
            onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            <span style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.88rem',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-heading)',
            }}>
              SNM
            </span>
          </button>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: '0.15rem' }}>
            {LINKS.map((l) => <NavLink key={l.href} label={l.label} href={l.href} onClick={scrollTo} />)}
            
            <div style={{
              width: '1px',
              height: '1.1rem',
              background: 'rgba(255,255,255,0.12)',
              margin: '0 0.4rem',
            }} />
            
            <LangToggle />
            
            <a
              href="https://github.com/Amine-NAHLI/smart-network-mapper"
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: '0.35rem',
                padding: '0.28rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                color: '#ffffff',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-heading)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                letterSpacing: '0.03em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                height: '28px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.45)'
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.12)'
                e.currentTarget.style.color = 'var(--cyan)'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 255, 255, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'
                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)'
              }}
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: open ? 'var(--cyan)' : 'var(--text-secondary)',
              padding: '0.35rem',
              minHeight: '36px',
              minWidth: '36px',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
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
              top: '3.6rem', left: 0, right: 0, bottom: 0,
              background: 'rgba(5, 7, 18, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '1.5rem',
              overflowY: 'auto',
            }}
          >
            {/* Subtle top glow */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent)' }} />

            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  width: '100%', maxWidth: '300px',
                  minHeight: '48px',
                  textAlign: 'center',
                  padding: '0 1.25rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,255,255,0.1)',
                  borderRadius: '0.75rem',
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
              transition={{ delay: 0.3 }}
              style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '300px' }}
            >
              <LangToggle large />
              <a
                href="https://github.com/Amine-NAHLI/smart-network-mapper"
                target="_blank" rel="noreferrer"
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%',
                  padding: '0.6rem 1.25rem', borderRadius: '9999px',
                  border: '1px solid rgba(0,255,255,0.3)', color: 'var(--cyan)',
                  background: 'rgba(0,255,255,0.06)', textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 600, minHeight: '40px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <GithubIcon />
                <span>GitHub →</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
