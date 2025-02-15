import React from 'react'
import { Routes, Route } from 'react-router'
import { App } from './App'

import { ProductList } from '../Products'
import { Header } from './components/Header'

export const Router = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={<App />} />
				<Route path="/products" element={<ProductList />} />
			</Routes>
		</>
	)
}
