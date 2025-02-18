import React from 'react'
import { useTheme } from './context/ThemeContext'

import { useProducts } from '../Products'
import { GeneticsModal, GenModalContext, useGenetics } from '../Genetics'

import { Header } from './components/layout/Header'
import { usePlants, Inventory, Detail } from '../Plants'
import { Router } from './Router'

export const App = () => {
	const { theme } = useTheme()
	const plantsState = usePlants()
	const geneticsState = useGenetics()
	const productsState = useProducts()

	const { isGeneticModalOpen } = React.useContext(GenModalContext)

	if (!geneticsState.loaded && !productsState.loaded && !plantsState.loaded) {
		return <div>CARGANDO APP...</div>
	}

	return (
		<div className={`app-container ${theme}`}>
			<Header />
			{isGeneticModalOpen && (
				<aside className="forms-section">
					{isGeneticModalOpen && <GeneticsModal />}
				</aside>
			)}
			<Router />
		</div>
	)
}
