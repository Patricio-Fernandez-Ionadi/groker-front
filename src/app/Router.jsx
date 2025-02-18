import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'

import { useTheme } from './context/ThemeContext'
import { GeneticsModal, GenModalContext } from '../Genetics'

import { App } from './App'
import { Header, routes } from './index'
import { AddPlant, Inventory, PlantInfo, Detail } from '../Plants'
import { ProductList } from '../Products'

export const Router = () => {
	const { isGeneticModalOpen } = useContext(GenModalContext)
	const { theme } = useTheme()

	return (
		<div className={`app-container ${theme}`}>
			<Header />
			{isGeneticModalOpen && (
				<aside className="forms-section">
					{isGeneticModalOpen && <GeneticsModal />}
				</aside>
			)}
			<Routes>
				<Route index element={<App />} />

				<Route path={routes.plants}>
					<Route
						index
						element={
							<>
								<Inventory />
								<Detail />
							</>
						}
					/>
					<Route path={routes.plantAdd} element={<AddPlant />} />
					<Route path=":id" element={<PlantInfo />} />
				</Route>
				<Route path={routes.products} element={<ProductList />} />
			</Routes>
		</div>
	)
}
