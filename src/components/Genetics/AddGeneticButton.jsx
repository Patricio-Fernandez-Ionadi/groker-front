import React, { useContext } from 'react'
import { GenModalContext } from '../../context/genetics/GenModalContext'

export function AddGeneticButton() {
	const { showGeneticForm, setShowGeneticForm } = useContext(GenModalContext)

	return (
		<>
			<button onClick={() => setShowGeneticForm(!showGeneticForm)}>
				{showGeneticForm ? 'Cerrar' : 'Agregar Genética'}
			</button>
		</>
	)
}
