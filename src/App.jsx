import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Features from './components/Features'
import Documentation from './components/Documentation'
import AIEngine from './components/AIEngine'
import CVEDataset from './components/CVEDataset'
import Author from './components/Author'
import Footer from './components/Footer'
import GlobalBackground from './components/GlobalBackground'

export default function App() {
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <GlobalBackground />
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Features />
        <Documentation />
        <AIEngine />
        <CVEDataset />
        <Author />
      </main>
      <Footer />
    </div>
  )
}
