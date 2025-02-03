import React from 'react'

export function Header({
	showAddPlantForm,
	setShowAddPlantForm,
	showProductList,
	setShowProductList,
}) {
	return (
		<header className="header">
			<h1>Gestión de Inventario de Cultivos</h1>
			<div className="header-buttons">
				<button onClick={() => setShowAddPlantForm(!showAddPlantForm)}>
					{showAddPlantForm ? 'Cerrar' : 'Nuevo Ingreso'}
				</button>

				<button onClick={() => setShowProductList(!showProductList)}>
					{showProductList ? 'Cerrar' : 'Inventario de Productos'}
				</button>
			</div>
		</header>
	)
}
