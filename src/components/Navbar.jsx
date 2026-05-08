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
        position: 'relative',
        padding: '0.5rem 0.875rem',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: hovered ? 'var(--cyan)' : 'var(--text-secondary)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s',
        fontFamily: 'var(--font-heading)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <motion.span
        animate={{ width: hovered ? '70%' : '0%' }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          height: '1px', background: 'var(--cyan)', display: 'block',
        }}
      />
    </button>
  )
}

function LangToggle() {
  const { lang, toggle } = useLang()
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginLeft: '0.5rem',
        padding: '0.3rem 0.75rem',
        borderRadius: '9999px',
        border: `1px solid ${hovered ? 'var(--cyan)' : 'rgba(0,255,255,0.3)'}`,
        background: hovered ? 'rgba(0,255,255,0.1)' : 'transparent',
        color: 'var(--cyan)',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
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

  const scrollTo = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(5,5,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,255,255,0.08)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div style={{
        maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem',
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)', display: 'inline-block' }}
          />
          <span className="font-orbitron glow-cyan" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.2em' }}>
            SNM
          </span>
        </button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: '0' }}>
          {LINKS.map((l) => <NavLink key={l.href} label={l.label} href={l.href} onClick={scrollTo} />)}
          <LangToggle />
          <a
            href="https://github.com/Amine-NAHLI/smart-network-mapper"
            target="_blank" rel="noreferrer"
            style={{
              marginLeft: '0.75rem', padding: '0.375rem 1rem', fontSize: '0.85rem', fontWeight: 600,
              borderRadius: '9999px', border: '1px solid rgba(0,255,255,0.35)', color: 'var(--cyan)',
              background: 'transparent', cursor: 'pointer', textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
              fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,255,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', alignItems: 'center', padding: '0.25rem' }}
        >
          {open ? <X size={22} style={{ color: 'var(--cyan)' }} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(5,5,8,0.97)', borderBottom: '1px solid rgba(0,255,255,0.1)', overflow: 'hidden' }}
          >
            <div style={{ padding: '0.75rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  style={{
                    textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem',
                    color: 'var(--text-secondary)', background: 'none', border: 'none',
                    cursor: 'pointer', borderRadius: '0.5rem',
                    fontFamily: 'var(--font-heading)', transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.background = 'rgba(0,255,255,0.05)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'none' }}
                >
                  {l.label}
                </button>
              ))}
              <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,255,255,0.08)', display: 'flex', justifyContent: 'center' }}>
                <LangToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
