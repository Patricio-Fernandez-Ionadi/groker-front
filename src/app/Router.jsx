import React from 'react'
import { Routes, Route } from 'react-router'

import { App } from './App'
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
	)
}
