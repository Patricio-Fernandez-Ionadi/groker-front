import React from 'react'

export const Button = ({ children, className = '', onEvent, theme }) => {
	return (
		<button className={`btn ${className} ${theme}`} onClick={onEvent}>
			{children}
		</button>
	)
}
