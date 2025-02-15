import React, { useContext } from 'react'
import { FormContext } from '../context/FormContext'

export function Header({ showProductList, setShowProductList }) {
	const { toggleAddPlantForm, isAddPlantFormOpen } = useContext(FormContext)

	const handleProductList = () => {
		setShowProductList(!showProductList)
	}

	return (
		<header className="header">
			<h1>Gestión de Inventario de Cultivos</h1>
			<div className="header-buttons">
				<button onClick={toggleAddPlantForm}>
					{isAddPlantFormOpen ? 'Cerrar' : 'Nuevo Ingreso'}
				</button>

				<button onClick={handleProductList}>
					{showProductList ? 'Cerrar' : 'Inventario de Productos'}
				</button>
			</div>
		</header>
	)
}
