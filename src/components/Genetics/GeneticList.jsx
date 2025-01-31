import React, { useEffect, useState } from 'react'
import { deleteGenetic, getGenetics } from '../../api/genetics'

export function GeneticList() {
	const [genetics, setGenetics] = useState([])

	useEffect(() => {
		getGenetics().then((data) => setGenetics(data))
	}, [genetics])

	const handleDeleteGenetic = async (id) => {
		try {
			await deleteGenetic(id)
		} catch (error) {
			console.error('Error al eliminar genética:', error)
		}
	}

	if (genetics.length === 0) return <p>Cargando genéticas...</p>

	return (
		<>
			<ul>
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
