import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Features from './components/Features'
import Installation from './components/Installation'
import Usage from './components/Usage'
import AIEngine from './components/AIEngine'
import Author from './components/Author'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#e2e8f0' }}>
      <Navbar />
      <Hero />
      <Overview />
      <Features />
      <Installation />
      <Usage />
      <AIEngine />
      <Author />
      <Footer />
    </div>
  )
}
