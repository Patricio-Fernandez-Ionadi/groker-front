import React, { useContext } from 'react'
import { PlantContext } from '../context/PlantContext'
import { formatDate } from '../utils/dateUtils'

/**
 * Componente que muestra la lista de plantas en el inventario.
 */
const PlantList = () => {
	const { plants, deletePlant, selectPlant } = useContext(PlantContext)

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
					{plants.map((plant) => (
						<tr key={plant.id} onClick={() => selectPlant(plant, 'details')}>
							<td>{plant.name}</td>
							<td>{plant.genetic}</td>
							<td>{formatDate(plant.entryDate)}</td>
							<td>{plant.stage}</td>
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
										deletePlant(plant.id)
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
}

export default PlantList
