import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Download, Terminal, BookOpen, Send, Layers, HelpCircle, Code, Map, Image as ImageIcon, ChevronRight } from 'lucide-react'
import Installation from './Installation'
import Usage from './Usage'
import Telegram from './Telegram'
import Architecture from './Architecture'
import FAQ from './FAQ'
import Developer from './Developer'
import Roadmap from './Roadmap'
import Gallery from './Gallery'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('installation')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()

  const categories = [
    {
      title: lang === 'en' ? 'Getting Started' : 'Démarrage',
      items: [
        { id: 'installation', label: t[lang].installation.title, icon: Download },
        { id: 'usage', label: t[lang].usage.title, icon: Terminal },
        { id: 'telegram', label: t[lang].telegram.title, icon: Send },
      ]
    },
    {
      title: lang === 'en' ? 'Reference' : 'Technique',
      items: [
        { id: 'architecture', label: t[lang].architecture.title, icon: Layers },
        { id: 'developer', label: t[lang].developer.title, icon: Code },
      ]
    },
    {
      title: lang === 'en' ? 'Resources' : 'Ressources',
      items: [
        { id: 'gallery', label: t[lang].gallery.title, icon: ImageIcon },
        { id: 'roadmap', label: t[lang].roadmap.title, icon: Map },
        { id: 'faq', label: t[lang].faq.title, icon: HelpCircle },
      ]
    }
  ]

  return (
    <section id="docs" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: '#080810' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 100% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <BookOpen size={13} /> {lang === 'en' ? 'DOCUMENTATION' : 'DOCUMENTATION'}
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Get' : 'Pour'} <span className="gradient-text">{t[lang].hero.btnStart}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '36rem', margin: '0 auto' }}>
            {lang === 'en'
              ? 'Everything you need to set up and master the Smart Network Mapper suite.'
              : 'Tout ce qu\'il vous faut pour installer et maîtriser la suite Smart Network Mapper.'}
          </p>
        </motion.div>

        {/* Documentation Layout: Sidebar + Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="md-flex-row">
          
          {/* Style hack for media query since inline styles don't support it directly */}
          <style dangerouslySetInnerHTML={{__html: `
            .md-flex-row { flex-direction: column; }
            .sidebar-sticky { position: static; }
            .content-area { min-height: 500px; }
            @media (min-width: 768px) {
              .md-flex-row { flex-direction: row !important; }
              .sidebar-sticky { position: sticky !important; top: 6rem; height: calc(100vh - 8rem); overflow-y: auto; }
              .content-area { padding-left: 2rem; border-left: 1px solid rgba(255,255,255,0.05); }
            }
            .sidebar-scrollbar::-webkit-scrollbar { width: 4px; }
            .sidebar-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .sidebar-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,255,255,0.2); border-radius: 4px; }
          `}} />

          {/* Left Sidebar */}
          <div style={{ width: '100%', maxWidth: '260px', flexShrink: 0 }} className="sidebar-sticky sidebar-scrollbar">
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {categories.map((cat, idx) => (
                <div key={idx}>
                  <h4 className="font-orbitron" style={{
                    fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem',
                    paddingLeft: '0.5rem'
                  }}>
                    {cat.title}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {cat.items.map((tab) => {
                      const Icon = tab.icon
                      const isActive = activeTab === tab.id
                      return (
                        <li key={tab.id}>
                          <button
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '0.625rem 0.75rem', borderRadius: '0.5rem',
                              border: 'none', cursor: 'pointer', textAlign: 'left',
                              background: isActive ? 'rgba(0,255,255,0.08)' : 'transparent',
                              color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)' }}
                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                              <Icon size={16} style={{ color: isActive ? 'var(--cyan)' : 'var(--text-muted)' }} />
                              <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
                            </div>
                            {isActive && <ChevronRight size={14} />}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Main Content */}
          <div style={{ flex: 1, minWidth: 0 }} className="content-area">
            <AnimatePresence mode="wait">
              {activeTab === 'installation' && (
                <motion.div key="install" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Installation isEmbed />
                </motion.div>
              )}
              {activeTab === 'usage' && (
                <motion.div key="usage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Usage isEmbed />
                </motion.div>
              )}
              {activeTab === 'telegram' && (
                <motion.div key="telegram" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Telegram isEmbed />
                </motion.div>
              )}
              {activeTab === 'architecture' && (
                <motion.div key="architecture" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Architecture isEmbed />
                </motion.div>
              )}
              {activeTab === 'gallery' && (
                <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Gallery isEmbed />
                </motion.div>
              )}
              {activeTab === 'developer' && (
                <motion.div key="developer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Developer isEmbed />
                </motion.div>
              )}
              {activeTab === 'roadmap' && (
                <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Roadmap isEmbed />
                </motion.div>
              )}
              {activeTab === 'faq' && (
                <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <FAQ isEmbed />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  )
}
