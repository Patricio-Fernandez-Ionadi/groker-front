import React from 'react'
import { Button } from '../../modules/components/button/Button'
import { Link } from 'react-router'
import { routes } from '../../utils/routes'
import { useTheme } from '../../context/ThemeContext'

export function RouteNotFound() {
	const { theme } = useTheme()

	return (
		<section className="not-found">
			<div className={`not-found-content ${theme}`}>
				<h1 className="not-found-title">¡Oops! Ruta no válida</h1>
				<p className="not-found-message">
					Parece que te has perdido. No te preocupes, ¡puedes volver al inicio!
				</p>
				<Button className="not-found-button">
					<Link to={routes.home.path}>Volver al Inicio</Link>
				</Button>
			</div>
		</section>
	)
}
