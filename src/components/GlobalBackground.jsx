import { useEffect, useRef } from 'react'

const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768

export default function GlobalBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let scrollY = 0

    const handleScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const STAR_COUNT = isMobileDevice ? 60 : 180
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      drift: (Math.random() - 0.5) * 0.008,
      speed: Math.random() * 0.01 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }))

    const aurora = isMobileDevice ? [] : [
      { y: 0.18, amp: 45, freq: 0.0018, phase: 0, speed: 0.0007, color: 'rgba(0,255,255,0.035)' },
      { y: 0.72, amp: 32, freq: 0.0022, phase: Math.PI, speed: 0.0005, color: 'rgba(124,58,237,0.03)' },
    ]

    const GRID = 80

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Tech grid with scroll parallax
      const gridOffset = (scrollY * 0.1) % GRID
      ctx.strokeStyle = 'rgba(0,255,255,0.022)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width + GRID; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = -gridOffset; y < canvas.height + GRID; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Aurora bands (desktop only)
      for (const a of aurora) {
        a.phase += a.speed
        const baseY = canvas.height * a.y
        ctx.beginPath()
        ctx.moveTo(0, baseY)
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = baseY
            + Math.sin(x * a.freq + a.phase) * a.amp
            + Math.sin(x * a.freq * 0.6 + a.phase * 1.4) * a.amp * 0.4
          ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = a.color
        ctx.fill()
      }

      // Stars with twinkle + drift
      for (const s of stars) {
        s.phase += s.speed
        s.x += s.drift
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        const opacity = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,225,255,${opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
