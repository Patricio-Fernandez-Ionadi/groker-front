import React from 'react'
import { Link, useLocation } from 'react-router'

import { useTheme, routes } from '@/app'

import { Navigation } from './navigation/Navigation'
import { BurguerIcon } from './navigation/BurguerIcon'
import { BackButton } from './navigation/BackButton'

export function Header() {
	const { theme } = useTheme()

	const [isOpen, setIsOpen] = React.useState(false)
	const location = useLocation()
	const prevRoute = location.state?.from

	const isBackAvailable = location.pathname !== routes.home.path && prevRoute

	return (
		<header className={`header ${theme}`}>
			<div>
				<div className={`burguer-button ${theme}`}>
					<BurguerIcon toggle={isOpen} onEvent={() => setIsOpen(!isOpen)} />
				</div>

				<div className="back-button">
					{isBackAvailable ? <BackButton route={prevRoute} size={30} /> : null}
				</div>
			</div>

			<Link to={routes.home.path}>
				<h1>Gestión de Inventario de Cultivos</h1>
			</Link>
			<Navigation isOpen={isOpen} closeNav={() => setIsOpen(false)} />
		</header>
	)
}
