import React, { useContext } from 'react'

import { FormContext } from './'

import { GenModalContext, useGenetics, GeneticsModal } from '../Genetics'

import { AddPlant, usePlants, Inventory, Detail, PlantHistory } from '../Plants'

import { useProducts } from '../Products'

export const App = () => {
	const { isAddPlantFormOpen } = useContext(FormContext)
	const { isGeneticModalOpen } = useContext(GenModalContext)

	const plantsState = usePlants()
	const geneticsState = useGenetics()
	const productsState = useProducts()

	if (!geneticsState.loaded && !productsState.loaded && !plantsState.loaded) {
		return <div>CARGANDO APP...</div>
	}
	/* 	console.log({
		genetics: geneticsState,
		products: productsState,
		plants: plantsState,
	}) */

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
					<Inventory />
					<Detail />
					<PlantHistory />
				</main>
			</div>
		</>
	)
}
