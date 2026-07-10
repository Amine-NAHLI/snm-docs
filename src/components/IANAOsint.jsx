import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, Globe, Shield, RefreshCw, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function IANAOsint({ isEmbed = false }) {
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
            border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.04)',
            color: '#00ffff', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Database size={13} /> OSINT
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{lang === 'en' ? 'IANA & OSINT' : 'IANA & OSINT'}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}>
            {lang === 'en'
              ? 'Data sources powering SNM: IANA port registry, NVD vulnerability database, and Groq AI inference API.'
              : 'Sources de données alimentant SNM : registre ports IANA, base vulnérabilités NVD et API inférence IA Groq.'}
          </p>
        </motion.div>
      )}

      {/* Data Sources */}
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
          {lang === 'en' ? 'PRIMARY DATA SOURCES' : 'SOURCES DE DONNÉES PRIMAIRES'}
        </h3>

        <div className="grid-auto-2" style={{ gap: '1.5rem' }}>
          {[
            {
              title: lang === 'en' ? 'IANA Service Registry' : 'Registre Services IANA',
              icon: Globe,
              color: '#00ffff',
              desc: lang === 'en'
                ? 'Official port-to-service mappings from Internet Assigned Numbers Authority. 15,000+ entries covering TCP/UDP/SCTP protocols.'
                : 'Mappings port-service officiels de l\'Internet Assigned Numbers Authority. 15,000+ entrées couvrant protocoles TCP/UDP/SCTP.',
              stats: [
                { label: lang === 'en' ? 'Total Ports' : 'Ports Totaux', value: '15,000+' },
                { label: lang === 'en' ? 'Update Freq' : 'Fréq. MAJ', value: lang === 'en' ? 'Weekly' : 'Hebdo' },
                { label: lang === 'en' ? 'Cache TTL' : 'Cache TTL', value: '7 days' },
              ],
              url: 'https://www.iana.org/assignments/service-names-port-numbers/',
            },
            {
              title: lang === 'en' ? 'NVD CVE Database' : 'Base CVE NVD',
              icon: Shield,
              color: '#ff0066',
              desc: lang === 'en'
                ? 'National Vulnerability Database with 2.3M+ CVE entries. REST API v2.0 for enriching scan results with known exploits.'
                : 'National Vulnerability Database avec 2.3M+ entrées CVE. REST API v2.0 pour enrichir résultats scan avec exploits connus.',
              stats: [
                { label: lang === 'en' ? 'CVE Records' : 'Enregistrements CVE', value: '2.3M+' },
                { label: lang === 'en' ? 'Rate Limit' : 'Rate Limit', value: '50 req/30s' },
                { label: lang === 'en' ? 'Cache TTL' : 'Cache TTL', value: '24h' },
              ],
              url: 'https://nvd.nist.gov/developers/vulnerabilities',
            },
            {
              title: lang === 'en' ? 'Groq AI API' : 'API IA Groq',
              icon: Database,
              color: '#7c3aed',
              desc: lang === 'en'
                ? 'Lightning-fast LLM inference (llama-3.3-70b-versatile) for AI-powered threat analysis and markdown report generation.'
                : 'Inférence LLM ultra-rapide (llama-3.3-70b-versatile) pour analyse IA menaces et génération rapports markdown.',
              stats: [
                { label: lang === 'en' ? 'Model' : 'Modèle', value: 'LLaMA 3.3 70B' },
                { label: lang === 'en' ? 'Speed' : 'Vitesse', value: '~750 tok/s' },
                { label: lang === 'en' ? 'Context' : 'Contexte', value: '128k tokens' },
              ],
              url: 'https://console.groq.com/docs/api-reference',
            },
          ].map((source, i) => {
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
                  border: `1px solid ${hovered ? source.color + '35' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '1rem', padding: '1.75rem',
                  transition: 'all 0.3s',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered ? `0 8px 30px ${source.color}15` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${source.color}12`, border: `1px solid ${source.color}28`,
                  }}>
                    <source.icon size={18} style={{ color: source.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {source.title}
                    </h4>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: source.color, opacity: 0.7, transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {source.desc}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {source.stats.map((stat, j) => (
                    <div key={j} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem',
                        color: source.color, marginBottom: '0.25rem',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Data Flow Architecture */}
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
          {lang === 'en' ? 'DATA FLOW PIPELINE' : 'PIPELINE DE FLUX DE DONNÉES'}
        </h3>

        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,255,255,0.12)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '2rem',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { label: lang === 'en' ? 'Port Scan' : 'Scan Port', icon: '🔍', color: '#00ffff' },
              { label: lang === 'en' ? 'IANA Lookup' : 'Lookup IANA', icon: '📡', color: '#7c3aed' },
              { label: lang === 'en' ? 'NVD Query' : 'Requête NVD', icon: '🛡️', color: '#ff0066' },
              { label: lang === 'en' ? 'AI Prediction' : 'Prédiction IA', icon: '🤖', color: '#10b981' },
              { label: lang === 'en' ? 'Groq Report' : 'Rapport Groq', icon: '📊', color: '#f59e0b' },
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
                      borderRadius: '0.875rem', padding: '1rem 1.25rem', textAlign: 'center',
                      minWidth: '120px', transition: 'all 0.3s',
                      boxShadow: hovered ? `0 0 20px ${step.color}18` : 'none',
                    }}
                  >
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{step.icon}</div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {step.label}
                    </p>
                  </motion.div>
                  {i < 4 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>→</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Caching Strategy */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <RefreshCw size={20} style={{ color: '#10b981' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
              {lang === 'en' ? 'Caching & Rate Limiting' : 'Caching & Rate Limiting'}
            </h3>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                source: 'IANA Registry',
                strategy: lang === 'en' ? 'Local SQLite cache (7-day TTL)' : 'Cache SQLite local (TTL 7j)',
                limit: lang === 'en' ? 'No rate limit (local)' : 'Pas de rate limit (local)',
                color: '#00ffff',
              },
              {
                source: 'NVD API',
                strategy: lang === 'en' ? 'Redis cache (24h TTL) + retry with backoff' : 'Cache Redis (TTL 24h) + retry avec backoff',
                limit: '50 requests / 30 seconds',
                color: '#ff0066',
              },
              {
                source: 'Groq API',
                strategy: lang === 'en' ? 'No cache (real-time analysis)' : 'Pas de cache (analyse temps réel)',
                limit: lang === 'en' ? '30 req/min (free tier)' : '30 req/min (tier gratuit)',
                color: '#7c3aed',
              },
            ].map((cache, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.02)', border: `1px solid ${cache.color}18`,
                borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center',
              }}>
                <div style={{
                  width: '0.375rem', height: '3rem', borderRadius: '9999px',
                  background: cache.color, boxShadow: `0 0 10px ${cache.color}50`,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {cache.source}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.375rem' }}>
                    <span style={{ color: cache.color, fontWeight: 600 }}>
                      {lang === 'en' ? 'Strategy:' : 'Stratégie :'}
                    </span> {cache.strategy}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <span style={{ color: cache.color, fontWeight: 600 }}>
                      {lang === 'en' ? 'Limit:' : 'Limite :'}
                    </span> {cache.limit}
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
    <section id="iana-osint" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,255,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
