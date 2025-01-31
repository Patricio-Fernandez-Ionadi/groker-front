import React, { useState } from 'react'
import { addGenetic } from '../../api/genetics'

import { GeneticList } from './GeneticList'

export function AddGenetic() {
	const [newGenetic, setNewGenetic] = useState('')

	const handleAddGenetic = async (e) => {
		e.preventDefault()
		try {
			const addNewGenetic = { name: newGenetic }
			await addGenetic(addNewGenetic)
			setNewGenetic('')
		} catch (error) {
			console.error('Error al agregar genética:', error)
		}
	}

	return (
		<>
			<h1>Genéticas</h1>
			<div>
				<input
					type="text"
					name="name"
					placeholder="Nombre de la genética"
					value={newGenetic}
					onChange={(e) => setNewGenetic(e.target.value)}
				/>
				<button onClick={handleAddGenetic}>Agregar Genética</button>
				<GeneticList />
			</div>
		</>
	)
}
