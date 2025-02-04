import React, { useContext, useState } from 'react'
import { GenModalContext } from '../context/genetics/GenModalContext'

import { GeneticsModal } from '../components/Genetics/GeneticsModal'

import AddPlant from '../components/Plants/AddPlant'
import PlantList from '../components/Plants/PlantList'
import PlantDetails from '../components/Plants/PlantDetails'
import PlantHistory from '../components/Plants/PlantHistory'
import ProductList from '../components/Products/ProductList'
import { Header } from '../components/Header'
import { FormContext } from '../context/FormContext'

/**
 * Componente principal de la aplicación de gestión de inventario de cultivos.
 */
const App = () => {
	const [showProductList, setShowProductList] = useState(false)

	const { isAddPlantFormOpen } = useContext(FormContext)
	const { isGeneticModalOpen } = useContext(GenModalContext)

	return (
		<>
			<div className="app-container">
				<Header
					showProductList={showProductList}
					setShowProductList={setShowProductList}
				/>
				{(isAddPlantFormOpen || showProductList || isGeneticModalOpen) && (
					<aside className="forms-section">
						{isAddPlantFormOpen && <AddPlant />}
						{showProductList && <ProductList />}
						{isGeneticModalOpen && <GeneticsModal />}
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
