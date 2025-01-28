import React, { useContext, useState } from 'react'
import { PlantContext } from '../context/PlantContext'

import PlantList from '../components/PlantList'
import AddPlant from '../components/AddPlant'
import PlantDetails from '../components/PlantDetails'
import PlantHistory from '../components/PlantHistory'
import EditPlant from '../components/EditPlant'

/**
 * Componente principal de la aplicación de gestión de inventario de cultivos.
 */
const App = () => {
	const { viewMode } = useContext(PlantContext)
	const [showAddPlantForm, setShowAddPlantForm] = useState(false)

	return (
		<div>
			<h1>Gestión de Inventario de Cultivos</h1>
			<button onClick={() => setShowAddPlantForm(!showAddPlantForm)}>
				{showAddPlantForm ? 'Cerrar' : 'Nuevo Ingreso'}
			</button>
			{showAddPlantForm && <AddPlant />}
			<PlantList />
			{viewMode === 'details' && <PlantDetails />}
			{viewMode === 'edit' && <EditPlant />}
			<PlantHistory />
		</div>
	)
}

export default App
