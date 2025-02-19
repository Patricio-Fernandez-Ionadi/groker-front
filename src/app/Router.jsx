import React from 'react'
import { Routes, Route } from 'react-router'

import { routes } from './index'

import { AddPlant, Inventory, PlantInfo, Detail } from '../Plants'
import { ProductList } from '../Products'

export const Router = () => {
	return (
		<Routes>
			<Route index element={<Inventory />} />

			<Route path={routes.plants.path}>
				<Route index element={<Inventory />} />
				<Route path={routes.plantAdd.path} element={<AddPlant />} />
				<Route path={routes.plantDetail.path} element={<PlantInfo />} />
			</Route>
			<Route path={routes.products.path} element={<ProductList />} />
		</Routes>
	)
}
