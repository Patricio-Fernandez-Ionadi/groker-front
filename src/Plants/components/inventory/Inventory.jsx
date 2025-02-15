import React, { useContext } from 'react'

import { FormContext } from '../../../app/context/FormContext'

import { usePlants } from '../..'

import { EditPlant } from '../edition/EditPlant'
import { InventoryTable } from './InventoryTable'
import { Link, useLocation } from 'react-router'

export const Inventory = () => {
	const { isEditPlantFormOpen, closeEditPlantForm } = useContext(FormContext)

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
				<>
					<p>Vaya! parece que aun no hay plantas en el inventario</p>
					<p>Añade una planta para comenzar.</p>

					{renderAddPlantButton()}
				</>
			)}

			{isEditPlantFormOpen && (
				<>
					<button onClick={closeEditPlantForm}>Cerrar</button>
					<EditPlant />
				</>
			)}
		</section>
	)
}
