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

	const abbreviate = (str, n) => str?.slice(0, n) || str

	if (!plants) return <p>...Cargando</p>

	return (
		<>
			<div className="inventory-table-component">
				<div className="table-head">
					<p>n°</p>
					<p>Nombre</p>
					<p>Ingreso</p>
					<p>Periodo</p>
					<p>Cambio de Ciclo</p>
					<p>Ultimo Riego</p>
				</div>
				<div className="table-body">
					{plants.map((each, idx) => (
						<div
							key={each._id}
							onClick={() => handlePlantSelection(each)}
							className={`table-row ${
								selectedPlant && selectedPlant._id === each._id
									? `selected ${theme}`
									: ''
							}`}
						>
							<p>{idx}</p>
							<p>{each.name}</p>
							<p>{formatDate(each.entryDate)}</p>
							<p>{abbreviate(translateField(each.stage), 3)}.</p>
							<p>{formatDate(each.estimatedChange)}</p>
							<p>{formatDate(each.lastWatered)}</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
