import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { formatDate } from '../utils/dateUtils'
import { translateField } from '../utils/translations'

export const PlantHistory = () => {
	const { selectedPlant } = useSelector((state) => state.plantsStore)

	if (!selectedPlant || selectedPlant.history.length === 0) return null

	const handleDeleteNote = (noteId) => {
		console.log(noteId) // -> loguea bien el id de la nota
	}

	const renderDetails = (type, details, date) => {
		switch (type) {
			case 'note':
				return (
					<>
						<p>Notas:</p>
						<ul>
							{details.map((note) => (
								<li key={note.id}>
									{note.note}{' '}
									<button onClick={() => handleDeleteNote(note.id)}>
										eliminar nota
									</button>
								</li>
							))}
						</ul>
					</>
				)
			case 'stage':
				return (
					<p>
						Cambio de etapa: {translateField(details)}
						{details === 'germination' && '🌱'}
						{details === 'vegetative' && '🌿'}
						{details === 'flowering' && '🌼'}
					</p>
				)

			case 'potSize':
				return <p>Tamaño de maceta: {details}L</p>

			case 'underObservation':
				return details && <p>Bajo observación 👁️</p>

			case 'isFinalPot':
				return details && <p>Maceta final ✔️</p>

			case 'estimatedChange':
				return <p>Cambio estimado: {formatDate(details)}</p>

			case 'genetic':
				return <p>Genética: {details}</p>

			case 'entryDate':
				return <p>Fecha de ingreso: {formatDate(details)}</p>

			case 'temperature':
				return <p>Temperatura: {details}° 🌡️</p>

			case 'humidity':
				return <p>Humedad: {details}% 💦</p>

			case 'watering':
				return (
					<>
						<p>
							Último riego: {formatDate(date)} 💧
							{details.amount && details.amount !== 0 && (
								<span> {details.amount / 1000}Lts</span>
							)}
						</p>
						{details.ph && <p>PH: {details.ph}</p>}
						{details.ec && <p>EC: {details.ec}</p>}

						{details.productsUsed?.length > 0 && (
							<>
								<p>Productos usados:</p>
								<ul>
									{details.productsUsed.map((each) => (
										<li key={each.product._id}>
											{each.product.name} {each.amount}ml
										</li>
									))}
								</ul>
							</>
						)}
					</>
				)

			case 'name':
				return <p>Nombre: {details}</p>

			default:
				return <p>Campo de cambio no manejado avisar al desarrollador</p>
		}
	}

	return (
		<section className="plant-history-component">
			<h2>Historial de la Planta</h2>
			{[...selectedPlant.history]
				.sort((a, b) => new Date(b.date) - new Date(a.date))
				.map((entry) => (
					<div key={entry._id} className="history-entry">
						<h3>{formatDate(entry.date)}</h3>
						<ul>
							{entry.events.map((event, eventIndex) => (
								<li key={eventIndex}>
									{renderDetails(
										event.type,
										event.details,
										selectedPlant.lastWatered
									)}
								</li>
							))}
						</ul>
					</div>
				))}
		</section>
	)
}
