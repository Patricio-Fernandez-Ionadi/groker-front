import React, { useContext, useState } from 'react'
import { GenModalContext } from '../context/genetics/GenModalContext'

import { GeneticsModal } from '../components/Genetics/GeneticsModal'

import AddPlant from '../components/Plants/AddPlant'
import PlantList from '../components/Plants/PlantList'
import PlantDetails from '../components/Plants/PlantDetails'
import PlantHistory from '../components/Plants/PlantHistory'
import ProductList from '../components/Products/ProductList'
import { Header } from '../components/Header'

/**
 * Componente principal de la aplicación de gestión de inventario de cultivos.
 */
const App = () => {
	const [showAddPlantForm, setShowAddPlantForm] = useState(false)
	const [showProductList, setShowProductList] = useState(false)

	const { showGeneticForm } = useContext(GenModalContext)

	return (
		<>
			<div className="app-container">
				<Header
					showAddPlantForm={showAddPlantForm}
					setShowAddPlantForm={setShowAddPlantForm}
					showProductList={showProductList}
					setShowProductList={setShowProductList}
				/>
				{(showAddPlantForm || showProductList || showGeneticForm) && (
					<aside className="forms-section">
						{showAddPlantForm && <AddPlant />}
						{showProductList && <ProductList />}
						{showGeneticForm && <GeneticsModal />}
					</aside>
				)}

				<main className="main-content">
					<PlantList />
					<PlantDetails />
					<PlantHistory />
				</main>
			</div>
		</>
	)
}

export default App
