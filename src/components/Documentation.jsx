import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Download, Terminal, BookOpen, Send, Layers, HelpCircle, Code, Map, Image as ImageIcon, ChevronRight, ChevronDown, Workflow, TestTube, Database, Package, FileCode2 } from 'lucide-react'
import Installation from './Installation'
import Usage from './Usage'
import Telegram from './Telegram'
import Architecture from './Architecture'
import FAQ from './FAQ'
import Developer from './Developer'
import N8NWorkflow from './N8NWorkflow'
import Packaging from './Packaging'
import UMLDiagrams from './UMLDiagrams'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

export default function Documentation() {
  const [activeCatIdx, setActiveCatIdx] = useState(0)
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
        { id: 'uml', label: lang === 'en' ? 'UML Diagrams' : 'Diagrammes UML', icon: FileCode2 },
        { id: 'developer', label: t[lang].developer.title, icon: Code },
        { id: 'n8n', label: lang === 'en' ? 'n8n Workflow' : 'Workflow n8n', icon: Workflow },
      ]
    },
    {
      title: lang === 'en' ? 'Data & Build' : 'Données & Build',
      items: [
        { id: 'packaging', label: lang === 'en' ? 'Build & Release' : 'Build & Release', icon: Package },
      ]
    }
  ]

  return (
    <section id="docs" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
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
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Get' : 'Pour'} <span className="gradient-text">{t[lang].hero.btnStart}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '36rem', margin: '0 auto' }}>
            {lang === 'en'
              ? 'Everything you need to set up and master the Smart Network Mapper suite.'
              : 'Tout ce qu\'il vous faut pour installer et maîtriser la suite Smart Network Mapper.'}
          </p>
        </motion.div>

        {/* Documentation Layout: Top Navigation + Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Top Navigation Lists */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Level 1: Categories (Une seule liste) */}
            <div style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center',
              background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCatIdx(idx)
                    setActiveTab(cat.items[0].id) // Auto-select first item
                  }}
                  className="font-orbitron"
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
                    fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: activeCatIdx === idx ? 'rgba(0,255,255,0.1)' : 'transparent',
                    color: activeCatIdx === idx ? 'var(--cyan)' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Style hack for media query since inline styles don't support it directly */}
          <style dangerouslySetInnerHTML={{__html: `
            .md-flex-row { flex-direction: column; }
            .sidebar-sticky { position: static; }
            .content-area { min-height: 500px; padding: 0 0.75rem; }
            @media (min-width: 768px) {
              .md-flex-row { flex-direction: row !important; }
              .sidebar-sticky { position: sticky !important; top: 6rem; height: calc(100vh - 8rem); overflow-y: auto; }
              .content-area { padding: 0 0 0 2rem; border-left: 1px solid rgba(255,255,255,0.05); }
            }
          `}} />

            {/* Level 2: Choices below (les autres choix en dessous) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCatIdx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center',
                  padding: '0 1rem'
                }}
              >
                {categories[activeCatIdx].items.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.625rem 1.25rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                        background: isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.03)',
                        color: isActive ? '#000' : 'var(--text-secondary)',
                        fontSize: '0.85rem', fontWeight: 500,
                        transition: 'all 0.2s',
                        boxShadow: isActive ? '0 4px 15px rgba(0,255,255,0.3)' : 'none'
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >
                      <Icon size={16} style={{ color: isActive ? '#000' : 'var(--text-muted)' }} />
                      {tab.label}
                    </button>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Main Content */}
          <div style={{ flex: 1, minWidth: 0, marginTop: '1rem' }} className="content-area">
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
              {activeTab === 'uml' && (
                <motion.div key="uml" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <UMLDiagrams isEmbed />
                </motion.div>
              )}
              {activeTab === 'developer' && (
                <motion.div key="developer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Developer isEmbed />
                </motion.div>
              )}
              {activeTab === 'n8n' && (
                <motion.div key="n8n" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <N8NWorkflow isEmbed />
                </motion.div>
              )}
              {activeTab === 'packaging' && (
                <motion.div key="packaging" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Packaging isEmbed />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  )
}
