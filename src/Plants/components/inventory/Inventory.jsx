import React from 'react'
import { Link, useLocation } from 'react-router'

import { Button, useTheme } from '../../../app'

import { Detail, usePlants } from '../..'

import { InventoryTable } from './InventoryTable'
import { InventoryEmpty } from './InventoryEmpty'

export const Inventory = () => {
	const location = useLocation()
	const { plants } = usePlants()
	const { theme } = useTheme()

	const renderAddPlantButton = () => (
		<Button>
			<Link to="/plants/ingreso" state={{ from: location.pathname }}>
				Añadir Planta
			</Link>
		</Button>
	)

	if (!plants) return <p>...Cargando</p>

	return (
		<main>
			<section className={`inventory-component ${theme}`}>
				<div className={`inventory-table-container ${theme}`}>
					<h2>Inventario de Plantas</h2>
					{plants.length > 0 && <>{renderAddPlantButton()}</>}
					{plants.length > 0 ? (
						<>
							<InventoryTable theme={theme} />
						</>
					) : (
						<InventoryEmpty>{renderAddPlantButton()}</InventoryEmpty>
					)}
				</div>
				<Detail />
			</section>
		</main>
	)
}
