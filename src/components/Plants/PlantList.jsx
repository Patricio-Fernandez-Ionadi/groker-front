import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { FormContext } from '../../context/FormContext'
import { PlantsFormsEditProvider } from '../../context/plants/PlantEditContext'

import EditPlant from './edition/EditPlant'

import { formatDate } from '../../utils/dateUtils'
import { translateField } from '../../utils/translations'

/**
 * Componente que muestra la lista de plantas en el inventario.
 */
const PlantList = () => {
	const { state, deletePlant, selectPlant } = useContext(AppContext)
	const { isEditPlantFormOpen, closeEditPlantForm, openEditPlantForm } =
		useContext(FormContext)

	const { plants } = state

	const handleEditForm = (e, plant, open) => {
		e.stopPropagation()
		open ? openEditPlantForm() : closeEditPlantForm()
		selectPlant(plant)
	}
	const handleDeletePlant = (e, plant) => {
		e.stopPropagation()
		deletePlant(plant._id)
	}

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
								onClick={() => selectPlant(plant)}
								className={`${
									state.selectedPlant && state.selectedPlant._id === plant._id
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
									{isEditPlantFormOpen &&
									state.selectedPlant._id === plant._id ? (
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
						<PlantsFormsEditProvider>
							<EditPlant />
						</PlantsFormsEditProvider>
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

export default PlantList
