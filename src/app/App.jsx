import React, { useContext, useState } from 'react'
import { PlantContext } from '../context/PlantContext'
import { ProductProvider } from '../context/ProductContext'

import PlantList from '../components/PlantList'
import AddPlant from '../components/AddPlant'
import PlantDetails from '../components/PlantDetails'
import PlantHistory from '../components/PlantHistory'
import EditPlant from '../components/EditPlant'

import AddProduct from '../components/AddProduct'
import ProductList from '../components/ProductList'

/**
 * Componente principal de la aplicación de gestión de inventario de cultivos.
 */
const App = () => {
	const { viewMode } = useContext(PlantContext)

	const [showAddPlantForm, setShowAddPlantForm] = useState(false)

	const [showAddProductForm, setShowAddProductForm] = useState(false)
	const [showProductList, setShowProductList] = useState(false)

	return (
		<ProductProvider>
			<div>
				<h1>Gestión de Inventario de Cultivos</h1>
				<button onClick={() => setShowAddPlantForm(!showAddPlantForm)}>
					{showAddPlantForm ? 'Cerrar' : 'Nuevo Ingreso'}
				</button>
				{showAddPlantForm && <AddPlant />}

				<button onClick={() => setShowAddProductForm(!showAddProductForm)}>
					{showAddProductForm ? 'Cerrar' : 'Añadir Producto'}
				</button>
				{showAddProductForm && <AddProduct />}

				<button onClick={() => setShowProductList(!showProductList)}>
					{showProductList
						? 'Ocultar Inventario de Productos'
						: 'Ver Inventario de Productos'}
				</button>
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
