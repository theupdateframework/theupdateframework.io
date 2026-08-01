(() => {
  'use strict'

  const themeKey = 'td-color-theme'
  const getStoredTheme = () => localStorage.getItem(themeKey)
  const setStoredTheme = theme => localStorage.setItem(themeKey, theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme) => {
    const themeSwitcher = document.querySelector('#bd-theme')
    if (!themeSwitcher) {
      return
    }
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    // Dynamic icon: if light mode, show moon to prompt for dark mode. If dark mode, show sun.
    const iconHref = theme === 'light' ? '#moon-stars-fill' : '#sun-fill'
    activeThemeIcon.setAttribute('href', iconHref)

    const label = theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'
    themeSwitcher.setAttribute('aria-label', label)
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (!storedTheme) {
      const newTheme = getPreferredTheme()
      setTheme(newTheme)
      showActiveTheme(newTheme)
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    const themeSwitcher = document.querySelector('#bd-theme')
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light'
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        setStoredTheme(newTheme)
        setTheme(newTheme)
        showActiveTheme(newTheme)
      })
    }
  })
})()
