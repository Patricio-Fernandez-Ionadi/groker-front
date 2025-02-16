import React from 'react'
import { Link, useLocation } from 'react-router'

import { usePlants } from '../..'

import { InventoryTable } from './InventoryTable'
import { InventoryEmpty } from './InventoryEmpty'

export const Inventory = () => {
	const location = useLocation()
	const { plants } = usePlants()

	const renderAddPlantButton = () => {
		return (
			<button>
				<Link to="/plants/ingreso" state={{ from: location.pathname }}>
					Añadir Planta
				</Link>
			</button>
		)
	}

	if (!plants) return <p>...Cargando</p>

	return (
		<section className="plant-list-component">
			{plants.length > 0 && <>{renderAddPlantButton()}</>}
			<h2>Inventario de Plantas</h2>
			{plants.length > 0 ? (
				<InventoryTable />
			) : (
				<InventoryEmpty>{renderAddPlantButton()}</InventoryEmpty>
			)}
		</section>
	)
}
