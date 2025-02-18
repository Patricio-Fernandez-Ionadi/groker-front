import React from 'react'
import { Link } from 'react-router'
import { Arrow_left } from '../../../../assets/Icons'

export const BackButton = ({ route, size, color }) => {
	return (
		<Link to={route}>
			<Arrow_left size={size} strokeWidth={0.5} color={color} />
		</Link>
	)
}
