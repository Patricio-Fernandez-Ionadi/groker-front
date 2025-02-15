import React, { useContext } from 'react'
import { Link } from 'react-router'

import { FormContext, usePath } from '../'

export function Header() {
	const { toggleAddPlantForm, isAddPlantFormOpen } = useContext(FormContext)

	const currentPath = usePath()

	return (
		<header className="header">
			<h1>Gestión de Inventario de Cultivos</h1>
			<div className="header-buttons">
				<button onClick={toggleAddPlantForm}>
					{isAddPlantFormOpen ? 'Cerrar' : 'Nuevo Ingreso'}
				</button>

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
