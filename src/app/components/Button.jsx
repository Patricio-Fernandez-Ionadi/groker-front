import React from 'react'
import { useTheme } from '../context/ThemeContext'

export const Button = ({ children }) => {
	const { theme } = useTheme()

	return <button className={theme}>{children}</button>
}
