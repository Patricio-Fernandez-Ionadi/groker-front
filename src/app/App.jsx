import React from 'react'

import { useProducts } from '../Products'
import { useGenetics } from '../Genetics'

import { Detail } from './index'
import { usePlants, Inventory } from '../Plants'

export const App = ({ theme }) => {
	const plantsState = usePlants()
	const geneticsState = useGenetics()
	const productsState = useProducts()

	if (!geneticsState.loaded && !productsState.loaded && !plantsState.loaded) {
		return <div>CARGANDO APP...</div>
	}

	return (
		<main className="main-content">
			<Inventory theme={theme} />
			<Detail theme={theme} />
		</main>
	)
}
