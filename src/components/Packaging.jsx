import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, Download, Container, Upload, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Packaging({ isEmbed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { lang } = useLang()

  const content = (
    <div ref={ref} style={isEmbed ? {} : { maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {!isEmbed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '9999px',
            border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)',
            color: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Package size={13} /> PACKAGING
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{lang === 'en' ? 'Build & Release' : 'Build & Release'}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}>
            {lang === 'en'
              ? 'Multi-platform packaging with PyInstaller, Docker containers, and automated Hugging Face releases.'
              : 'Packaging multi-plateforme avec PyInstaller, conteneurs Docker et releases automatisées Hugging Face.'}
          </p>
        </motion.div>
      )}

      {/* Build Methods */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ marginBottom: '3rem' }}
      >
        <h3 style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
          color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem',
          textTransform: 'uppercase',
        }}>
          {lang === 'en' ? 'BUILD METHODS' : 'MÉTHODES DE BUILD'}
        </h3>

        <div className="grid-auto-2" style={{ gap: '1.5rem' }}>
          {[
            {
              title: lang === 'en' ? 'Windows Portable (PyInstaller)' : 'Windows Portable (PyInstaller)',
              icon: Download,
              color: '#00ffff',
              desc: lang === 'en'
                ? 'Single-file executable with bundled Python runtime and dependencies. No installation required.'
                : 'Exécutable fichier unique avec runtime Python et dépendances embarqués. Aucune installation requise.',
              commands: [
                'build_tools\\build.bat',
                'pyinstaller --clean build_tools\\build.spec',
                'Output: dist\\SNM.exe (~150 MB)',
              ],
              features: [
                lang === 'en' ? '✓ UPX compression enabled' : '✓ Compression UPX activée',
                lang === 'en' ? '✓ Console hidden by default' : '✓ Console cachée par défaut',
                lang === 'en' ? '✓ Models pre-bundled' : '✓ Modèles pré-embarqués',
              ],
            },
            {
              title: lang === 'en' ? 'Docker Container' : 'Conteneur Docker',
              icon: Container,
              color: '#7c3aed',
              desc: lang === 'en'
                ? 'Lightweight Alpine-based image with CLI mode for automated pipelines and microservices.'
                : 'Image légère basée Alpine avec mode CLI pour pipelines automatisés et microservices.',
              commands: [
                'docker build -t snm:latest .',
                'docker run --net=host snm:latest --target 192.168.1.0/24',
                'Image size: ~320 MB',
              ],
              features: [
                lang === 'en' ? '✓ Alpine Linux 3.19' : '✓ Alpine Linux 3.19',
                lang === 'en' ? '✓ Non-root user execution' : '✓ Exécution utilisateur non-root',
                lang === 'en' ? '✓ Volume mounts for outputs' : '✓ Montages volumes pour sorties',
              ],
            },
            {
              title: lang === 'en' ? 'Source Distribution (pip)' : 'Distribution Source (pip)',
              icon: Package,
              color: '#10b981',
              desc: lang === 'en'
                ? 'Python package for developers. Editable install for contribution and customization.'
                : 'Package Python pour développeurs. Installation éditable pour contribution et customisation.',
              commands: [
                'git clone https://github.com/Amine-NAHLI/smart-network-mapper',
                'pip install -e .',
                'python cli/main.py --version',
              ],
              features: [
                lang === 'en' ? '✓ Python 3.10+ required' : '✓ Python 3.10+ requis',
                lang === 'en' ? '✓ Virtual env recommended' : '✓ Env virtuel recommandé',
                lang === 'en' ? '✓ Dev dependencies included' : '✓ Dépendances dev incluses',
              ],
            },
          ].map((method, i) => {
            const [hovered, setHovered] = useState(false)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hovered ? method.color + '35' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '1rem', padding: '1.75rem',
                  transition: 'all 0.3s',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered ? `0 8px 30px ${method.color}15` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${method.color}12`, border: `1px solid ${method.color}28`,
                  }}>
                    <method.icon size={18} style={{ color: method.color }} />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, flex: 1 }}>
                    {method.title}
                  </h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {method.desc}
                </p>

                <div style={{
                  background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem',
                  padding: '1rem', border: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: '1rem',
                }}>
                  {method.commands.map((cmd, j) => (
                    <div key={j} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      color: method.color, opacity: 0.85, marginBottom: j < method.commands.length - 1 ? '0.5rem' : 0,
                    }}>
                      {cmd.startsWith('Output:') || cmd.startsWith('Image size:') ? (
                        <span style={{ color: 'var(--text-muted)' }}>{cmd}</span>
                      ) : (
                        <><span style={{ color: 'var(--text-muted)' }}>$</span> {cmd}</>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {method.features.map((feature, j) => (
                    <div key={j} style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Release Process */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ marginBottom: '3rem' }}
      >
        <h3 style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
          color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem',
          textTransform: 'uppercase',
        }}>
          {lang === 'en' ? 'AUTOMATED RELEASE PIPELINE' : 'PIPELINE DE RELEASE AUTOMATISÉ'}
        </h3>

        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(245,158,11,0.12)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '2rem',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { label: lang === 'en' ? 'Build' : 'Build', desc: 'PyInstaller', color: '#00ffff' },
              { label: lang === 'en' ? 'Package' : 'Package', desc: 'package_release.bat', color: '#7c3aed' },
              { label: lang === 'en' ? 'Upload HF' : 'Upload HF', desc: 'Hugging Face', color: '#f59e0b' },
              { label: lang === 'en' ? 'Tag Release' : 'Tag Release', desc: 'GitHub v1.x.x', color: '#10b981' },
            ].map((step, i) => {
              const [hovered, setHovered] = useState(false)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${hovered ? step.color + '50' : step.color + '28'}`,
                      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                      borderRadius: '0.875rem', padding: '1.25rem', textAlign: 'center',
                      minWidth: '140px', transition: 'all 0.3s',
                      boxShadow: hovered ? `0 0 20px ${step.color}18` : 'none',
                    }}
                  >
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.375rem' }}>
                      {step.label}
                    </p>
                    <p style={{ color: step.color, fontSize: '0.7rem', fontFamily: 'var(--font-mono)', opacity: 0.75 }}>
                      {step.desc}
                    </p>
                  </motion.div>
                  {i < 3 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>→</span>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{
            marginTop: '2rem', background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.75rem',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Upload size={18} style={{ color: '#f59e0b' }} />
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                {lang === 'en' ? 'Hugging Face Distribution' : 'Distribution Hugging Face'}
              </h4>
              <a
                href="https://huggingface.co/Amine-NAHLI/SNM"
                target="_blank"
                rel="noreferrer"
                style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.75rem', color: '#f59e0b', textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                View on HF <ExternalLink size={11} />
              </a>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              {lang === 'en'
                ? 'Windows portable releases are automatically uploaded to Hugging Face repository using upload_windows_release.py script with HF API token authentication.'
                : 'Les releases Windows portables sont automatiquement uploadées sur le dépôt Hugging Face via le script upload_windows_release.py avec authentification token API HF.'}
            </p>
            <div style={{
              background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem',
              padding: '0.875rem', border: '1px solid rgba(245,158,11,0.15)',
            }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f59e0b' }}>
                python build_tools/upload_windows_release.py --version 1.0.0
              </code>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dependencies */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '2rem',
        }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '1.25rem' }}>
            {lang === 'en' ? 'Core Dependencies' : 'Dépendances Principales'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.875rem' }}>
            {[
              { pkg: 'scapy', ver: '2.5.0+', desc: lang === 'en' ? 'Packet manipulation' : 'Manipulation paquets' },
              { pkg: 'scikit-learn', ver: '1.3.0+', desc: lang === 'en' ? 'ML framework' : 'Framework ML' },
              { pkg: 'customtkinter', ver: '5.2.0+', desc: lang === 'en' ? 'Modern GUI' : 'GUI moderne' },
              { pkg: 'groq', ver: '0.4.0+', desc: lang === 'en' ? 'AI inference API' : 'API inférence IA' },
              { pkg: 'requests', ver: '2.31.0+', desc: lang === 'en' ? 'HTTP client' : 'Client HTTP' },
              { pkg: 'joblib', ver: '1.3.0+', desc: lang === 'en' ? 'Model persistence' : 'Persistance modèle' },
            ].map((dep, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '0.5rem', padding: '0.875rem', display: 'flex', gap: '0.75rem', alignItems: 'center',
              }}>
                <div style={{
                  width: '0.25rem', height: '2.5rem', borderRadius: '9999px',
                  background: 'linear-gradient(to bottom, #00ffff, #7c3aed)',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                    color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem',
                  }}>
                    {dep.pkg} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{dep.ver}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {dep.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="packaging" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
