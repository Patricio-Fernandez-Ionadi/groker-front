import React from 'react'
import { Link } from 'react-router'

import { Button, routes } from '../../../app'

import { formatDate, translateField, usePlants } from '../../'

export const PlantDetails = () => {
	const { selectedPlant } = usePlants()

	return (
		<>
			<h2>Detalles de la Planta</h2>
			<Button>
				<Link
					to={routes.plantDetail.buildPath(selectedPlant._id)}
					state={{ from: location.pathname }}
				>
					Ver más sobre esta planta
				</Link>
			</Button>
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
		</>
	)
}
