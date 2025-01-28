import React, { useContext } from 'react'
import { PlantContext } from '../context/PlantContext'

/**
 * Componente que muestra la lista de plantas en el inventario.
 */
const PlantList = () => {
	const { plants, deletePlant, selectPlant } = useContext(PlantContext)

	return (
		<div>
			<h2>Inventario de Plantas</h2>
			<ul>
				{plants.map((plant) => (
					<li key={plant.id}>
						{plant.name}
						<button onClick={() => selectPlant(plant, 'details')}>
							Ver Detalles
						</button>
						<button onClick={() => selectPlant(plant, 'edit')}>Editar</button>
						<button onClick={() => deletePlant(plant.id)}>Eliminar</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PlantList
