import { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('snm-lang') || 'en')
  const toggle = () =>
    setLang((l) => {
      const n = l === 'en' ? 'fr' : 'en'
      localStorage.setItem('snm-lang', n)
      return n
    })
  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
