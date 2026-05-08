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
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
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
