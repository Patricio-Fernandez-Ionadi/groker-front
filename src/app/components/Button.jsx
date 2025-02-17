import React from 'react'
import { useTheme } from '../context/ThemeContext'

export const Button = ({ children, className, onEvent }) => {
	const { theme } = useTheme()

	return (
		<button className={`${theme} ${className}`} onClick={onEvent}>
			{children}
		</button>
	)
}
