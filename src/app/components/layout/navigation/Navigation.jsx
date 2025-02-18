import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

import { useTheme } from '../../../context/ThemeContext'

import { BurguerIcon } from './BurguerIcon'
import { BackButton } from './BackButton'

import { routes } from '../../../utils/routes'
import { ToggleSwitch } from '../../shared/ToggleSwitch'
import { Dark_icon, Light_icon } from '../../../../assets/Icons'

export const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { toggleTheme, isDarkMode, theme } = useTheme()

	const location = useLocation()
	const prevRoute = location.state?.from

	const isBackAvailable =
		location.pathname !== routes.home && location.state != null

	const sendFromLocation = {
		from: location.pathname,
	}

	return (
		<div className="navigation-container">
			<div>
				<div className={`burguer-button ${theme}`}>
					<BurguerIcon toggle={isOpen} onEvent={() => setIsOpen(!isOpen)} />
				</div>

				<div className="back-button">
					{isBackAvailable ? (
						<BackButton
							route={prevRoute}
							size={30}
							color={`${theme === 'light' ? '#212121' : '#f5f5f5'}`}
						/>
					) : null}
				</div>
			</div>

			<Link to={routes.home}>
				<h1>Gestión de Inventario de Cultivos</h1>
			</Link>

			<nav className={`navigation ${isOpen ? 'open' : ''} ${theme}`}>
				<div className="theme-switch">
					<div>
						{theme === 'dark' ? (
							<Light_icon size={25} color={'#ff9800'} />
						) : (
							<Dark_icon size={25} />
						)}
					</div>
					<ToggleSwitch onEvent={toggleTheme} switcher={isDarkMode} />
				</div>
				<ul className="navigation-list">
					<li>
						<Link
							to={routes.home}
							state={sendFromLocation}
							onClick={(e) => setIsOpen(false)}
						>
							Inicio
						</Link>
					</li>
					<li>
						<Link
							to={routes.plants}
							state={sendFromLocation}
							onClick={(e) => setIsOpen(false)}
						>
							Inventario
						</Link>
					</li>
					<li>
						<Link
							to={routes.products}
							state={sendFromLocation}
							onClick={(e) => setIsOpen(false)}
						>
							Productos
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
