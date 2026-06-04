import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Copy, Check, AlertTriangle, Shield, Download, Terminal, ChevronDown, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { PLATFORMS } from '../config/downloads'

function GithubIcon({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const { lang } = useLang()
  const tx = t[lang].installation

  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      style={{
        position: 'absolute', top: '0.625rem', right: '0.625rem',
        padding: '0.375rem 0.625rem', display: 'flex', alignItems: 'center', gap: '0.3rem',
        borderRadius: '0.375rem', border: '1px solid rgba(0,255,255,0.15)',
        background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(0,255,255,0.06)',
        color: copied ? '#10b981' : 'var(--text-secondary)',
        cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)' } }}
      onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.15)' } }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? tx.copied : tx.copy}
    </button>
  )
}

function CodeBlock({ code }) {
  return (
    <div className="code-block" style={{ marginTop: '0.75rem', position: 'relative' }}>
      <CopyButton text={code} />
      <div className="code-scroll">
        <pre style={{ margin: 0, lineHeight: 1.7, minWidth: 'max-content' }}>
          {code.split('\n').map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ userSelect: 'none', color: 'var(--text-muted)', width: '1.25rem', textAlign: 'right', flexShrink: 0, fontSize: '0.8rem' }}>{i + 1}</span>
              <span>
                {line.startsWith('#') ? (
                  <span style={{ color: 'var(--text-muted)' }}>{line}</span>
                ) : (
                  (() => {
                    const first = line.split(' ')[0]
                    const rest = ' ' + line.split(' ').slice(1).join(' ')
                    const cmdColor = ['git'].includes(first) ? 'var(--cyan)' : ['python', 'pip'].includes(first) ? 'var(--magenta)' : ['cd', 'sudo'].includes(first) ? '#f59e0b' : null
                    return cmdColor ? (
                      <><span style={{ color: cmdColor }}>{first}</span><span style={{ color: '#c9d1d9' }}>{rest}</span></>
                    ) : (
                      <span style={{ color: '#c9d1d9' }}>{line}</span>
                    )
                  })()
                )}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

function AlertBox({ type = 'warning', children }) {
  const isInfo = type === 'info'
  const color = isInfo ? 'var(--cyan)' : 'var(--amber)'
  const Icon = isInfo ? Shield : AlertTriangle
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
      borderRadius: '0.75rem', padding: '0.875rem 1rem', marginTop: '0.875rem',
      background: isInfo ? 'rgba(0,255,255,0.04)' : 'rgba(245,158,11,0.05)',
      border: `1px solid ${color}22`,
    }}>
      <Icon size={16} style={{ color, flexShrink: 0, marginTop: '0.1rem' }} />
      <div style={{ fontSize: '0.825rem', lineHeight: 1.65, color: `${color}cc`, wordBreak: 'break-word', overflowWrap: 'break-word' }}>{children}</div>
    </div>
  )
}

export default function Installation({ isEmbed = false }) {
  const [showNpcap, setShowNpcap] = useState(false)
  const [tab, setTab] = useState('exe')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()
  const tx = t[lang].installation

  const steps = [
    {
      num: '01', title: tx.s1t, icon: Shield,
      content: (
        <div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tx.s1items.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <AlertBox type="warning">{tx.s1w1}</AlertBox>

          <button 
            onClick={() => setShowNpcap(!showNpcap)}
            style={{
              marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.75rem 1rem', borderRadius: '0.625rem', background: 'rgba(0,255,255,0.05)',
              border: '1px solid rgba(0,255,255,0.15)', color: 'var(--cyan)', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={14} /> {tx.npcapBtn}
            </div>
            <ChevronDown size={14} style={{ transform: showNpcap ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>

          <AnimatePresence>
            {showNpcap && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '1rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {tx.npcapGuide.title}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {[tx.npcapGuide.step1, tx.npcapGuide.step2, tx.npcapGuide.step3].map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>{idx + 1}.</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {tx.npcapGuide.verifyTitle}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {tx.npcapGuide.verifyText}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AlertBox type="info">{tx.s1w2}</AlertBox>
        </div>
      ),
    },
    {
      num: '02', title: tx.s2t, icon: GithubIcon,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* GitHub Premium Card */}
          <div style={{ 
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: '1.25rem', padding: '1.5rem',
            overflow: 'hidden'
          }}>
            {/* Decorative Background Icon */}
            <GithubIcon size={120} style={{ 
              position: 'absolute', right: '-20px', bottom: '-20px', 
              opacity: 0.03, transform: 'rotate(-15deg)', pointerEvents: 'none' 
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '3rem', height: '3rem', borderRadius: '0.875rem',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
                boxShadow: '0 0 20px rgba(255,255,255,0.1)'
              }}>
                <GithubIcon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Amine-NAHLI / smart-network-mapper
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {tx.s2desc}
                </p>
                
                <a 
                  href="https://github.com/Amine-NAHLI/smart-network-mapper" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                    padding: '0.625rem 1.25rem', borderRadius: '0.75rem',
                    background: 'var(--cyan)', color: '#000', textDecoration: 'none', 
                    fontSize: '0.8rem', fontWeight: 800, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 15px rgba(0,255,255,0.2)'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,255,255,0.2)';
                  }}
                >
                  {tx.s2btn} <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={12} style={{ color: 'var(--cyan)' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Clone Command
              </p>
            </div>
            <CodeBlock code={`git clone <REPO_URL>\ncd smart-network-mapper`} />
          </div>
        </div>
      ),
    },
    {
      num: '03', title: tx.s3t, icon: Terminal,
      content: (
        <>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{tx.s3sub}</p>
          <CodeBlock code={`pip install -r requirements.txt`} />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>{tx.s3inc}</p>
        </>
      ),
    },
    {
      num: '04', title: tx.s4t, icon: Download,
      content: (
        <>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{tx.s4sub}</p>
          <CodeBlock code={`python download_models.py`} />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            {tx.s4link}{' '}
            <a href="https://huggingface.co/aminenahli/smart-network-mapper-models" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', wordBreak: 'break-all' }}>
              huggingface.co/aminenahli/smart-network-mapper-models
            </a>
          </p>
        </>
      ),
    },
    {
      num: '05', title: tx.s5t, icon: Terminal,
      content: (
        <>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{tx.s5sub}</p>
          <CodeBlock code={`python app.py`} />
          <AlertBox type="warning">{tx.s5admin}</AlertBox>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '0.25rem' }}>{tx.s5or}</p>
          <CodeBlock code={`python main.py`} />
        </>
      ),
    },
  ]

  // Note: Tab switcher logic follows below.

  const content = (
    <div ref={ref} style={isEmbed ? {} : { maxWidth: '52rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {!isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Download size={13} /> {tx.label}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      {/* Tab Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: 'flex', gap: '0.25rem', padding: '0.25rem',
          marginBottom: '2.5rem', borderRadius: '0.875rem',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,255,255,0.1)',
        }}
      >
        {[
          { id: 'exe', label: tx.tabExecutable, icon: Download },
          { id: 'source', label: tx.tabSource, icon: Terminal },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', padding: '0.75rem', borderRadius: '0.625rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              border: tab === id ? '1px solid rgba(0,255,255,0.25)' : '1px solid transparent',
              background: tab === id ? 'rgba(0,255,255,0.1)' : 'transparent',
              color: tab === id ? 'var(--cyan)' : 'var(--text-muted)',
              transition: 'all 0.2s', fontFamily: 'var(--font-heading)',
            }}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {tab === 'exe' ? (
          <motion.div
            key="exe-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Standalone Executables Section */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(124,58,237,0.05) 100%)',
              border: '1px solid rgba(0,255,255,0.2)',
              borderRadius: '1.25rem',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                padding: '0.35rem 0.85rem', borderRadius: '999px',
                background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.2)',
                color: 'var(--cyan)', fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase'
              }}>
                {tx.standaloneBadge}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                  background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)'
                }}>
                  <Download size={24} />
                </div>
                <div>
                  <h3 className="font-orbitron" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {tx.standaloneTitle}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tx.standaloneDesc}</p>
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', padding: '1.25rem',
                border: '1px dashed rgba(0,255,255,0.2)', marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cyan)', marginBottom: '0.75rem' }}>
                  <Shield size={16} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>{tx.standaloneWindowsNote}</span>
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                  {tx.standaloneDev}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {tx.standaloneAfterDownload}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {PLATFORMS.map((platform) => (
                  platform.available ? (
                    <a
                      key={platform.id}
                      href={platform.url}
                      download={platform.fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '1.25rem 1rem', borderRadius: '1rem', textDecoration: 'none',
                        background: 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.35)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                        transition: 'all 0.25s', cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,255,255,0.15)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,255,255,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,255,255,0.08)'
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <Download size={22} style={{ color: 'var(--cyan)' }} />
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 700 }}>{platform.label}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 600 }}>{tx.standaloneDownload} · {platform.size}</span>
                    </a>
                  ) : (
                    <button
                      key={platform.id}
                      onClick={() => setTab('source')}
                      style={{
                        padding: '1.25rem 1rem', borderRadius: '1rem',
                        background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.15)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.25s',
                        textAlign: 'center', width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,255,255,0.03)'
                        e.currentTarget.style.borderColor = 'rgba(0,255,255,0.3)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                        e.currentTarget.style.transform = 'none'
                      }}
                    >
                      <Terminal size={22} style={{ color: 'var(--magenta)', opacity: 0.8 }} />
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 700 }}>{platform.label}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tx.standaloneComingSoon}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--cyan)', marginTop: '0.25rem', fontWeight: 600, textDecoration: 'underline' }}>{tx.standaloneClickToInstall}</span>
                    </button>
                  )
                ))}
              </div>

              <div style={{
                marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '0.75rem', padding: '1rem'
              }}>
                <AlertTriangle size={16} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>
                  {tx.standaloneNotAvailable}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="source-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '1.75rem', top: '2rem', bottom: '2rem',
                width: '1px', background: 'linear-gradient(to bottom, rgba(0,255,255,0.3), rgba(124,58,237,0.3), rgba(255,0,255,0.1))',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="timeline-row"
                    style={{ display: 'flex', gap: '1.5rem' }}
                  >
                    <div style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
                      <div className="font-orbitron timeline-num" style={{
                        width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '0.75rem',
                        background: 'rgba(5,5,8,0.95)', border: '1px solid rgba(0,255,255,0.3)',
                        boxShadow: '0 0 15px rgba(0,255,255,0.1)', color: 'var(--cyan)',
                      }}>
                        {step.num}
                      </div>
                    </div>

                    <div style={{
                      flex: 1, minWidth: 0, overflow: 'hidden',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,255,0.1)',
                      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                      borderRadius: '1rem', padding: '1.5rem', paddingBottom: '2rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <step.icon size={15} style={{ color: 'var(--cyan)' }} />
                        <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{step.title}</h3>
                      </div>
                      {step.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="installation" className="section-pad grid-bg" style={{ position: 'relative', overflow: 'hidden', background: '#080810' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(0,255,255,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
