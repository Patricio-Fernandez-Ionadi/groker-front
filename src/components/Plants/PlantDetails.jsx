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
		<section className="plant-details-component">
			<h2>Detalles de la Planta</h2>
			<p>Fecha de ingreso: {formatDate(selectedPlant.entryDate)}</p>
			<p>Nombre: {selectedPlant.name}</p>
			<p>Etapa: {translateField(selectedPlant.stage)}</p>
			<p>Genética: {selectedPlant.genetic.name}</p>
			<p>Cambio estimado: {formatDate(selectedPlant.estimatedChange)}</p>
			{selectedPlant.lastWatered && (
				<p>Último riego: {formatDate(selectedPlant.lastWatered)}</p>
			)}
			{selectedPlant.potSize && (
				<p>Tamaño de la maceta: {selectedPlant.potSize}L</p>
			)}
			{selectedPlant.potSize && selectedPlant.flags.isFinalPot && (
				<p>Maceta final: ✔️</p>
			)}
			{selectedPlant.flags.underObservation && <p>Bajo observación: 👁️</p>}
		</section>
	)
}

export default PlantDetails
