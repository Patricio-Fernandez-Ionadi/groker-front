import React, { useContext } from 'react'
import { GeneticsContext } from '../../context/genetics/GeneticsContext'

export function GeneticList() {
	const { deleteGenetic, genetics } = useContext(GeneticsContext)

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

						{genetic.name === 'Desconocida' ? (
							<button className="delete-button disabled" disabled>
								Eliminar
							</button>
						) : (
							<button
								className="delete-button"
								onClick={(e) => handleDeleteGenetic(genetic._id)}
							>
								Eliminar
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
