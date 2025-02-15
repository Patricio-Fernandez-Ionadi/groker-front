import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormContext } from '../../../app/context/FormContext'

import { toggleAdvanced } from '../../Register/store/historySlice'
import { savePlantHistory } from '../../Register/store/historyAsyncActions'

import { AdvancedFields } from './AdvancedFields'
import { CommonFields } from './CommonFields'
import { WateringFields } from './WateringFields'

export const EditPlant = () => {
	const dispatch = useDispatch()
	const editingState = useSelector((state) => state.historyStore)
	const { showAdvanced } = editingState

	const { closeEditPlantForm } = useContext(FormContext)

	const handleSubmit = () => {
		dispatch(savePlantHistory(editingState))
			.unwrap() // Maneja la promesa para detectar errores
			.catch((error) => {
				console.error('Error al guardar la planta:', error)
			})
		closeEditPlantForm()
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
