import React, { useContext } from 'react'

import { Eye_icon } from '../../../app'
import { FormContext } from '../../../app/context/FormContext'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { formatDate, translateField, usePlants } from '../../'

export const InventoryTable = () => {
	const { isEditPlantFormOpen, closeEditPlantForm } = useContext(FormContext)

	const { plants, selectedPlant } = usePlants()
	const { selectPlant, unselectPlant } = usePlantsActions()

	const handlePlantSelection = (plant) => {
		if (!selectedPlant || selectedPlant._id !== plant._id) {
			selectPlant(plant)
		} else if (selectedPlant._id === plant._id) {
			unselectPlant()
		}
		if (isEditPlantFormOpen) closeEditPlantForm()
	}

	const abbreviate = (str, n) => str.slice(0, n)

	if (!plants) return <p>...Cargando</p>

	return (
		<table className="inventory-table">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Genética</th>
					<th>Ingreso</th>
					<th>Etapa</th>
					<th>Cambio de Ciclo</th>
					<th>Último Riego</th>
					<th>En Observación</th>
				</tr>
			</thead>
			<tbody>
				{plants.map((plant) => (
					<tr
						key={plant._id}
						onClick={() => handlePlantSelection(plant)}
						className={`${
							selectedPlant && selectedPlant._id === plant._id ? 'selected' : ''
						}`}
					>
						<td>{plant.name}</td>
						<td>{abbreviate(plant.genetic.name, 4)}.</td>
						<td>{formatDate(plant.entryDate)}</td>
						<td>{abbreviate(translateField(plant.stage), 3)}.</td>
						<td>{formatDate(plant.estimatedChange)}</td>
						<td>{formatDate(plant.lastWatered)}</td>
						<td>{plant.flags.underObservation && <Eye_icon />}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
