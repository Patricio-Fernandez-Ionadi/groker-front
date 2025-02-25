import React, { useContext } from 'react'
import { Link } from 'react-router'
import { calendarFormat } from 'groker/date'
import { Button } from 'groker/components'

import { FormContext, routes } from '@/app'

import { usePlantsActions, translateField, usePlants } from '@/Plants'

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

	const isUpdateDue = (toCheck) => {
		return (
			new Date(toCheck) <=
			new Date(new Date().setDate(new Date().getDate() - 3))
		)
	}
	// console.log(isUpdateDue({ estimatedChange: '2025-02-20' }))
	// isUpdateDue(plants[0])

	const selectedStyles = (p) =>
		selectedPlant && selectedPlant._id === p._id ? `selected` : ''

	const wateringPendStyles = (p) =>
		isUpdateDue(p.lastWatered) ? 'watering-due' : ''

	const rowClasses = (p) =>
		`table-row ${selectedStyles(p)} ${wateringPendStyles(p)} ${theme}`

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
					<p>Revision</p>
					<p>Acciones</p>
				</div>
				<div className="table-body">
					{plants.map((each, idx) => (
						<div
							key={each._id}
							onClick={() => handlePlantSelection(each)}
							className={`${rowClasses(each)}`}
						>
							<p>{idx + 1}</p>
							<p>{each.name}</p>
							<p>{calendarFormat(each.entryDate)}</p>
							<p>{abbreviate(translateField(each.stage), 3)}.</p>
							<p>{calendarFormat(each.estimatedChange)}</p>
							<p>{calendarFormat(each.lastWatered)}</p>
							<p>
								{isUpdateDue(each.lastWatered) && '💦'}
								{isUpdateDue(each.estimatedChange) && '🌱'}
								{each.flags.underObservation && '👁️'}
								{!isUpdateDue(each.lastWatered) &&
									!isUpdateDue(each.estimatedChange) &&
									!each.flags.underObservation &&
									'-'}
							</p>
							<p>
								{selectedPlant && selectedPlant._id === each._id ? (
									<Button theme={theme}>
										<Link to={routes.plantDetail.buildPath(each._id)}>
											Editar
										</Link>
									</Button>
								) : null}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
