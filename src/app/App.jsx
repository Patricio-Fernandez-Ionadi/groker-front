import React, { useContext, useEffect, useState } from 'react'
import { GenModalContext } from '../Genetics'

import { GeneticsModal } from '../Genetics'

import { AddPlant } from '../Plants'
import { PlantList } from '../Plants'
import { PlantDetails } from '../Plants'
import { PlantHistory } from '../Plants'
import { ProductList } from '../Products'

import { Header } from './index'
import { FormContext } from './index'

// Store
import { useDispatch, useSelector } from 'react-redux'
import { loadPlants } from '../Plants'
import { loadGenetics } from '../Genetics'
import { loadProducts } from '../Products'

export const App = () => {
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
