import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, ChevronRight, ExternalLink, Database } from 'lucide-react'

const PIPELINE = [
  { label: 'Service Detection', sub: 'Banner + port analysis', color: '#00ffff' },
  { label: 'Quantile Transform', sub: 'Version normalization', color: '#7c3aed' },
  { label: 'Feature Scaling', sub: 'StandardScaler', color: '#ff00ff' },
  { label: 'Random Forest', sub: '5.1GB classifier', color: '#f59e0b' },
  { label: 'Threat Level', sub: 'Severity prediction', color: '#10b981' },
]

const MODELS = [
  { file: 'vulnerability_model.pkl', size: '5.1 GB', role: 'Main RF Classifier', color: '#ff00ff' },
  { file: 'quantile_transformer.pkl', size: '24 KB', role: 'Version normalization', color: '#7c3aed' },
  { file: 'scaler.pkl', size: '895 B', role: 'Feature scaling', color: '#00ffff' },
  { file: 'feature_names.pkl', size: '1.5 KB', role: 'Dataset column names', color: '#f59e0b' },
]

const THREATS = [
  { level: 'Critical', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', score: '9–10' },
  { level: 'High', color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)', score: '7–8.9' },
  { level: 'Medium', color: '#eab308', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.3)', score: '4–6.9' },
  { level: 'Low', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', score: '0–3.9' },
]

export default function AIEngine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="ai-engine" className="section-pad relative overflow-hidden grid-bg" style={{ background: '#080810' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-6">
            <Brain className="w-3.5 h-3.5" />
            MACHINE LEARNING
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4">
            AI <span className="gradient-text">Engine</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A 5.1 GB Random Forest model trained on thousands of CVE records predicts vulnerability severity from detected services in real-time.
          </p>
        </motion.div>

        {/* Pipeline diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="font-semibold text-slate-300 text-sm text-center mb-8 font-mono uppercase tracking-widest">
            Inference Pipeline
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            {PIPELINE.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center min-w-[130px]"
                  style={{ borderColor: `${step.color}30` }}
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ background: step.color, boxShadow: `0 0 8px ${step.color}` }}
                  />
                  <p className="text-white text-sm font-semibold">{step.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: step.color, opacity: 0.7 }}>{step.sub}</p>
                </motion.div>
                {i < PIPELINE.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model files table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
              <Database className="w-4 h-4 text-cyan-400" />
              <h3 className="font-semibold text-white text-sm">Model Files</h3>
              <a
                href="https://huggingface.co/aminenahli/smart-network-mapper-models"
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Hugging Face <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="divide-y divide-white/5">
              {MODELS.map((m) => (
                <div key={m.file} className="px-6 py-4 flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-slate-200 truncate">{m.file}</p>
                    <p className="text-xs text-slate-500">{m.role}</p>
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-md flex-shrink-0"
                    style={{ background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}25` }}
                  >
                    {m.size}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Threat levels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold text-slate-300 text-sm font-mono uppercase tracking-widest mb-4">
              Threat Level Scale
            </h3>
            <div className="space-y-3">
              {THREATS.map((t) => (
                <div
                  key={t.level}
                  className="rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:translate-x-1"
                  style={{ background: t.bg, border: `1px solid ${t.border}` }}
                >
                  <div
                    className="w-3 h-10 rounded-full flex-shrink-0"
                    style={{ background: t.color, boxShadow: `0 0 10px ${t.color}` }}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: t.color }}>{t.level}</p>
                    <p className="text-xs text-slate-400 mt-0.5">CVSS Score: {t.score}</p>
                  </div>
                  <div
                    className="text-xs font-mono px-3 py-1.5 rounded-full font-bold"
                    style={{ background: `${t.color}20`, color: t.color }}
                  >
                    {t.level.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
