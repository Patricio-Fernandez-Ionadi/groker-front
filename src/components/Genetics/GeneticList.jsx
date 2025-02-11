import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGenetic } from '../../store/reducers/genetics/geneticsAsyncActions'

export function GeneticList() {
	const dispatch = useDispatch()
	const { genetics } = useSelector((state) => state.geneticsStore)

	const handleDeleteGenetic = async (id) => {
		dispatch(deleteGenetic(id))
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
