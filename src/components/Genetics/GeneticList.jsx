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
		<>
			<ul className="genetics-modal-list">
				{genetics.map((genetic) => (
					<li key={genetic._id}>
						{genetic.name}
						<button onClick={(e) => handleDeleteGenetic(genetic._id)}>
							Eliminar
						</button>
					</li>
				))}
			</ul>
		</>
	)
}
