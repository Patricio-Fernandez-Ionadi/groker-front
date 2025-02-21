import React from 'react'

export const Button = ({
	children,
	className = '',
	onEvent,
	theme = 'light',
}) => {
	return (
		<button className={`groker__btn ${className} ${theme}`} onClick={onEvent}>
			{children}
		</button>
	)
}
