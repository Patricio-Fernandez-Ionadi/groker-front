import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../app'
import { deleteGenetic } from '../index'

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
						{genetic.name !== 'Desconocida' && (
							<Button
								className="delete-button"
								onEvent={(e) => handleDeleteGenetic(genetic._id)}
							>
								Eliminar
							</Button>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
