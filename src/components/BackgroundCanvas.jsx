import { useEffect, useRef } from 'react'

export default function BackgroundCanvas() {
  const canvasRef = useRef(null)
  const starsCanvasRef = useRef(null)
  
  const CONFIG = {
    bgColor: '#050A14',
    starCount: window.innerWidth < 768 ? 80 : 180,
    sphereDots: window.innerWidth < 768 ? 140 : 280,
    sphereRadius: 260, // 520px diameter
    particleCount: window.innerWidth < 768 ? 12 : 25,
    scanLineSpeed: 1.2,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    let animId
    const isMobile = window.innerWidth < 768
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // --- 1. Define Data Arrays First ---
    const starData = []
    const spherePoints = []
    const floatingParticles = []
    let dataLines = []

    // --- 2. Initialize Data Functions ---
    function initStars() {
      starData.length = 0
      for (let i = 0; i < CONFIG.starCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 0.5 + 0.5
        const colorType = Math.random()
        let color = 'rgba(255, 255, 255, 0.35)'
        if (colorType > 0.8) color = 'rgba(0, 212, 255, 0.5)'
        if (colorType > 0.95) color = 'rgba(168, 85, 247, 0.5)'

        starData.push({
          x, y, size, color,
          phase: Math.random() * Math.PI * 2,
          duration: 3000 + Math.random() * 5000,
          isLarge: Math.random() < 0.05
        })
      }
    }

    function initSphere() {
      spherePoints.length = 0
      for (let i = 0; i < CONFIG.sphereDots; i++) {
        const phi = Math.acos(-1 + (2 * i) / CONFIG.sphereDots)
        const theta = Math.sqrt(CONFIG.sphereDots * Math.PI) * phi
        
        let color = 'rgba(0, 212, 255, 0.45)' 
        if (i % 5 === 0) color = 'rgba(168, 85, 247, 0.35)' 
        if (i % 12 === 0) color = 'rgba(236, 72, 153, 0.3)' 

        spherePoints.push({
          origX: CONFIG.sphereRadius * Math.cos(theta) * Math.sin(phi),
          origY: CONFIG.sphereRadius * Math.sin(theta) * Math.sin(phi),
          origZ: CONFIG.sphereRadius * Math.cos(phi),
          size: i % 12 === 0 ? 1.8 : (i % 5 === 0 ? 1.2 : 0.8),
          color
        })
      }
    }

    function initParticles() {
      floatingParticles.length = 0
      for (let i = 0; i < CONFIG.particleCount; i++) {
        floatingParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1 + 1,
          color: Math.random() > 0.4 ? 'rgba(0, 212, 255, 0.4)' : (Math.random() > 0.3 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(236, 72, 153, 0.4)')
        })
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
      initSphere()
      initParticles()
    }

    // --- 3. Events & Initial Call ---
    window.addEventListener('resize', resize)
    resize()

    let rotationY = 0
    let scanLineY = 0

    const render = (time) => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      if (isLight) return

      if (reducedMotion) {
        ctx.fillStyle = CONFIG.bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        return
      }

      ctx.fillStyle = CONFIG.bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Layer: Twinkling Stars
      starData.forEach(s => {
        const twinkle = 0.2 + Math.abs(Math.sin((time / s.duration) * Math.PI)) * 0.4
        ctx.globalAlpha = twinkle
        ctx.fillStyle = s.color
        if (s.isLarge) {
          ctx.shadowBlur = 3; ctx.shadowColor = 'rgba(0, 212, 255, 0.3)'
          ctx.beginPath(); ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2); ctx.fill()
          ctx.shadowBlur = 0
        } else {
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill()
        }
      })
      ctx.globalAlpha = 1

      // Layer: Floating Particles
      floatingParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
      })

      // CENTRAL SPHERE
      rotationY += (2 * Math.PI) / (90 * 60)
      const centerX = canvas.width / 2
      const centerY = (canvas.height * 0.42)
      
      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 350)
      glow.addColorStop(0, 'rgba(0, 212, 255, 0.06)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(centerX, centerY, 350, 0, Math.PI * 2); ctx.fill()

      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)'
      ctx.beginPath(); ctx.arc(centerX, centerY, CONFIG.sphereRadius + 20, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.05)'
      ctx.beginPath(); ctx.arc(centerX, centerY, CONFIG.sphereRadius + 50, 0, Math.PI * 2); ctx.stroke()

      const projected = spherePoints.map(p => {
        const x = p.origX * Math.cos(rotationY) - p.origZ * Math.sin(rotationY)
        const z = p.origX * Math.sin(rotationY) + p.origZ * Math.cos(rotationY)
        const scale = 1200 / (1200 + z)
        let opacity = z > 0 ? 1.0 : (z > -CONFIG.sphereRadius * 0.5 ? 0.6 : 0.2)
        return { px: x * scale + centerX, py: p.origY * scale + centerY, pz: z, opacity, size: p.size * scale, color: p.color }
      })

      projected.forEach(p => {
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1

      // Data Transfer Lines
      if (Math.random() < 0.015 && projected.length > 2) {
        const p1 = projected[Math.floor(Math.random() * projected.length)]
        const p2 = projected[Math.floor(Math.random() * projected.length)]
        if (Math.sqrt((p1.px - p2.px)**2 + (p1.py - p2.py)**2) < 150 && p1.pz > 0 && p2.pz > 0) {
          dataLines.push({ p1, p2, alpha: 0, state: 'in' })
        }
      }
      dataLines = dataLines.filter(l => {
        l.state === 'in' ? (l.alpha += 0.05, l.alpha >= 0.3 && (l.state = 'out')) : (l.alpha -= 0.02)
        ctx.strokeStyle = `rgba(0, 212, 255, ${l.alpha})`
        ctx.beginPath(); ctx.moveTo(l.p1.px, l.p1.py); ctx.lineTo(l.p2.px, l.p2.py); ctx.stroke()
        return l.alpha > 0
      })

      // Scan Line
      if (!isMobile) {
        scanLineY = (scanLineY + CONFIG.scanLineSpeed) % canvas.height
        const sOpacity = Math.abs(scanLineY - centerY) < CONFIG.sphereRadius ? 0.18 : 0.12
        const sWidth = canvas.width * 0.4
        const sGrad = ctx.createLinearGradient(centerX - sWidth/2, 0, centerX + sWidth/2, 0)
        sGrad.addColorStop(0, 'transparent'); sGrad.addColorStop(0.5, `rgba(0, 212, 255, ${sOpacity})`); sGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = sGrad; ctx.fillRect(centerX - sWidth/2, scanLineY, sWidth, 1)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <style>{`
        .bg-nebula { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
        .nebula { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.8; will-change: transform; }
        .nebula-cyan { width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,212,255,0.035) 0%, transparent 70%); top: -100px; left: -100px; animation: drift-1 25s ease-in-out infinite alternate; }
        .nebula-violet { width: 500px; height: 500px; background: radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%); top: 20%; right: -50px; animation: drift-2 30s ease-in-out infinite alternate; }
        .nebula-rose { width: 400px; height: 400px; background: radial-gradient(circle, rgba(236,72,153,0.025) 0%, transparent 70%); bottom: -50px; left: 30%; animation: drift-3 20s ease-in-out infinite alternate; }
        @keyframes drift-1 { from { transform: translate(0, 0); } to { transform: translate(80px, 40px); } }
        @keyframes drift-2 { from { transform: translate(0, 0); } to { transform: translate(-60px, 80px); } }
        @keyframes drift-3 { from { transform: translate(0, 0); } to { transform: translate(40px, -50px); } }
      `}</style>
      <div className="bg-nebula">
        <div className="nebula nebula-cyan" />
        <div className="nebula nebula-violet" />
        <div className="nebula nebula-rose" />
      </div>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} />
    </>
  )
}
