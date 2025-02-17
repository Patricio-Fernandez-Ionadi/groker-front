import React from 'react'
import { Link, useLocation } from 'react-router'

import { Button } from '../../../app'

import { usePlants } from '../..'

import { InventoryTable } from './InventoryTable'
import { InventoryEmpty } from './InventoryEmpty'

export const Inventory = ({ theme }) => {
	const location = useLocation()
	const { plants } = usePlants()

	const renderAddPlantButton = () => (
		<Button>
			<Link to="/plants/ingreso" state={{ from: location.pathname }}>
				Añadir Planta
			</Link>
		</Button>
	)

	if (!plants) return <p>...Cargando</p>

	return (
		<section className={`plant-list-component ${theme}`}>
			{plants.length > 0 && <>{renderAddPlantButton()}</>}
			<h2>Inventario de Plantas</h2>
			{plants.length > 0 ? (
				<InventoryTable theme={theme} />
			) : (
				<InventoryEmpty>{renderAddPlantButton()}</InventoryEmpty>
			)}
		</section>
	)
}
