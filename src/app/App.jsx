import React, { useContext, useState } from 'react'
import { GenModalContext } from '../context/genetics/GenModalContext'

import { GeneticsModal } from '../components/Genetics/GeneticsModal'

import AddPlant from '../components/Plants/AddPlant'
import PlantList from '../components/Plants/PlantList'
import PlantDetails from '../components/Plants/PlantDetails'
import PlantHistory from '../components/Plants/PlantHistory'
import ProductList from '../components/Products/ProductList'

/**
 * Componente principal de la aplicación de gestión de inventario de cultivos.
 */
const App = () => {
	const [showAddPlantForm, setShowAddPlantForm] = useState(false)
	const [showProductList, setShowProductList] = useState(false)

	const { showGeneticForm } = useContext(GenModalContext)

	return (
		<>
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
				{showGeneticForm && <GeneticsModal />}

				<PlantList />
				<PlantDetails />
				<PlantHistory />
			</div>
		</>
	)
}

export default App
