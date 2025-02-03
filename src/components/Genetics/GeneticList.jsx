import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

export function GeneticList() {
	const { deleteGenetic, state } = useContext(AppContext)
	const { genetics } = state

	const handleDeleteGenetic = async (id) => {
		deleteGenetic(id)
	}

	if (genetics.length === 0) return <p>Cargando genéticas...</p>

	return (
		<div className="genetic-list">
			<h3>Lista de genéticas disponibles</h3>
			<ul>
				{genetics.map((genetic) => (
					<li key={genetic._id}>
						{genetic.name}
						<button
							className="delete-button"
							onClick={(e) => handleDeleteGenetic(genetic._id)}
						>
							Eliminar
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
