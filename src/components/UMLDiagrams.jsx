import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileCode2, ZoomIn, Download, X, Layers, Brain, Check } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function UMLDiagrams({ isEmbed = false }) {
  const { lang } = useLang()
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [copiedId, setCopiedId] = useState(null)

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const diagrams = [
    {
      id: 'architecture-globale',
      category: 'architecture',
      badge: lang === 'en' ? 'Global Architecture' : 'Architecture Globale',
      badgeColor: '#7c3aed',
      title: lang === 'en' ? 'Global Architecture' : 'Architecture Globale',
      titleFr: "Diagramme d'Architecture Globale",
      file: 'SNM_Architecture_Globale_NB.png',
      description: lang === 'en' 
        ? 'Complete system architecture covering network discovery, OS fingerprinting, AI engine, and threat intelligence feeds.'
        : 'Architecture système globale intégrant la découverte réseau, le fingerprinting OS, le moteur IA et la threat intelligence.'
    },
    {
      id: 'architecture-composants',
      category: 'architecture',
      badge: lang === 'en' ? 'Component Architecture' : 'Architecture Composants',
      badgeColor: '#00ffff',
      title: lang === 'en' ? 'Component Architecture' : 'Architecture des Composants',
      titleFr: "Diagramme d'Architecture des Composants",
      file: 'SNM_Architecture_Composants_NB (1).png',
      description: lang === 'en'
        ? 'Modular breakdown of core software modules, data pipelines, external threat APIs, and presentation layers.'
        : 'Décomposition modulaire des modules logiciels, des pipelines de données, des APIs externes et des interfaces.'
    },
    {
      id: 'architecture-deploiement',
      category: 'architecture',
      badge: lang === 'en' ? 'Deployment' : 'Déploiement',
      badgeColor: '#ec4899',
      title: lang === 'en' ? 'Deployment Architecture' : 'Architecture de Déploiement',
      titleFr: "Diagramme de Déploiement",
      file: 'SNM_Architecture_Deploiement_NB.png',
      description: lang === 'en'
        ? 'Physical and containerized deployment infrastructure across target network hosts and Docker environments.'
        : 'Infrastructure de déploiement physique et conteneurisée sous Docker à travers les environnements réseau.'
    },
    {
      id: 'usecase',
      category: 'uml',
      badge: 'UML',
      badgeColor: '#3b82f6',
      title: lang === 'en' ? 'Use Case Diagram' : 'Diagramme des Cas d\'Utilisation',
      titleFr: 'Diagramme de Cas d\'Utilisation UML',
      file: 'SNM_Use_Case_NB.png',
      description: lang === 'en'
        ? 'UML use case diagram detailing user roles, scan configurations, automated audits, and report generation workflows.'
        : 'Diagramme UML des cas d\'utilisation détaillant les rôles, les configurations de scan, l\'audit et la génération de rapports.'
    },
    {
      id: 'sequence-scan',
      category: 'uml',
      badge: lang === 'en' ? 'Sequence' : 'Séquence',
      badgeColor: '#06b6d4',
      title: lang === 'en' ? 'Scanner Sequence Diagram' : 'Diagramme de Séquence du Scanner',
      titleFr: 'Diagramme de Séquence du Scanner',
      file: 'SNM_Sequence_Scan_NB.png',
      description: lang === 'en'
        ? 'Step-by-step chronology of ARP host discovery, multi-threaded TCP/UDP port probing, banner extraction, and vulnerability prediction.'
        : 'Chronologie étape par étape de la découverte ARP, du sondage de ports TCP/UDP, de l\'extraction de bannière et de la prédiction CVE.'
    },
    {
      id: 'pipeline-vulnerabilites',
      category: 'pipeline',
      badge: lang === 'en' ? 'Vulnerability Pipeline' : 'Pipeline Vulnérabilités',
      badgeColor: '#f59e0b',
      title: lang === 'en' ? 'Vulnerability Analysis Pipeline' : 'Pipeline des Vulnérabilités',
      titleFr: 'Pipeline de Détection des Vulnérabilités',
      file: 'Pipeline_Vulnerabilites_NB (1).png',
      description: lang === 'en'
        ? 'End-to-end vulnerability intelligence processing pipeline from banner normalization to Random Forest scoring and CVSS classification.'
        : 'Pipeline complet de traitement des vulnérabilités, de la normalisation des bannières à la prédiction Random Forest et scoring CVSS.'
    },
    {
      id: 'wisdom-layer-pipeline',
      category: 'pipeline',
      badge: 'Wisdom Layer',
      badgeColor: '#10b981',
      title: lang === 'en' ? 'Wisdom Layer Pipeline' : 'Pipeline Wisdom Layer',
      titleFr: 'Pipeline de Décision Wisdom Layer',
      file: 'Wisdom_Layer_Pipeline_NB.png',
      description: lang === 'en'
        ? 'Heuristic decision engine combining real-time OSV vulnerability databases and EndOfLife metadata to eliminate false positives.'
        : 'Moteur décisionnel heuristique croisant les flux temps réel OSV et les métadonnées EndOfLife pour éliminer les faux positifs.'
    }
  ]

  const categories = [
    { id: 'all', label: lang === 'en' ? 'All Diagrams' : 'Tous les Diagrammes', count: diagrams.length },
    { id: 'architecture', label: lang === 'en' ? 'Architecture' : 'Architecture', count: diagrams.filter(d => d.category === 'architecture').length },
    { id: 'uml', label: lang === 'en' ? 'UML & Sequence' : 'UML & Séquence', count: diagrams.filter(d => d.category === 'uml').length },
    { id: 'pipeline', label: lang === 'en' ? 'AI Pipelines' : 'Pipelines IA', count: diagrams.filter(d => d.category === 'pipeline').length },
  ]

  const filteredDiagrams = activeFilter === 'all'
    ? diagrams
    : diagrams.filter(d => d.category === activeFilter)

  const getImageUrl = (file) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBaseUrl}docs/${encodeURIComponent(file)}`;
  }

  const handleDownload = (file, title) => {
    const url = getImageUrl(file)
    const link = document.createElement('a')
    link.href = url
    link.download = file
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setCopiedId(file)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div style={{ 
      ...(isEmbed ? {} : { 
        minHeight: '100vh', 
        paddingTop: '6rem', 
        paddingBottom: '4rem',
        background: 'transparent'
      })
    }}>
      <div style={{ maxWidth: isEmbed ? '100%' : '80rem', margin: '0 auto', padding: isEmbed ? 0 : '0 2rem' }}>
        
        {/* Header */}
        {!isEmbed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem', borderRadius: '9999px',
              border: '1px solid rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.04)',
              color: 'var(--purple)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              marginBottom: '1.5rem', letterSpacing: '0.12em',
            }}>
              <FileCode2 size={13} /> {lang === 'en' ? 'ARCHITECTURE & UML' : 'ARCHITECTURE & DIAGRAMMES'}
            </div>
            <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {lang === 'en' ? 'System ' : 'Diagrammes '}<span className="gradient-text">{lang === 'en' ? 'Diagrams' : 'Système & UML'}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '38rem', margin: '0 auto', fontSize: '0.925rem', lineHeight: 1.65 }}>
              {lang === 'en'
                ? 'High-resolution architecture blueprints, UML sequence models, and machine learning pipeline specifications.'
                : 'Schémas d\'architecture haute résolution, modélisations UML de séquence et spécifications des pipelines IA.'}
            </p>
          </motion.div>
        )}

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: isEmbed ? 'flex-start' : 'center',
          marginBottom: '2rem',
        }}>
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: isActive
                    ? '1px solid rgba(0, 255, 255, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isActive
                    ? 'rgba(0, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 0 15px rgba(0, 255, 255, 0.15)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.675rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                }}>
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Diagrams Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredDiagrams.map((diagram, idx) => (
              <motion.div
                key={diagram.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3), 0 0 20px rgba(124,58,237,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Image Preview Container (Clean white backdrop for high-res black & white diagram readability) */}
                <div 
                  onClick={() => setSelectedImage(diagram)}
                  style={{
                    width: '100%',
                    height: '210px',
                    borderRadius: '0.625rem',
                    overflow: 'hidden',
                    background: '#ffffff',
                    marginBottom: '1.125rem',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="diagram-thumb-wrap"
                >
                  <img
                    src={getImageUrl(diagram.file)}
                    alt={diagram.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.35s ease',
                    }}
                    className="diagram-img"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const errorDiv = document.createElement('div')
                      errorDiv.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;color:#64748b;font-size:0.8rem;padding:1rem;text-align:center;font-family:var(--font-mono);'
                      errorDiv.textContent = `Image: ${diagram.file}`
                      e.target.parentElement.appendChild(errorDiv)
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15, 23, 42, 0.45)',
                      backdropFilter: 'blur(2px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.25s',
                      pointerEvents: 'none',
                    }}
                    className="zoom-overlay"
                  >
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.75)',
                      border: '1px solid rgba(0, 255, 255, 0.5)',
                      padding: '0.6rem 1rem',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--cyan)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    }}>
                      <ZoomIn size={15} />
                      <span>{lang === 'en' ? 'Click to Enlarge' : 'Agrandir le diagramme'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Top: Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.675rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    background: `${diagram.badgeColor}15`,
                    color: diagram.badgeColor,
                    border: `1px solid ${diagram.badgeColor}35`,
                  }}>
                    {diagram.badge}
                  </span>
                  <span style={{
                    fontSize: '0.675rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    PNG • 4K UHD
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-orbitron" style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.35,
                }}>
                  {diagram.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem',
                  flex: 1,
                }}>
                  {diagram.description}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <button
                    onClick={() => setSelectedImage(diagram)}
                    style={{
                      flex: 1,
                      padding: '0.55rem 1rem',
                      background: 'rgba(124,58,237,0.12)',
                      border: '1px solid rgba(124,58,237,0.3)',
                      borderRadius: '0.5rem',
                      color: 'var(--purple)',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.22)'
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.12)'
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
                    }}
                  >
                    <ZoomIn size={14} />
                    {lang === 'en' ? 'View Diagram' : 'Consulter'}
                  </button>
                  <button
                    onClick={() => handleDownload(diagram.file, diagram.title)}
                    title={lang === 'en' ? 'Download high-resolution image' : 'Télécharger l\'image haute résolution'}
                    style={{
                      padding: '0.55rem 0.9rem',
                      background: copiedId === diagram.file ? 'rgba(16,185,129,0.2)' : 'rgba(0,255,255,0.1)',
                      border: copiedId === diagram.file ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '0.5rem',
                      color: copiedId === diagram.file ? 'var(--emerald)' : 'var(--cyan)',
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (copiedId !== diagram.file) {
                        e.currentTarget.style.background = 'rgba(0,255,255,0.2)'
                        e.currentTarget.style.borderColor = 'rgba(0,255,255,0.5)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (copiedId !== diagram.file) {
                        e.currentTarget.style.background = 'rgba(0,255,255,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(0,255,255,0.3)'
                      }
                    }}
                  >
                    {copiedId === diagram.file ? <Check size={14} /> : <Download size={14} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 7, 15, 0.94)',
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Modal Top Bar */}
              <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '78rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  zIndex: 1000000,
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    background: `${selectedImage.badgeColor}20`,
                    border: `1px solid ${selectedImage.badgeColor}45`,
                    color: selectedImage.badgeColor,
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}>
                    {selectedImage.badge}
                  </div>
                  <h3 className="font-orbitron" style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                  }}>
                    {selectedImage.title}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: '45rem',
                    marginTop: '0.25rem',
                    marginBottom: 0,
                  }}>
                    {selectedImage.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
                  <button
                    onClick={() => handleDownload(selectedImage.file, selectedImage.title)}
                    style={{
                      padding: '0.55rem 1.15rem',
                      background: 'rgba(0,255,255,0.15)',
                      border: '1px solid rgba(0,255,255,0.4)',
                      borderRadius: '0.5rem',
                      color: 'var(--cyan)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,255,255,0.25)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,255,255,0.15)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <Download size={15} />
                    {lang === 'en' ? 'Download 4K' : 'Télécharger 4K'}
                  </button>

                  <button
                    onClick={() => setSelectedImage(null)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Image Display (Crisp white canvas backing) */}
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '94vw',
                  maxHeight: '80vh',
                  background: '#ffffff',
                  borderRadius: '0.875rem',
                  padding: '0.75rem',
                  boxShadow: '0 25px 60px -15px rgba(0,0,0,0.85), 0 0 35px rgba(0,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={getImageUrl(selectedImage.file)}
                  alt={selectedImage.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '76vh',
                    objectFit: 'contain',
                    borderRadius: '0.5rem',
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .diagram-thumb-wrap:hover .zoom-overlay { opacity: 1 !important; }
        .diagram-thumb-wrap:hover .diagram-img { transform: scale(1.03); }
      `}} />
    </div>
  )
}
