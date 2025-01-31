import React, { useContext, useState } from 'react'
import { PlantContext } from '../context/PlantContext'
import { ProductProvider } from '../context/ProductContext'

import PlantList from '../components/Plants/PlantList'
import AddPlant from '../components/Plants/AddPlant'
import PlantDetails from '../components/Plants/PlantDetails'
import PlantHistory from '../components/Plants/PlantHistory'
import EditPlant from '../components/Plants/EditPlant'

import ProductList from '../components/Products/ProductList'

/**
 * Componente principal de la aplicación de gestión de inventario de cultivos.
 */
const App = () => {
	const { viewMode } = useContext(PlantContext)

	const [showAddPlantForm, setShowAddPlantForm] = useState(false)
	const [showProductList, setShowProductList] = useState(false)

	return (
		<ProductProvider>
			<div>
				<h1>Gestión de Inventario de Cultivos</h1>

				<div>
					<button onClick={() => setShowAddPlantForm(!showAddPlantForm)}>
						{showAddPlantForm ? 'Cerrar' : 'Nuevo Ingreso'}
					</button>

					<button onClick={() => setShowProductList(!showProductList)}>
						{showProductList ? 'Cerrar' : 'Inventario de Productos'}
					</button>
				</div>

				{showAddPlantForm && <AddPlant />}
				{showProductList && <ProductList />}

				<PlantList />
				{viewMode === 'details' && <PlantDetails />}
				{viewMode === 'edit' && <EditPlant />}
				<PlantHistory />
			</div>
		</ProductProvider>
	)
}

export default App
