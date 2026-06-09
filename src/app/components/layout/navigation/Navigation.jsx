import React, { useEffect } from 'react'
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

	const [isCarenciasOpen, setIsCarenciasOpen] = React.useState(false)

	useEffect(() => {
		if (!isOpen) return

		const handleClickOutside = (e) => {
			if (e.clientX > 230) {
				closeNav()
				setIsCarenciasOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [isOpen, closeNav])

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
					<ul>
						<li>
							<Link
								to={routes.minerales.path}
								onClick={() => setIsCarenciasOpen(!isCarenciasOpen)}
							>
								Carencias/Excesos
							</Link>
							{isCarenciasOpen && (
								<ul className="sub_list">
									<li>
										<a href="#nitrogeno">Nitrógeno</a>
									</li>
									<li>
										<a href="#potasio">Potasio</a>
									</li>
									<li>
										<a href="#fosforo">Fósforo</a>
									</li>
								</ul>
							)}
						</li>
					</ul>
				</ul>
			</nav>
		</div>
	)
}
