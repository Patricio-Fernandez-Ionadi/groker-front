import React, { useContext } from 'react'

import { FormContext } from '../../../app/context/FormContext'

import { formatDate, translateField, usePlants } from '../..'

import { EditPlant } from '../edition/EditPlant'
import { usePlantsActions } from '../../hooks/usePlantsActions'

export const PlantList = () => {
	const { isEditPlantFormOpen, closeEditPlantForm, openEditPlantForm } =
		useContext(FormContext)

	const { plants, selectedPlant } = usePlants()
	const { selectPlant, unselectPlant, deletePlant } = usePlantsActions()

	const handlePlantSelection = (plant) => {
		if (!selectedPlant) {
			selectPlant(plant)
		} else if (selectedPlant._id === plant._id) {
			if (isEditPlantFormOpen) closeEditPlantForm()
			unselectPlant()
		}
	}

	const handleEditForm = (e, plant, open) => {
		e.stopPropagation()
		open ? openEditPlantForm() : closeEditPlantForm()
		selectPlant(plant)
	}
	const handleDeletePlant = (e, plant) => {
		e.stopPropagation()
		deletePlant(plant._id)
	}

	if (!plants) return <p>...Cargando</p>

	if (plants.length > 0) {
		return (
			<section className="plant-list-component">
				<h2>Inventario de Plantas</h2>
				<table className="inventory-table">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Genética</th>
							<th>Fecha de Ingreso</th>
							<th>Etapa</th>
							<th>Cambio de Ciclo</th>
							<th>Último Riego</th>
							<th>En Observación</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{plants.map((plant) => (
							<tr
								key={plant._id}
								onClick={() => handlePlantSelection(plant)}
								className={`${
									selectedPlant && selectedPlant._id === plant._id
										? 'selected'
										: ''
								}`}
							>
								<td>{plant.name}</td>
								<td>{plant.genetic.name}</td>
								<td>{formatDate(plant.entryDate)}</td>
								<td>{translateField(plant.stage)}</td>
								<td>{formatDate(plant.estimatedChange)}</td>
								<td>{formatDate(plant.lastWatered)}</td>
								<td>{plant.flags.underObservation ? '👁️' : '-'}</td>
								<td>
									{isEditPlantFormOpen && selectedPlant._id === plant._id ? (
										<button
											className="table-buttons"
											onClick={(e) => handleEditForm(e, plant, false)}
										>
											Cancelar
										</button>
									) : (
										<button
											className="table-buttons"
											onClick={(e) => handleEditForm(e, plant, true)}
										>
											Editar
										</button>
									)}
									<button
										className="table-buttons"
										onClick={(e) => handleDeletePlant(e, plant)}
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{isEditPlantFormOpen && (
					<>
						<button onClick={closeEditPlantForm}>Cerrar</button>
						<EditPlant />
					</>
				)}
			</section>
		)
	} else {
		return (
			<div>
				<h2>Inventario de Plantas</h2>

				<p>No hay plantas en el inventario</p>
			</div>
		)
	}
}
