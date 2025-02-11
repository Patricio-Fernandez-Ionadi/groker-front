import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleAdvanced } from '../../../store/reducers/history/historySlice'
import { savePlantHistory } from '../../../store/reducers/history/historyAsyncActions'

import { AdvancedFields } from './AdvancedFields'
import { CommonFields } from './CommonFields'
import { WateringFields } from './WateringFields'

const EditPlant = () => {
	const dispatch = useDispatch()
	const editingState = useSelector((state) => state.historyStore)
	const { showAdvanced } = editingState

	const handleSubmit = () => {
		// console.log(editingState)
		dispatch(savePlantHistory(editingState))
			.unwrap() // Maneja la promesa para detectar errores
			.catch((error) => {
				console.error('Error al guardar la planta:', error)
			})
	}

	return (
		<div className="dynamic-form">
			<button
				className="action-buttons"
				type="button"
				onClick={(e) => dispatch(toggleAdvanced())}
			>
				{showAdvanced ? 'Ocultar Campos Avanzados' : 'Mostrar Campos Avanzados'}
			</button>
			<AdvancedFields />
			<CommonFields />
			<WateringFields />
			<button className="action-buttons" onClick={handleSubmit}>
				Guardar Cambios
			</button>
		</div>
	)
}

export default EditPlant

/* Modelo de datos
const palantModel = {
	entryDate: new Date(),
	name: '',
	genetic: '',
	stage: '',
	estimatedChange: new Date(),
	potSize: '',
	flags: {
		isFinalPot: false,
		underObservation: false,
	},
	history: [],
}
const wateringModel = {
	amount: '',
	date: new Date(),
	productsUsed: [
		{ product: mongoose.Schema.Types.ObjectId, ref: 'Product', amount: '' },
	],
	ph: '',
	ec: '',
}
 */
