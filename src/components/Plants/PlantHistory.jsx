import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { formatDate } from '../../utils/dateUtils'
import { translateField } from '../../utils/translations'

/**
 * Componente que muestra el historial de cambios de una planta específica.
 */
const PlantHistory = () => {
	const { state } = useContext(AppContext)
	const { selectedPlant } = state
	if (!selectedPlant) return null

	const renderDetails = (type, details, date) => {
		switch (type) {
			case 'note':
				return (
					<>
						<p>Notas:</p>
						<ul>
							{details.map((note) => (
								<li key={note.id}>
									{note.note} <button>eliminar nota</button>
								</li>
							))}
						</ul>
					</>
				)
			case 'stage':
				return <p>Cambio de etapa: {translateField(details)}</p>

			case 'potSize':
				return <p>Tamaño de maceta: {details}L</p>

			case 'underObservation':
				return details && <p>Bajo observación</p>

			case 'isFinalPot':
				return <p>Maceta final {details ? '✔️' : '❌'}</p>

			case 'estimatedChange':
				return <p>Cambio estimado: {formatDate(details)}</p>

			case 'genetic':
				return <p>Genética: {details.name}</p>

			case 'entryDate':
				return <p>Fecha de ingreso: {formatDate(details)}</p>

			case 'temperature':
				return <p>Temperatura: {details}°</p>

			case 'humidity':
				return <p>Humedad: {details}%</p>

			case 'watering':
				return (
					<>
						<p>Último riego: {formatDate(date)}</p>
						{details.ph && <p>PH: {details.ph}</p>}
						{details.ec && <p>EC: {details.ec}</p>}

						{details.productsUsed.length > 0 && (
							<>
								<p>Productos usados:</p>
								<ul>
									{details.productsUsed.map((each) => (
										<li key={each.product._id}>
											{each.product.name} {each.productAmount}ml
										</li>
									))}
								</ul>
							</>
						)}
					</>
				)

			default:
				return <p> probablemente sea riego</p>
		}
	}

	return (
		<section className="plant-history-component">
			<h2>Historial de la Planta</h2>
			{selectedPlant.history.length > 0 &&
				[...selectedPlant.history]
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

export default PlantHistory
