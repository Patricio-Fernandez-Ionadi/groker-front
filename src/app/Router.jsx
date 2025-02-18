import React from 'react'
import { Routes, Route } from 'react-router'

import { routes } from './index'

import { AddPlant, Inventory, PlantInfo, Detail } from '../Plants'
import { ProductList } from '../Products'

export const Router = () => {
	return (
		<Routes>
			<Route
				index
				element={
					<main className="main-content">
						<Inventory />
						<Detail />
					</main>
				}
			/>

			<Route path={routes.plants.path}>
				<Route
					index
					element={
						<>
							<Inventory />
							<Detail />
						</>
					}
				/>
				<Route path={routes.plantAdd.path} element={<AddPlant />} />
				<Route path={routes.plantDetail.path} element={<PlantInfo />} />
			</Route>
			<Route path={routes.products.path} element={<ProductList />} />
		</Routes>
	)
}
