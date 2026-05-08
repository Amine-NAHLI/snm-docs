import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Download, Terminal, BookOpen } from 'lucide-react'
import Installation from './Installation'
import Usage from './Usage'

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('installation')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const tabs = [
    { id: 'installation', label: 'Installation', icon: Download },
    { id: 'usage', label: 'Usage Guide', icon: Terminal },
  ]

  return (
    <section id="docs" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: '#080810' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 100% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <BookOpen size={13} /> DOCUMENTATION
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Get <span className="gradient-text">Started</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '36rem', margin: '0 auto' }}>
            Everything you need to set up and master the Smart Network Mapper suite.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', padding: '0.25rem',
            borderRadius: '1rem', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.75rem', borderRadius: '0.75rem',
                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                    border: 'none', background: 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="docTab"
                      style={{
                        position: 'absolute', inset: 0, borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, rgba(0,255,255,0.12) 0%, rgba(124,58,237,0.12) 100%)',
                        border: '1px solid rgba(0,255,255,0.25)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon size={15} style={{ position: 'relative', zIndex: 1, color: isActive ? 'var(--cyan)' : 'inherit' }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ minHeight: '500px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'installation' ? (
              <motion.div
                key="install"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
              >
                <Installation isEmbed />
              </motion.div>
            ) : (
              <motion.div
                key="usage"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <Usage isEmbed />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
