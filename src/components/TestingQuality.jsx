import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TestTube, CheckCircle, BarChart3, Zap, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function TestingQuality({ isEmbed = false }) {
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
            border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)',
            color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            marginBottom: '1.5rem', letterSpacing: '0.12em',
          }}>
            <TestTube size={13} /> TESTING
          </div>
          <h2 className="font-orbitron" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <span className="gradient-text">{lang === 'en' ? 'Tests & Quality' : 'Tests & Qualité'}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}>
            {lang === 'en'
              ? 'Comprehensive test suite with pytest framework covering 85%+ of the codebase across scanner, model, and reporter modules.'
              : 'Suite de tests complète avec framework pytest couvrant 85%+ du code sur les modules scanner, model et reporter.'}
          </p>
        </motion.div>
      )}

      {/* Test Coverage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ marginBottom: '3rem' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[
            { label: lang === 'en' ? 'Code Coverage' : 'Couverture Code', value: '85%+', color: '#10b981', icon: BarChart3 },
            { label: lang === 'en' ? 'Unit Tests' : 'Tests Unitaires', value: '45+', color: '#00ffff', icon: CheckCircle },
            { label: lang === 'en' ? 'Integration Tests' : 'Tests Intégration', value: '12+', color: '#7c3aed', icon: Zap },
            { label: lang === 'en' ? 'Performance Tests' : 'Tests Performance', value: 'k6', color: '#f59e0b', icon: BarChart3 },
          ].map((stat, i) => {
            const [hovered, setHovered] = useState(false)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hovered ? stat.color + '35' : stat.color + '18'}`,
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '1rem', padding: '1.75rem', textAlign: 'center',
                  transition: 'all 0.3s',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered ? `0 8px 30px ${stat.color}15` : 'none',
                }}
              >
                <div style={{
                  width: '3rem', height: '3rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${stat.color}12`, border: `1px solid ${stat.color}28`,
                  margin: '0 auto 1rem',
                }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <div className="font-orbitron" style={{
                  fontWeight: 900, fontSize: '1.75rem', color: stat.color,
                  textShadow: `0 0 20px ${stat.color}60`, marginBottom: '0.375rem',
                }}>
                  {stat.value}
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Test Categories */}
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
          {lang === 'en' ? 'TEST MODULES' : 'MODULES DE TESTS'}
        </h3>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {[
            {
              title: lang === 'en' ? 'Unit Tests' : 'Tests Unitaires',
              files: [
                'tests/test_port_scanner.py',
                'tests/test_host_discovery.py',
                'tests/test_device_info.py',
                'tests/test_iana_manager.py',
                'model/test_predictor.py',
              ],
              desc: lang === 'en'
                ? 'Test individual functions and methods in isolation with mocked dependencies.'
                : 'Teste fonctions et méthodes individuelles en isolation avec dépendances mockées.',
              color: '#00ffff',
            },
            {
              title: lang === 'en' ? 'Integration Tests' : 'Tests d\'Intégration',
              files: [
                'cli/test_run_scan_errors.py',
                'tests/test_full_workflow.py',
                'tests/test_api_integration.py',
              ],
              desc: lang === 'en'
                ? 'Test module interactions, end-to-end workflows, and external API integrations.'
                : 'Teste interactions modules, workflows end-to-end et intégrations API externes.',
              color: '#7c3aed',
            },
            {
              title: lang === 'en' ? 'Performance Tests (k6)' : 'Tests Performance (k6)',
              files: [
                'performance-tests/load_test.js',
                'performance-tests/stress_test.js',
                'performance-tests/spike_test.js',
              ],
              desc: lang === 'en'
                ? 'Load testing with k6: sustained 1000 scans/min, 300 concurrent threads validation.'
                : 'Load testing avec k6 : 1000 scans/min soutenus, validation 300 threads concurrents.',
              color: '#f59e0b',
            },
          ].map((category, i) => {
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
                  border: `1px solid ${hovered ? category.color + '35' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '1rem', padding: '1.75rem',
                  transition: 'all 0.3s',
                  boxShadow: hovered ? `0 8px 30px ${category.color}15` : 'none',
                }}
              >
                <h4 style={{ color: category.color, fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {category.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {category.desc}
                </p>
                <div style={{
                  background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem',
                  padding: '1rem', border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {category.files.map((file, j) => (
                    <div key={j} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      color: category.color, opacity: 0.8, marginBottom: j < category.files.length - 1 ? '0.5rem' : 0,
                    }}>
                      <span style={{ color: 'var(--text-muted)' }}>├─</span> {file}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Test Commands */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(16,185,129,0.12)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', padding: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <TestTube size={20} style={{ color: '#10b981' }} />
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
              {lang === 'en' ? 'Run Tests' : 'Lancer les Tests'}
            </h3>
            <a
              href="https://docs.pytest.org/"
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem',
                fontSize: '0.75rem', color: '#10b981', textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              pytest docs <ExternalLink size={11} />
            </a>
          </div>

          <div style={{ display: 'grid', gap: '0.875rem' }}>
            {[
              { cmd: 'pytest', desc: lang === 'en' ? 'Run all tests' : 'Lancer tous les tests' },
              { cmd: 'pytest tests/test_port_scanner.py', desc: lang === 'en' ? 'Run specific module' : 'Lancer module spécifique' },
              { cmd: 'pytest --cov=scanner --cov=model', desc: lang === 'en' ? 'Run with coverage report' : 'Lancer avec rapport couverture' },
              { cmd: 'pytest -v -s --tb=short', desc: lang === 'en' ? 'Verbose mode with stdout' : 'Mode verbose avec stdout' },
              { cmd: 'pytest -k "port or host"', desc: lang === 'en' ? 'Run tests matching keyword' : 'Lancer tests correspondant mot-clé' },
              { cmd: 'k6 run performance-tests/load_test.js', desc: lang === 'en' ? 'Run k6 performance tests' : 'Lancer tests performance k6' },
            ].map((test, i) => (
              <div key={i} style={{
                background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
                borderRadius: '0.5rem', padding: '0.875rem', display: 'flex', gap: '1rem', alignItems: 'center',
              }}>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#10b981',
                  flex: '0 0 auto', minWidth: '280px',
                }}>
                  $ {test.cmd}
                </code>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', flex: 1 }}>
                  {test.desc}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1.5rem', background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)', borderRadius: '0.75rem',
            padding: '1.25rem', textAlign: 'center',
          }}>
            <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
              ✓ {lang === 'en' ? 'Continuous Integration ready with GitHub Actions' : 'Intégration Continue prête avec GitHub Actions'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )

  if (isEmbed) return content

  return (
    <section id="testing-quality" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)',
      }} />
      {content}
    </section>
  )
}
