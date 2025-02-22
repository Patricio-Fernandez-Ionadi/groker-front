import React from 'react'
import { Link, useLocation } from 'react-router'
import { DarkMode_icon, LightMode_icon } from 'groker/icons'
import { ToggleSwitch } from 'groker/components'

import { useTheme } from '../../../context/ThemeContext'

import { routes } from '../../../utils/routes'

export const Navigation = ({ isOpen, closeNav }) => {
	const { toggleTheme, isDarkMode, theme } = useTheme()

	const location = useLocation()

	const sendFromLocation = {
		from: location.pathname,
	}

	return (
		<div className="navigation-container">
			<nav className={`navigation ${isOpen ? 'open' : ''} ${theme}`}>
				<div className="theme-switch">
					<div>
						{theme === 'dark' ? (
							<LightMode_icon size={25} color={'#ff9800'} />
						) : (
							<DarkMode_icon size={25} />
						)}
					</div>
					<ToggleSwitch onEvent={toggleTheme} switcher={isDarkMode} />
				</div>
				<ul className="navigation-list">
					<li>
						<Link
							to={routes.home.path}
							state={sendFromLocation}
							onClick={closeNav}
						>
							Inicio
						</Link>
					</li>
					<li>
						<Link
							to={routes.plants.path}
							state={sendFromLocation}
							onClick={closeNav}
						>
							Inventario
						</Link>
					</li>
					<li>
						<Link
							to={routes.products.path}
							state={sendFromLocation}
							onClick={closeNav}
						>
							Productos
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
