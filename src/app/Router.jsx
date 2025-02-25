import React from 'react'
import { Routes, Route } from 'react-router'

import { ProductList } from '@/Products'
import { AddPlant, Inventory, PlantInfo } from '@/Plants'
import { Minerales } from '@/Carencias'

import { RouteNotFound } from './components/layout/RouteNotFound'

import { routes } from './index'

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
			<Route path={routes.minerales.path} element={<Minerales />} />
			<Route path="*" element={<RouteNotFound />} />
		</Routes>
	)
}
