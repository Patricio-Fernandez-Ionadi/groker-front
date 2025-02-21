import React from 'react'
import { Link } from 'react-router'

import { Button, routes } from '../../../app'

import { formatDate, translateField, usePlants } from '../../'

export const PlantDetails = () => {
	const { selectedPlant } = usePlants()

	return (
		<>
			<header className="plant-details-header">
				<h2 className="plant-details-title">Detalles de la Planta</h2>
				<Button className="plant-details-button">
					<Link
						to={routes.plantDetail.buildPath(selectedPlant._id)}
						state={{ from: location.pathname }}
					>
						Ver más sobre esta planta
					</Link>
				</Button>
			</header>
			<div className="plant-details-info">
				<p className="plant-details-item">
					Fecha de ingreso: <span>{formatDate(selectedPlant.entryDate)}</span>
				</p>
				<p className="plant-details-item">
					Nombre: <span>{selectedPlant.name}</span>
				</p>
				<p className="plant-details-item">
					Etapa: <span>{translateField(selectedPlant.stage)}</span>
				</p>
				<p className="plant-details-item">
					Genética: <span>{selectedPlant.genetic.name}</span>
				</p>
				<p className="plant-details-item">
					Cambio estimado:{' '}
					<span>{formatDate(selectedPlant.estimatedChange)}</span>
				</p>
				{selectedPlant.lastWatered && (
					<p className="plant-details-item">
						Último riego: <span>{formatDate(selectedPlant.lastWatered)}</span>
					</p>
				)}
				{selectedPlant.potSize !== 0 && (
					<p className="plant-details-item">
						Tamaño de la maceta: <span>{selectedPlant.potSize}L</span>
					</p>
				)}
				{selectedPlant.potSize !== 0 && selectedPlant.flags.isFinalPot && (
					<p className="plant-details-item">
						Maceta final: <span>✔️</span>
					</p>
				)}
				{selectedPlant.flags.underObservation && (
					<p className="plant-details-item">
						Bajo observación: <span>👁️</span>
					</p>
				)}
			</div>
		</>
	)
}
