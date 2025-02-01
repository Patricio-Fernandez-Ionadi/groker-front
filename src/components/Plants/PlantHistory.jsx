import React, { useContext } from 'react'
import { PlantContext } from '../../context/PlantContext'
import { formatDate } from '../../utils/dateUtils'

/**
 * Componente que muestra el historial de cambios de una planta específica.
 */
const PlantHistory = () => {
	const { history, deleteNote, selectedPlant } = useContext(PlantContext)

	const handleDeleteNote = (historyIndex, noteIndex) => {
		deleteNote(selectedPlant.id, historyIndex, noteIndex)
	}

	return (
		<div>
			<h2>Historial de la Planta</h2>
			{history
				.slice()
				.reverse()
				.map((entry, historyIndex) => (
					<div key={historyIndex}>
						<h3>{formatDate(entry.date)}</h3>
						<ul>
							{entry.changes.map((change, noteIndex) => (
								<li key={noteIndex}>
									{change}
									{change.startsWith('Nota:') && (
										<button
											onClick={() => handleDeleteNote(historyIndex, noteIndex)}
										>
											Eliminar
										</button>
									)}
								</li>
							))}
						</ul>
					</div>
				))}
		</div>
	)
}

export default PlantHistory
