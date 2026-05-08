import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Download, Terminal, Settings, Shield, BookOpen } from 'lucide-react'
import Installation from './Installation'
import Usage from './Usage'

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('installation')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const tabs = [
    { id: 'installation', label: 'Installation', icon: Download },
    { id: 'usage', label: 'Usage Guide', icon: Terminal },
  ]

  return (
    <section id="docs" className="section-pad relative overflow-hidden" style={{ background: '#080810' }}>
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 50%, rgba(124,58,237,0.04) 0%, transparent 50%)' }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            DOCUMENTATION
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl mb-4 text-white">
            Get <span className="gradient-text">Started</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to set up and master the Smart Network Mapper suite.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                    ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'installation' ? (
              <motion.div
                key="install"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {/* We need to modify Installation to not have its own section wrapper if possible, 
                    but for now we'll use it as is and adjust App.jsx */}
                <Installation isEmbed />
              </motion.div>
            ) : (
              <motion.div
                key="usage"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Usage isEmbed />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
