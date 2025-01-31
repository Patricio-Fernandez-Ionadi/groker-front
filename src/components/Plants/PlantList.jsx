import React, { useContext } from 'react'
import { formatDate } from '../../utils/dateUtils'
import { AppContext } from '../../context/AppContext'
import { translateField } from '../../utils/translations'

/**
 * Componente que muestra la lista de plantas en el inventario.
 */
const PlantList = () => {
	const { state, deletePlant, selectPlant } = useContext(AppContext)

	if (state.plants.length > 0) {
		return (
			<div>
				<h2>Inventario de Plantas</h2>
				<table>
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
						{state.plants.map((plant) => (
							<tr
								key={plant._id}
								onClick={() => selectPlant(plant, 'details')}
								style={{
									cursor: 'pointer',
									backgroundColor:
										state.selectedPlant && state.selectedPlant._id === plant._id
											? 'lightblue'
											: 'transparent',
								}}
							>
								<td>{plant.name}</td>
								<td>{plant.genetic.name}</td>
								<td>{formatDate(plant.entryDate)}</td>
								<td>{translateField(plant.stage)}</td>
								<td>{formatDate(plant.estimatedChange)}</td>
								<td>{formatDate(plant.lastWatered)}</td>
								<td>{plant.underObservation ? 'Sí' : 'No'}</td>
								<td>
									<button
										onClick={(e) => {
											e.stopPropagation()
											selectPlant(plant, 'edit')
										}}
									>
										Editar
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation()
											deletePlant(plant._id)
										}}
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
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
