import React from 'react'
import { AdvancedFields } from './AdvancedFields'
import { CommonFields } from './CommonFields'
import { WateringFields } from './WateringFields'
import { toggleCheckboxState } from '../../../utils/helpers'
import { useEditPlantContext } from '../../../context/PlantEditContext'

const EditPlant = () => {
	const { showAdvancedFields, setShowAdvancedFields, handleSubmit } =
		useEditPlantContext()

	return (
		<>
			<AdvancedFields />
			<CommonFields />
			<WateringFields />
			<div>
				<button
					type="button"
					onClick={() =>
						toggleCheckboxState(showAdvancedFields, setShowAdvancedFields)
					}
				>
					{showAdvancedFields
						? 'Ocultar Campos Avanzados'
						: 'Mostrar Campos Avanzados'}
				</button>
			</div>
			<div>
				<button onClick={handleSubmit}>Guardar Cambios</button>
			</div>
		</>
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
