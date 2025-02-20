import React from 'react'
import { useTheme } from '../../../context/ThemeContext'

export function BurguerIcon({ toggle, onEvent }) {
	const { theme } = useTheme()

	return (
		<div
			className={`menu_icon ${theme} ${toggle ? 'fix' : ''}`}
			onClick={onEvent}
		>
			<div className={`bar${toggle ? ' toggle' : ''}`}></div>
		</div>
	)
}
