import React, { useContext } from 'react'
import { PlantContext } from '../context/PlantContext'

/**
 * Componente que muestra el historial de cambios de una planta específica.
 */
const PlantHistory = () => {
	const { history } = useContext(PlantContext)

	return (
		<div>
			<h2>Historial de la Planta</h2>
			{history.map((entry, index) => (
				<div key={index}>
					<h3>{entry.date}</h3>
					<ul>
						{entry.changes.map((change, idx) => (
							<li key={idx}>{change}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default PlantHistory
