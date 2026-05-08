import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Features from './components/Features'
import Documentation from './components/Documentation'
import AIEngine from './components/AIEngine'
import Author from './components/Author'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200" style={{ background: '#0a0a0f', color: '#e2e8f0' }}>
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Features />
        <Documentation />
        <AIEngine />
        <Author />
      </main>
      <Footer />
    </div>
  )
}
