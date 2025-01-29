import React, { useState, useContext } from 'react'
import { PlantContext } from '../context/PlantContext'
import { calculateEstimatedChange } from '../utils/dateUtils'
import { validatePlantData } from '../utils/validation'

const defaultPlantData = {
	entryDate: '',
	name: '',
	genetic: 'N/A',
	stage: 'Vegetativo',
	potSize: '',
	isFinalPot: false,
}

/**
 * Componente para añadir una nueva planta al inventario.
 */
const AddPlant = () => {
	const { addPlant } = useContext(PlantContext)
	const [plantData, setPlantData] = useState(defaultPlantData)
	const [errors, setErrors] = useState({})

	/**
	 * Maneja los cambios en los campos del formulario.
	 * @param {Event} e - Evento de cambio del formulario.
	 */
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setPlantData({
			...plantData,
			[name]: type === 'checkbox' ? checked : value,
		})
	}

	/**
	 * Maneja el envío del formulario para añadir una planta.
	 * @param {Event} e - Evento de envío del formulario.
	 */
	const handleSubmit = (e) => {
		e.preventDefault()
		const validationErrors = validatePlantData(plantData)
		setErrors(validationErrors)
		if (Object.keys(validationErrors).length === 0) {
			const estimatedChange = calculateEstimatedChange(plantData)
			addPlant({ ...plantData, estimatedChange })
			setPlantData(defaultPlantData)
			setErrors({})
		}

		/* debe cerrarse el formulario al añadir planta pero el estado de apertura y cerrado de formulario lo maneja APP.jsx */
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					Fecha de ingreso:
					<input
						type="date"
						name="entryDate"
						value={plantData.entryDate}
						onChange={handleChange}
						placeholder="Fecha de ingreso"
					/>
					{errors.entryDate && (
						<span className="error">{errors.entryDate}</span>
					)}
				</label>
				<label>
					Nombre de la planta:
					<input
						type="text"
						name="name"
						value={plantData.name}
						onChange={handleChange}
						placeholder="Nombre de la planta"
					/>
					{errors.name && <span className="error">{errors.name}</span>}
				</label>
				<label>
					Genética:
					<input
						type="text"
						name="genetic"
						value={plantData.genetic}
						onChange={handleChange}
						placeholder="Genética"
					/>
				</label>
			</div>
			<div>
				<label>
					Etapa:
					<select name="stage" value={plantData.stage} onChange={handleChange}>
						<option value="Vegetativo">Vegetativo</option>
						<option value="Floracion">Floración</option>
					</select>
				</label>

				<label>
					Tamaño de la maceta:
					<input
						type="text"
						name="potSize"
						value={plantData.potSize}
						onChange={handleChange}
						placeholder="Tamaño de la maceta"
					/>
				</label>
				<label>
					<input
						type="checkbox"
						name="isFinalPot"
						checked={plantData.isFinalPot}
						onChange={handleChange}
					/>
					Maceta final
				</label>
			</div>
			<button type="submit">Añadir Planta</button>
		</form>
	)
}

export default AddPlant
