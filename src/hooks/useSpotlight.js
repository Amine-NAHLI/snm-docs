export function useSpotlight() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.07) 0%, rgba(255,255,255,0.03) 50%, transparent 70%),
      rgba(255,255,255,0.03)
    `
  }
  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
  }
  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}
