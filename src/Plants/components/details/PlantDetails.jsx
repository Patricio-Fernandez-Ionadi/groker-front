import React from 'react'
import { Link } from 'react-router'
import { calendarFormat } from 'groker/date'
import { Button } from 'groker/components'
import { Eye } from 'groker/icons'

import { routes, useTheme, usePath } from '@/app'

import { translateField, usePlants } from '@/Plants'

export const PlantDetails = () => {
	const { selectedPlant } = usePlants()
	const { theme } = useTheme()
	const path = usePath()

	return (
		<>
			<header className="plant-details-header">
				<h2 className="plant-details-title">Detalles de la Planta</h2>
				<Button className="plant-details-button" theme={theme}>
					<Link
						to={routes.plantDetail.buildPath(selectedPlant._id)}
						state={{ from: path }}
					>
						Ver más sobre esta planta
					</Link>
				</Button>
			</header>
			<div className="plant-details-info">
				<p className="plant-details-item">
					Fecha de ingreso:{' '}
					<span>{calendarFormat(selectedPlant.entryDate)}</span>
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
					<span>{calendarFormat(selectedPlant.estimatedChange)}</span>
				</p>
				{selectedPlant.lastWatered && (
					<p className="plant-details-item">
						Último riego:{' '}
						<span>{calendarFormat(selectedPlant.lastWatered)}</span>
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
						Bajo observación: <span>{<Eye size={20} />}</span>
					</p>
				)}
			</div>
		</>
	)
}
