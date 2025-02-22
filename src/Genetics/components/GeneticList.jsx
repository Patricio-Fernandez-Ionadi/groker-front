import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'groker'

import { deleteGenetic } from '../index'
import { useTheme } from '@/app'

export function GeneticList() {
	const dispatch = useDispatch()
	const { genetics } = useSelector((state) => state.geneticsStore)
	const { theme } = useTheme()

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
								theme={theme}
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
