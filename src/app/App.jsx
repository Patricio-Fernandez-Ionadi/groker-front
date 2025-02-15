import React, { useContext, useEffect } from 'react'
import { GenModalContext } from '../Genetics'
import { FormContext } from './index'

import { GeneticsModal } from '../Genetics'

import { AddPlant } from '../Plants'
import { PlantList } from '../Plants'
import { PlantDetails } from '../Plants'
import { PlantHistory } from '../Plants'

// Store
import { useDispatch, useSelector } from 'react-redux'
import { loadPlants } from '../Plants'
import { loadGenetics } from '../Genetics'
import { loadProducts } from '../Products'

export const App = () => {
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
	console.log({
		genetics: geneticsState,
		products: productsState,
		plants: plantsState,
	})

	return (
		<>
			<div className="app-container">
				{(isAddPlantFormOpen || isGeneticModalOpen) && (
					<aside className="forms-section">
						{isAddPlantFormOpen && <AddPlant />}
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
