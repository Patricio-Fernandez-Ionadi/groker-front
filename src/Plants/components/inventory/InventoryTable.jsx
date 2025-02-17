import React, { useContext } from 'react'

import { Eye_icon } from '../../../app'
import { FormContext } from '../../../app/context/FormContext'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { formatDate, translateField, usePlants } from '../../'

export const InventoryTable = ({ theme }) => {
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
		<table className={`inventory-table ${theme}`}>
			<thead>
				<tr>
					<th className={theme}>Nombre</th>
					<th className={theme}>Genética</th>
					<th className={theme}>Ingreso</th>
					<th className={theme}>Etapa</th>
					<th className={theme}>Cambio de Ciclo</th>
					<th className={theme}>Último Riego</th>
					<th className={theme}>En Observación</th>
				</tr>
			</thead>
			<tbody>
				{plants.map((plant) => (
					<tr
						key={plant._id}
						onClick={() => handlePlantSelection(plant)}
						className={`${
							selectedPlant && selectedPlant._id === plant._id
								? `selected ${theme}`
								: ''
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
