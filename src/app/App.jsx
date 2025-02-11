import React, { useContext, useEffect, useState } from 'react'
import { GenModalContext } from '../context/genetics/GenModalContext'

import { GeneticsModal } from '../components/Genetics/GeneticsModal'

import AddPlant from '../components/Plants/AddPlant'
import PlantList from '../components/Plants/PlantList'
import PlantDetails from '../components/Plants/PlantDetails'
import PlantHistory from '../components/Plants/PlantHistory'
import ProductList from '../components/Products/ProductList'
import { Header } from '../components/Header'
import { FormContext } from '../context/FormContext'

// Store
import { useDispatch, useSelector } from 'react-redux'
import { loadPlants } from '../store/reducers/plants/plantsAsyncActions'
import { loadGenetics } from '../store/reducers/genetics/geneticsAsyncActions'
import { loadProducts } from '../store/reducers/products/productsAsyncActions'

const App = () => {
	const [showProductList, setShowProductList] = useState(false)

	const { isAddPlantFormOpen } = useContext(FormContext)
	const { isGeneticModalOpen } = useContext(GenModalContext)

	const dispatch = useDispatch()
	const plantsState = useSelector((state) => state.plantsStore)
	const geneticsState = useSelector((state) => state.geneticsStore)
	const productsState = useSelector((state) => state.productsStore)

	useEffect(() => {
		if (!geneticsState.loaded) dispatch(loadGenetics())
		if (!productsState.loaded) dispatch(loadProducts())
		if (!plantsState.loaded) dispatch(loadPlants())
	}, [])

	if (!geneticsState.loaded && !productsState.loaded && !plantsState.loaded) {
		return <div>CARGANDO APP...</div>
	}
	// console.log({
	// 	genetics: geneticsState.loaded,
	// 	products: productsState.loaded,
	// 	plants: plantsState.loaded,
	// })

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
