import React, { useContext, useState } from 'react'
import { GenModalContext } from '../../context/genetics/GenModalContext'
import { useDispatch } from 'react-redux'
import { addNewGenetic } from '../../store/reducers/genetics/geneticsAsyncActions'

export function AddGenetic() {
	const [newGenetic, setNewGenetic] = useState('')
	const dispatch = useDispatch()
	const { closeGeneticModal } = useContext(GenModalContext)

	const handleAddGenetic = async (e) => {
		e.preventDefault()
		const geneticToAdd = { name: newGenetic }
		dispatch(addNewGenetic(geneticToAdd))
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
