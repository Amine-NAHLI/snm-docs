import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Maximize2, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import { useSpotlight } from '../hooks/useSpotlight'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
}

function GalleryCard({ title, desc, imgFile, i, inView, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const spotlight = useSpotlight()
  const imgSrc = `${import.meta.env.BASE_URL}screenshots/${imgFile}`

  return (
    <motion.div
      variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? 'show' : 'hidden'}
      onMouseEnter={() => setHovered(true)} onMouseMove={spotlight.onMouseMove}
      onMouseLeave={(e) => { setHovered(false); spotlight.onMouseLeave(e) }}
      onClick={() => onOpen(imgSrc, title)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(236,72,153,0.5)' : 'rgba(236,72,153,0.2)'}`,
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem', overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 0 30px rgba(236,72,153,0.18)` : 'none',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <img 
          src={imgSrc} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0.8, transition: 'opacity 0.3s, transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} 
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div style={{
          position: 'absolute', inset: 0, display: 'none', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', gap: '0.5rem'
        }}>
          <ImageIcon size={32} />
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>Missing: public/screenshots/{imgFile}</span>
        </div>
        
        {hovered && (
          <div style={{
            position: 'absolute', top: '0.5rem', right: '0.5rem',
            background: 'rgba(0,0,0,0.6)', padding: '0.375rem', borderRadius: '0.5rem',
            backdropFilter: 'blur(4px)', color: '#ec4899'
          }}>
            <Maximize2 size={16} />
          </div>
        )}
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 className="font-orbitron" style={{ color: '#ec4899', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Gallery({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLang()
  const tx = t[lang].gallery
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImg, setModalImg] = useState({ src: '', title: '' })

  const CARDS = [
    { title: tx.c1t, desc: tx.c1d, imgFile: 'gui-main.png' },
    { title: tx.c2t, desc: tx.c2d, imgFile: 'gui-scan.png' },
    { title: tx.c3t, desc: tx.c3d, imgFile: 'cli-terminal.png' },
    { title: tx.c4t, desc: tx.c4d, imgFile: 'report-html.png' },
  ]

  const openModal = (src, title) => {
    setModalImg({ src, title })
    setModalOpen(true)
  }

  const content = (
    <div style={isEmbed ? {} : { maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }} ref={ref}>
      {!isEmbed && (
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(236,72,153,0.2)', background: 'rgba(236,72,153,0.04)',
            color: '#ec4899', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <ImageIcon size={13} /> GALLERY
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7 }}>
            {tx.subtitle}
          </p>
        </motion.div>
      )}

      {isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(236,72,153,0.2)', background: 'rgba(236,72,153,0.04)',
            color: '#ec4899', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <ImageIcon size={13} /> GALLERY
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{tx.title}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{tx.subtitle}</p>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {CARDS.map((c, i) => (
          <GalleryCard key={i} title={c.title} desc={c.desc} imgFile={c.imgFile} i={i} inView={inView} onOpen={openModal} />
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '2rem'
            }}
            onClick={() => setModalOpen(false)}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer', color: 'white' }}>
              <X size={32} />
            </div>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={modalImg.src} alt={modalImg.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '0.5rem', boxShadow: '0 0 50px rgba(236,72,153,0.2)' }}
              onClick={(e) => e.stopPropagation()}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="gallery" className="section-pad grid-bg" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      {content}
    </section>
  )
}
