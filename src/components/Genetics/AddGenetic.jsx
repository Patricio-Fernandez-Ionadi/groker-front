import React, { useContext, useState } from 'react'
import { GenModalContext } from '../../context/genetics/GenModalContext'
import { AppContext } from '../../context/AppContext'

export function AddGenetic() {
	const [newGenetic, setNewGenetic] = useState('')

	const { addGenetic } = useContext(AppContext)

	const { setShowGeneticForm } = useContext(GenModalContext)

	const handleAddGenetic = async (e) => {
		e.preventDefault()
		const addNewGenetic = { name: newGenetic }
		addGenetic(addNewGenetic)
		setNewGenetic('')
		setShowGeneticForm(false)
	}

	return (
		<>
			<h3 className="genetics-modal-title">Añadir nueva genética</h3>
			<div className="genetics-modal-input-container">
				<input
					type="text"
					name="name"
					placeholder="Nombre de la genética"
					value={newGenetic}
					onChange={(e) => setNewGenetic(e.target.value)}
				/>
				<button onClick={handleAddGenetic}>Guardar</button>
			</div>
		</>
	)
}
