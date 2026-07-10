import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Workflow, GitBranch, Zap, Send, Database, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function N8NWorkflow({ isEmbed = false }) {
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
            border: '1px solid rgba(255,0,255,0.2)', background: 'rgba(255,0,255,0.04)',
            color: '#ff00ff', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <Workflow size={13} /> AUTOMATION
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{lang === 'en' ? 'n8n Workflow' : 'Workflow n8n'}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}>
            {lang === 'en' 
              ? 'Automate SNM scans with n8n for scheduled security audits, Telegram alerts, and SIEM integration.'
              : 'Automatisez les scans SNM avec n8n pour audits sécurité programmés, alertes Telegram et intégration SIEM.'}
          </p>
        </motion.div>
      )}

      {/* Workflow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ marginBottom: '3rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
          color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem',
          textTransform: 'uppercase',
        }}>
          {lang === 'en' ? 'WORKFLOW ARCHITECTURE' : 'ARCHITECTURE DU WORKFLOW'}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
          {[
            { icon: Zap, label: lang === 'en' ? 'Webhook Trigger' : 'Trigger Webhook', color: '#00ffff', desc: lang === 'en' ? 'HTTP POST / Cron' : 'HTTP POST / Cron' },
            { icon: GitBranch, label: lang === 'en' ? 'Execute Command' : 'Exec Commande', color: '#7c3aed', desc: 'python cli/run_scan.py' },
            { icon: Database, label: lang === 'en' ? 'Parse JSON' : 'Parse JSON', color: '#ff00ff', desc: lang === 'en' ? 'Extract results' : 'Extraire résultats' },
            { icon: Send, label: lang === 'en' ? 'Split & Send' : 'Split & Envoyer', color: '#f59e0b', desc: lang === 'en' ? 'Telegram chunks' : 'Chunks Telegram' },
            { icon: Database, label: lang === 'en' ? 'Store Results' : 'Stocker Résultats', color: '#10b981', desc: 'SQLite / SIEM' },
          ].map((step, i) => {
            const [hovered, setHovered] = useState(false)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
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
                  <div style={{
                    width: '3rem', height: '3rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${step.color}15`, border: `1px solid ${step.color}40`,
                    margin: '0 auto 0.75rem',
                  }}>
                    <step.icon size={20} style={{ color: step.color }} />
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {step.label}
                  </p>
                  <p style={{ color: step.color, fontSize: '0.65rem', fontFamily: 'var(--font-mono)', opacity: 0.75 }}>
                    {step.desc}
                  </p>
                </motion.div>
                {i < 4 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>→</span>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Use Cases */}
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
          {lang === 'en' ? 'USE CASES' : 'CAS D\'UTILISATION'}
        </h3>
        
        <div className="grid-auto-2" style={{ gap: '1.5rem' }}>
          {[
            {
              title: lang === 'en' ? 'Daily Scheduled Scan' : 'Scan Quotidien Programmé',
              desc: lang === 'en' 
                ? 'Cron trigger (daily 2 AM) → scan network → send report to Telegram → store in SQLite.'
                : 'Trigger Cron (2h du matin) → scanner réseau → envoyer rapport Telegram → stocker en SQLite.',
              color: '#00ffff',
            },
            {
              title: lang === 'en' ? 'SIEM Integration' : 'Intégration SIEM',
              desc: lang === 'en'
                ? 'Webhook from Splunk/ELK → scan target IP → parse JSON → forward to SIEM API for correlation.'
                : 'Webhook depuis Splunk/ELK → scanner IP cible → parser JSON → transférer vers API SIEM pour corrélation.',
              color: '#7c3aed',
            },
            {
              title: lang === 'en' ? 'Incident Response' : 'Réponse Incident',
              desc: lang === 'en'
                ? 'Alert trigger → immediate deep scan → AI threat analysis → notify security team via Slack/Teams.'
                : 'Alerte déclenchée → scan profond immédiat → analyse IA menaces → notifier équipe sécurité via Slack/Teams.',
              color: '#ff00ff',
            },
            {
              title: lang === 'en' ? 'CI/CD Security Gate' : 'Gate Sécurité CI/CD',
              desc: lang === 'en'
                ? 'Pre-deployment hook → scan staging environment → block deployment if critical vulns detected.'
                : 'Hook pré-déploiement → scanner environnement staging → bloquer déploiement si vulns critiques détectées.',
              color: '#10b981',
            },
          ].map((useCase, i) => {
            const [hovered, setHovered] = useState(false)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hovered ? useCase.color + '35' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '1rem', padding: '1.75rem',
                  transition: 'all 0.3s',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered ? `0 8px 30px ${useCase.color}15` : 'none',
                }}
              >
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${useCase.color}12`, border: `1px solid ${useCase.color}28`,
                  marginBottom: '1rem',
                }}>
                  <span style={{ fontSize: '1.25rem' }}>
                    {i === 0 ? '⏰' : i === 1 ? '🔗' : i === 2 ? '🚨' : '🔐'}
                  </span>
                </div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                  {useCase.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                  {useCase.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Workflow Template */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,0,255,0.12)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Workflow size={20} style={{ color: '#ff00ff' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
              {lang === 'en' ? 'Workflow Template' : 'Template de Workflow'}
            </h3>
            <a
              href="https://github.com/Amine-NAHLI/smart-network-mapper/tree/main/docs"
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem',
                fontSize: '0.75rem', color: '#ff00ff', textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {lang === 'en' ? 'Download JSON' : 'Télécharger JSON'} <ExternalLink size={11} />
            </a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            {lang === 'en'
              ? 'Pre-configured n8n workflow JSON template with webhook trigger, SNM execution, JSON parsing, Telegram splitting, and result storage nodes.'
              : 'Template JSON de workflow n8n pré-configuré avec trigger webhook, exécution SNM, parsing JSON, splitting Telegram et nodes de stockage résultats.'}
          </p>
          
          <div style={{
            background: 'rgba(255,0,255,0.06)', border: '1px solid rgba(255,0,255,0.15)',
            borderRadius: '0.75rem', padding: '1.25rem',
          }}>
            <p style={{ color: '#ff00ff', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              {lang === 'en' ? '📦 Template includes:' : '📦 Le template inclut :'}
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: 1.8, paddingLeft: '1.5rem', margin: 0 }}>
              <li>{lang === 'en' ? 'Webhook trigger node (HTTP POST endpoint)' : 'Node trigger webhook (endpoint HTTP POST)'}</li>
              <li>{lang === 'en' ? 'Execute Command node (runs cli/run_scan.py)' : 'Node Execute Command (lance cli/run_scan.py)'}</li>
              <li>{lang === 'en' ? 'JSON Parser node (extracts scan results)' : 'Node JSON Parser (extrait résultats scan)'}</li>
              <li>{lang === 'en' ? 'JavaScript Splitter (4096 char Telegram chunks)' : 'JavaScript Splitter (chunks Telegram 4096 car.)'}</li>
              <li>{lang === 'en' ? 'Telegram Send node (formatted messages)' : 'Node Telegram Send (messages formatés)'}</li>
              <li>{lang === 'en' ? 'SQLite Storage node (history.db)' : 'Node SQLite Storage (history.db)'}</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="n8n-workflow" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,255,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
