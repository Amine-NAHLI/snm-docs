import { motion } from 'framer-motion'
import { Radio, Heart, ExternalLink } from 'lucide-react'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Features', href: '#features' },
  { label: 'Installation', href: '#installation' },
  { label: 'Usage', href: '#usage' },
  { label: 'AI Engine', href: '#ai-engine' },
  { label: 'Author', href: '#author' },
]

export default function Footer() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ background: '#07070e', borderColor: 'rgba(0,255,255,0.08)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,255,255,0.03) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-cyan-400" />
              <span className="font-orbitron font-bold text-lg tracking-widest glow-cyan" style={{ color: '#00ffff' }}>
                SNM
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Smart Network Mapper — Next-Generation Network Diagnostic &amp; AI-Powered Security Suite.
            </p>
            <p className="text-slate-600 text-xs mt-3 font-mono">
              Outil de cartographie réseau intelligent
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-slate-300 text-sm mb-4 font-orbitron tracking-wider">
              NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-sm text-slate-500 hover:text-cyan-400 transition-colors py-1"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-300 text-sm mb-4 font-orbitron tracking-wider">
              RESOURCES
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/Amine-NAHLI/smart-network-mapper"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub Repository
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="https://huggingface.co/aminenahli/smart-network-mapper-models"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <span className="text-base leading-none">🤗</span>
                Hugging Face Models
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="https://amine-nahli.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <span className="text-base leading-none">🌐</span>
                Author Website
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            Made with
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            by{' '}
            <a href="https://github.com/Amine-NAHLI" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">
              Amine Nahli
            </a>
          </div>
          <div className="font-mono">
            © 2025 SNM — Open Source, MIT License
          </div>
        </div>
      </div>
    </footer>
  )
}
