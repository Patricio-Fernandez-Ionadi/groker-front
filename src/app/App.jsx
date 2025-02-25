import React from 'react'
import { useTheme } from './context/ThemeContext'

import { useProducts } from '../Products'
import { GeneticsModal, GenModalContext, useGenetics } from '../Genetics'

import { Header } from './components/layout/Header'
import { usePlants } from '../Plants'
import { Router } from './Router'
import { InventorySkeleton } from '@/Plants/components/inventory/InventorySkeleton'
import { GoTopButton } from './components/layout/navigation/GoTopButton'

export const App = () => {
	const { theme } = useTheme()
	const plantsState = usePlants()
	const geneticsState = useGenetics()
	const productsState = useProducts()

	const { isGeneticModalOpen } = React.useContext(GenModalContext)

	if (!geneticsState.loaded && !productsState.loaded && !plantsState.loaded) {
		return <InventorySkeleton />
	}

	return (
		<div className={`app-container ${theme}`}>
			<Header />
			{isGeneticModalOpen && (
				<aside>{isGeneticModalOpen && <GeneticsModal />}</aside>
			)}
			<Router />
			<GoTopButton />
		</div>
	)
}
