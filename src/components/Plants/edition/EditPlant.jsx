import React, { useContext } from 'react'
import { PlantEditionContext } from '../../../context/plants/PlantEditContext'

import { AdvancedFields } from './AdvancedFields'
import { CommonFields } from './CommonFields'
import { WateringFields } from './WateringFields'

import { toggleCheckboxState } from '../../../utils/helpers'

const EditPlant = () => {
	const { showAdvancedFields, setShowAdvancedFields, handleSubmit } =
		useContext(PlantEditionContext)

	return (
		<div className="dynamic-form">
			<button
				className="action-buttons"
				type="button"
				onClick={() =>
					toggleCheckboxState(showAdvancedFields, setShowAdvancedFields)
				}
			>
				{showAdvancedFields
					? 'Ocultar Campos Avanzados'
					: 'Mostrar Campos Avanzados'}
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
