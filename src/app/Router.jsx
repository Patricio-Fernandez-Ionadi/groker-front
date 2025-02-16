import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'

import { useTheme } from './context/ThemeContext'
import { GeneticsModal, GenModalContext } from '../Genetics'

import { Header } from './components/Header'

import { App } from './App'

import { AddPlant, PlantInfo } from '../Plants'
import { ProductList } from '../Products'

export const Router = () => {
	const { isGeneticModalOpen } = useContext(GenModalContext)
	const { theme } = useTheme()

	return (
		<div className={`app-container ${theme}`}>
			<Header theme={theme} />
			{isGeneticModalOpen && (
				<aside className="forms-section">
					{isGeneticModalOpen && <GeneticsModal theme={theme} />}
				</aside>
			)}
			<Routes>
				<Route index element={<App theme={theme} />} />
				<Route path="/plants/ingreso" element={<AddPlant theme={theme} />} />
				<Route path="/plants/:id" element={<PlantInfo theme={theme} />} />
				<Route path="/products" element={<ProductList theme={theme} />} />
			</Routes>
		</div>
	)
}
