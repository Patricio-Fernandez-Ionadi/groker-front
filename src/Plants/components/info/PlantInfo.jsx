import React from 'react'

import { formatDate, translateField, usePlants } from '../../'
import { useParams } from 'react-router'

export function PlantInfo() {
	const plantId = useParams().id
	const { plants } = usePlants()

	const plant = plants.find((plant) => plant._id === plantId)

	console.log(plant)
	if (!plant) return <p>Parece que la planta no existe</p>
	return (
		<>
			<h2>{plant.name}</h2>
			<p>Fecha de ingreso: {formatDate(plant.entryDate)}</p>
			<p>Genética: {plant.genetic.name}</p>
			<p>Periodo: {translateField(plant.stage)}</p>
			<p>Cambio estimado: {formatDate(plant.estimatedChange)}</p>
			{plant.potSize !== 0 && (
				<p>
					<span>Tamaño de la maceta: {plant.potSize}L</span> -{' '}
					<span>Maceta final: {plant.flags.isFinalPot ? '✔️' : '❌'}</span>
				</p>
			)}
			{plant.lastWatered && (
				<p>Último riego: {formatDate(plant.lastWatered)}</p>
			)}
		</>
	)
}
