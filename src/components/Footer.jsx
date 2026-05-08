import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Features', href: '#features' },
  { label: 'Installation', href: '#docs' },
  { label: 'Usage Guide', href: '#docs' },
  { label: 'AI Engine', href: '#ai-engine' },
  { label: 'Author', href: '#author' },
]

const RESOURCES = [
  { label: 'GitHub Repository', href: 'https://github.com/Amine-NAHLI/smart-network-mapper', icon: GithubIcon },
  { label: 'Hugging Face Models', href: 'https://huggingface.co/aminenahli/smart-network-mapper-models', emoji: '🤗' },
  { label: 'Author Website', href: 'https://amine-nahli.dev', emoji: '🌐' },
]

function FooterLink({ label, href, isExternal }) {
  const [hovered, setHovered] = useState(false)
  if (isExternal) {
    return (
      <a
        href={href} target="_blank" rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.875rem',
          color: hovered ? 'var(--cyan)' : 'var(--text-muted)',
          textDecoration: 'none',
          transition: 'color 0.2s',
          padding: '0.25rem 0',
        }}
      >
        {href.includes('github') ? <GithubIcon size={14} /> : null}
        {label}
        <ExternalLink size={11} style={{ marginLeft: 'auto' }} />
      </a>
    )
  }
  return (
    <button
      onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'left', fontSize: '0.875rem',
        color: hovered ? 'var(--cyan)' : 'var(--text-muted)',
        background: 'none', border: 'none', cursor: 'pointer',
        transition: 'color 0.2s', padding: '0.25rem 0',
        fontFamily: 'var(--font-heading)',
      }}
    >
      {label}
    </button>
  )
}

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', overflow: 'hidden',
      background: '#030306',
      borderTop: '1px solid rgba(0,255,255,0.07)',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,255,255,0.025) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem 2rem', position: 'relative', zIndex: 10 }}>
        <div className="footer-grid" style={{ marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}
              />
              <span className="font-orbitron glow-cyan" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.2em' }}>
                SNM
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: '18rem', marginBottom: '0.75rem' }}>
              Smart Network Mapper — Next-Generation Network Diagnostic &amp; AI-Powered Security Suite.
            </p>
            <p style={{ color: '#2d3748', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              Outil de cartographie réseau intelligent
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-orbitron" style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '1.25rem', letterSpacing: '0.12em' }}>
              NAVIGATION
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.125rem' }}>
              {NAV_LINKS.map((l) => (
                <FooterLink key={l.label} label={l.label} href={l.href} isExternal={false} />
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orbitron" style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '1.25rem', letterSpacing: '0.12em' }}>
              RESOURCES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {RESOURCES.map((r) => (
                <FooterLink key={r.label} label={r.label} href={r.href} isExternal={true} />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-h" />

        {/* Bottom */}
        <div className="bottom-bar" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            Made with{' '}
            <span style={{ color: '#f472b6' }}>❤</span>
            {' '}by{' '}
            <a
              href="https://github.com/Amine-NAHLI"
              target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Amine Nahli
            </a>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)' }}>
            © 2025 SNM — Open Source, MIT License
          </div>
        </div>
      </div>
    </footer>
  )
}
