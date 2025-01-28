import React, { useContext } from 'react'
import { PlantContext } from '../context/PlantContext'
import { formatDate } from '../utils/dateUtils'

/**
 * Componente que muestra los detalles de una planta específica.
 */
const PlantDetails = () => {
	const { selectedPlant } = useContext(PlantContext)

	if (!selectedPlant)
		return <div>Seleccione una planta para ver los detalles</div>

	return (
		<div>
			<h2>Detalles de la Planta</h2>
			<p>Fecha de ingreso: {formatDate(selectedPlant.entryDate)}</p>
			<p>Nombre: {selectedPlant.name}</p>
			<p>Genética: {selectedPlant.genetic}</p>
			<p>Etapa: {selectedPlant.stage}</p>
			<p>Cambio estimado: {formatDate(selectedPlant.estimatedChange)}</p>
			<p>Último riego: {formatDate(selectedPlant.lastWatered)}</p>
			<p>Tamaño de la maceta: {selectedPlant.potSize}</p>
			<p>Maceta final: {selectedPlant.isFinalPot ? 'Sí' : 'No'}</p>
			<p>Bajo observación: {selectedPlant.underObservation ? 'Sí' : 'No'}</p>
		</div>
	)
}

export default PlantDetails
