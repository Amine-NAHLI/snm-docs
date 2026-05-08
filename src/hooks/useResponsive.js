import { useState, useEffect } from 'react'

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handler = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    width: windowSize.width,
  }
}
