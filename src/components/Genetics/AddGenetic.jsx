import React, { useContext, useState } from 'react'
import { GenModalContext } from '../../context/genetics/GenModalContext'
import { GeneticsContext } from '../../context/genetics/GeneticsContext'

export function AddGenetic() {
	const [newGenetic, setNewGenetic] = useState('')

	const { addGenetic } = useContext(GeneticsContext)

	const { closeGeneticModal } = useContext(GenModalContext)

	const handleAddGenetic = async (e) => {
		e.preventDefault()
		const addNewGenetic = { name: newGenetic }
		addGenetic(addNewGenetic)
		setNewGenetic('')
		closeGeneticModal()
	}

	return (
		<div className="add-genetic-form">
			<h2>Añadir Genética</h2>
			<div className="form-group">
				<input
					type="text"
					name="name"
					placeholder="Nueva Genética"
					value={newGenetic}
					onChange={(e) => setNewGenetic(e.target.value)}
				/>
				<button className="save-button" onClick={handleAddGenetic}>
					Guardar
				</button>
			</div>
		</div>
	)
}
