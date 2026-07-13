import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileCode2, ZoomIn, Download, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function UMLDiagrams({ isEmbed = false }) {
  const { lang } = useLang()
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrls, setImageUrls] = useState({})

  // Import images using Vite's import.meta.glob
  useEffect(() => {
    const loadImages = async () => {
      const images = import.meta.glob('/public/docs/*.png', { eager: true, as: 'url' })
      const urls = {}
      
      Object.entries(images).forEach(([path, url]) => {
        const filename = path.split('/').pop()
        urls[filename] = url
      })
      
      setImageUrls(urls)
    }
    
    loadImages()
  }, [])

  const diagrams = [
    {
      id: 'architecture',
      title: lang === 'en' ? 'Global Architecture' : 'Architecture Globale',
      titleFr: 'Diagramme d\'Architecture Globale',
      file: 'Diagramme d\'Architecture Globale.png',
      description: lang === 'en' 
        ? 'Complete system architecture showing all modules and their interactions'
        : 'Architecture système complète montrant tous les modules et leurs interactions'
    },
    {
      id: 'usecase',
      title: lang === 'en' ? 'Use Case Diagram' : 'Diagramme de Cas d\'Utilisation',
      titleFr: 'Diagramme de Cas d\'Utilisation UML',
      file: 'Diagramme de Cas d\'Utilisation UML.png',
      description: lang === 'en'
        ? 'UML use case diagram showing user interactions and system functionalities'
        : 'Diagramme UML des cas d\'utilisation montrant les interactions utilisateur et fonctionnalités système'
    },
    {
      id: 'class',
      title: lang === 'en' ? 'Class Diagram' : 'Diagramme de Classes',
      titleFr: 'Diagramme de Classes UML',
      file: 'Diagramme de Classes UML.png',
      description: lang === 'en'
        ? 'UML class diagram with object-oriented design and relationships'
        : 'Diagramme UML des classes avec conception orientée objet et relations'
    },
    {
      id: 'deployment',
      title: lang === 'en' ? 'Deployment Diagram' : 'Diagramme de Déploiement',
      titleFr: 'Diagramme de Déploiement',
      file: 'Diagramme de Déploiement.png',
      description: lang === 'en'
        ? 'Physical deployment architecture showing infrastructure components'
        : 'Architecture de déploiement physique montrant les composants d\'infrastructure'
    },
    {
      id: 'sequence',
      title: lang === 'en' ? 'Scanner Sequence Diagram' : 'Diagramme de Séquence du Scanner',
      titleFr: 'Diagramme de Séquence du Scanner',
      file: 'Diagramme de Séquence du Scanner.png',
      description: lang === 'en'
        ? 'UML sequence diagram showing scanner workflow and interactions'
        : 'Diagramme UML de séquence montrant le workflow du scanner et les interactions'
    },
    {
      id: 'database',
      title: lang === 'en' ? 'Database Entity-Relation' : 'Base de Données Entité-Relation',
      titleFr: 'Diagramme Entité-Relation de la Base de Données',
      file: 'Diagramme Entité-Relation de la Base de Données.png',
      description: lang === 'en'
        ? 'Entity-relationship diagram showing database schema and relationships'
        : 'Diagramme entité-relation montrant le schéma de base de données et les relations'
    }
  ]

  const getImageUrl = (file) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return imageUrls[file] || `${cleanBaseUrl}docs/${file}`;
  }

  const handleDownload = (file, title) => {
    const url = getImageUrl(file)
    const link = document.createElement('a')
    link.href = url
    link.download = file
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem', borderRadius: '9999px',
              border: '1px solid rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.04)',
              color: 'var(--purple)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              marginBottom: '1.5rem', letterSpacing: '0.12em',
            }}>
              <FileCode2 size={13} /> {lang === 'en' ? 'UML DIAGRAMS' : 'DIAGRAMMES UML'}
            </div>
            <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {lang === 'en' ? 'System ' : 'Diagrammes '}<span className="gradient-text">{lang === 'en' ? 'Diagrams' : 'UML'}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '36rem', margin: '0 auto' }}>
              {lang === 'en'
                ? 'Complete technical documentation with UML diagrams, architecture, and database schema.'
                : 'Documentation technique complète avec diagrammes UML, architecture et schéma de base de données.'}
            </p>
          </motion.div>
        )}

        {/* Diagrams Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginTop: isEmbed ? '2rem' : 0
        }}>
          {diagrams.map((diagram, idx) => (
            <motion.div
              key={diagram.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Image Preview */}
              <div 
                onClick={() => setSelectedImage(diagram)}
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.3)',
                  marginBottom: '1rem',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {getImageUrl(diagram.file) ? (
                  <>
                    <img
                      src={getImageUrl(diagram.file)}
                      alt={diagram.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.3s'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        const errorDiv = document.createElement('div')
                        errorDiv.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.85rem;padding:1rem;text-align:center;'
                        errorDiv.textContent = `Image: ${diagram.file}`
                        e.target.parentElement.appendChild(errorDiv)
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(0,0,0,0.7)',
                      padding: '0.75rem',
                      borderRadius: '50%',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      pointerEvents: 'none'
                    }}
                    className="zoom-icon">
                      <ZoomIn size={20} color="white" />
                    </div>
                  </>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    Loading...
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-orbitron" style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                {diagram.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                {diagram.description}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setSelectedImage(diagram)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: '0.5rem',
                    color: 'var(--purple)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.1)'
                  }}
                >
                  <ZoomIn size={14} />
                  {lang === 'en' ? 'View' : 'Voir'}
                </button>
                <button
                  onClick={() => handleDownload(diagram.file, diagram.title)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(0,255,255,0.1)',
                    border: '1px solid rgba(0,255,255,0.3)',
                    borderRadius: '0.5rem',
                    color: 'var(--cyan)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,255,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,255,0.1)'
                  }}
                >
                  <Download size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(4px)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.2s',
                zIndex: 1000000
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }}
            >
              <X size={24} />
            </button>

            {/* Title */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 1000000
            }}>
              <h3 className="font-orbitron" style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                {selectedImage.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                {selectedImage.description}
              </p>
            </div>

            {/* Image */}
            <img
              src={getImageUrl(selectedImage.file)}
              alt={selectedImage.title}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
              }}
            />

            {/* Download Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDownload(selectedImage.file, selectedImage.title)
              }}
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '0.75rem 2rem',
                background: 'rgba(124,58,237,0.9)',
                border: '1px solid rgba(124,58,237,1)',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                zIndex: 10000
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,1)'
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.9)'
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)'
              }}
            >
              <Download size={18} />
              {lang === 'en' ? 'Download' : 'Télécharger'}
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .zoom-icon { opacity: 0; }
        div:hover .zoom-icon { opacity: 1; }
      `}} />
    </div>
  )
}
