import React from 'react'

import { useProducts } from '../Products'
import { useGenetics } from '../Genetics'

import { usePlants, Inventory, Detail } from '../Plants'

export const App = () => {
	const plantsState = usePlants()
	const geneticsState = useGenetics()
	const productsState = useProducts()

	if (!geneticsState.loaded && !productsState.loaded && !plantsState.loaded) {
		return <div>CARGANDO APP...</div>
	}

	return (
		<main className="main-content">
			<Inventory />
			<Detail />
		</main>
	)
}
