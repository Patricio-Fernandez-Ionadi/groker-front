import React from 'react'
import { Link } from 'react-router'
import { Arrow_left } from '../../../assets/Icons'

export function BackButton({ route, size }) {
	return (
		<Link to={route}>
			<Arrow_left size={size} strokeWidth={0.5} />
		</Link>
	)
}
