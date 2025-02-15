import React from 'react'
import { Link } from 'react-router'

import { usePath } from '../'

export function Header() {
	const currentPath = usePath()

	return (
		<header className="header">
			<h1>Gestión de Inventario de Cultivos</h1>
			<div className="header-buttons">
				<button>
					{currentPath !== '/products' && (
						<Link to="/products">Inventario de Productos</Link>
					)}
					{currentPath === '/products' && <Link to="/">Volver al Inicio</Link>}
				</button>
			</div>
		</header>
	)
}
