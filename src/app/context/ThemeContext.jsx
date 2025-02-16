import { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light')

	const toggleTheme = () => {
		if (theme === 'light') setTheme('dark')
		else setTheme('light')
	}

	const themeCtx = {
		theme,
		toggleTheme,
		isDarkMode: theme === 'dark',
	}

	return (
		<ThemeContext.Provider value={themeCtx}>{children}</ThemeContext.Provider>
	)
}
