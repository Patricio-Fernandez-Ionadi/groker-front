import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export const Skeleton = ({ width, height }) => {
	const { theme } = useTheme()

	return <div className={`skeleton ${theme}`} style={{ width, height }}></div>
}
