import React from 'react'
import { Link, useLocation } from 'react-router'
import { Button } from 'Groker/components'

import { useTheme } from '../../../app'

import { Detail, usePlants } from '../..'

import { InventoryTable } from './InventoryTable'
import { InventoryEmpty } from './InventoryEmpty'
import { InventorySkeleton } from './InventorySkeleton'

export const Inventory = () => {
	const location = useLocation()
	const { plants } = usePlants()
	const { theme } = useTheme()

	const renderAddPlantButton = () => (
		<Button theme={theme}>
			<Link to="/plants/ingreso" state={{ from: location.pathname }}>
				Añadir Planta
			</Link>
		</Button>
	)

	if (!plants) return <InventorySkeleton />

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
