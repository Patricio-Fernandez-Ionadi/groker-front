import React from 'react'

import { formatDate } from '../utils/dateUtils'
import { translateField } from '../utils/translations'
import { useSelector } from 'react-redux'

export const PlantDetails = () => {
	const { selectedPlant } = useSelector((state) => state.plantsStore)

	if (!selectedPlant) return null
	/* <div>Seleccione una planta para ver los detalles</div> */

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
			{selectedPlant.potSize !== 0 && (
				<p>Tamaño de la maceta: {selectedPlant.potSize}L</p>
			)}
			{selectedPlant.potSize !== 0 && selectedPlant.flags.isFinalPot && (
				<p>Maceta final: ✔️</p>
			)}
			{selectedPlant.flags.underObservation && <p>Bajo observación: 👁️</p>}
		</section>
	)
}
