import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'

import { GeneticsModal, GenModalContext } from '../Genetics'

import { Header } from './components/Header'

import { App } from './App'

import { AddPlant, PlantInfo } from '../Plants'
import { ProductList } from '../Products'

export const Router = () => {
	const { isGeneticModalOpen } = useContext(GenModalContext)
	return (
		<div className="app-container">
			<Header />
			{isGeneticModalOpen && (
				<aside className="forms-section">
					{isGeneticModalOpen && <GeneticsModal />}
				</aside>
			)}
			<Routes>
				<Route index element={<App />} />
				<Route path="/plants/ingreso" element={<AddPlant />} />
				<Route path="/plants/:id" element={<PlantInfo />} />
				<Route path="/products" element={<ProductList />} />
			</Routes>
		</div>
	)
}
