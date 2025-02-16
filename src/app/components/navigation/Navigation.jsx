import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

import { BurguerIcon } from './BurguerIcon'
import { BackButton } from './BackButton'
import { routes } from '../../utils/routes'

export const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false)

	const location = useLocation()
	const prevRoute = location.state?.from

	const isBackAvailable = location.state && location.pathname !== routes.home

	return (
		<div className="navigation-container">
			<div>
				<div className="burguer-button">
					<BurguerIcon toggle={isOpen} onEvent={() => setIsOpen(!isOpen)} />
				</div>

				<div className="back-button">
					{isBackAvailable ? <BackButton route={prevRoute} size={30} /> : null}
				</div>
			</div>

			<Link to={routes.home}>
				<h1>Gestión de Inventario de Cultivos</h1>
			</Link>

			<nav className={`navigation ${isOpen ? 'open' : ''}`}>
				<ul className="navigation-list">
					<li>Inicio</li>
					<li>Inventario</li>
					<li>Productos</li>
				</ul>
			</nav>
		</div>
	)
}
