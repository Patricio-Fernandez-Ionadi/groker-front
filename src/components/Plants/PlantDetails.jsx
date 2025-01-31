import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

import { formatDate } from '../../utils/dateUtils'
import { translateField } from '../../utils/translations'

/**
 * Componente que muestra los detalles de una planta específica.
 */
const PlantDetails = () => {
	const { state } = useContext(AppContext)
	const selectedPlant = state.selectedPlant

	if (!selectedPlant)
		return <div>Seleccione una planta para ver los detalles</div>

	return (
		<div>
			<h2>Detalles de la Planta</h2>
			<p>Fecha de ingreso: {formatDate(selectedPlant.entryDate)}</p>
			<p>Nombre: {selectedPlant.name}</p>
			<p>Genética: {selectedPlant.genetic.name}</p>
			<p>Etapa: {translateField(selectedPlant.stage)}</p>
			<p>Cambio estimado: {formatDate(selectedPlant.estimatedChange)}</p>
			{/* <p>Último riego: {formatDate(selectedPlant.lastWatered)}</p> */}
			<p>Tamaño de la maceta: {selectedPlant.potSize}L</p>
			<p>Maceta final: {selectedPlant.flags.isFinalPot ? 'Sí' : 'No'}</p>
			<p>
				Bajo observación: {selectedPlant.flags.underObservation ? 'Sí' : 'No'}
			</p>
		</div>
	)
}

export default PlantDetails
