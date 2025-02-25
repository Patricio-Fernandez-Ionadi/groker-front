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
	let prevRoute = location.state?.from

	// Si existe el state, guardarlo en sessionStorage
	React.useEffect(() => {
		if (prevRoute) {
			sessionStorage.setItem('prevRoute', prevRoute)
		}
	}, [prevRoute])

	// Si no existe en el estado actual, intentar recuperar de sessionStorage
	if (!prevRoute) {
		prevRoute = sessionStorage.getItem('prevRoute')
	}

	const isBackAvailable = location.pathname !== routes.home.path && prevRoute

	return (
		<header className={`header ${theme}`}>
			<div>
				<div className={`burguer-button ${theme}`}>
					<BurguerIcon toggle={isOpen} onEvent={() => setIsOpen(!isOpen)} />
				</div>

				<div className="back-button">
					{isBackAvailable ? (
						<BackButton
							route={prevRoute}
							size={30}
							color={theme === 'dark' ? '#fafafa' : '#333'}
						/>
					) : null}
				</div>
			</div>

			<Link to={routes.home.path}>
				<h1>Gestión de Inventario de Cultivos</h1>
			</Link>
			<Navigation isOpen={isOpen} closeNav={() => setIsOpen(false)} />
		</header>
	)
}
