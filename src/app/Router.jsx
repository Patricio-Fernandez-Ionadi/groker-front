import React from 'react'
import { Routes, Route } from 'react-router'
import { App } from './App'

import { Header } from './components/Header'

import { AddPlant, Inventory } from '../Plants'
import { ProductList } from '../Products'

export const Router = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={<App />} />

				<Route path="/plants/ingreso" element={<AddPlant />} />
				<Route path="/products" element={<ProductList />} />
			</Routes>
		</>
	)
}
