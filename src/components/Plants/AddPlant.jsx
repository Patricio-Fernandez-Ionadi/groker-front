import React, { useContext, useState } from 'react'

import { validatePlantData } from '../../utils/validation'
import { AddGeneticButton } from '../Genetics/AddGeneticButton'
import { ToggleSwitch } from '../Universals/ToggleSwitch'
import { FormContext } from '../../context/FormContext'

import { useDispatch, useSelector } from 'react-redux'
import { addPlant } from '../../store/reducers/plants/plantsAsyncActions'

const defaultPlantData = {
	entryDate: '',
	name: '',
	genetic: 'Desconocida',
	stage: 'vegetative',
	potSize: '',
	flags: { isFinalPot: false },
}

const AddPlant = () => {
	const [newPlantData, setPlantData] = useState(defaultPlantData)
	const [errors, setErrors] = useState({})

	const { closeAddPlantForm } = useContext(FormContext)

	const dispatch = useDispatch()
	const { genetics } = useSelector((state) => state.geneticsStore)

	/**
	 * Maneja los cambios en los campos del formulario.
	 * @param {Event} e - Evento de cambio del formulario.
	 */
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target

		setPlantData({
			...newPlantData,
			[name]: type === 'checkbox' ? checked : value,
		})
	}

	/**
	 * Maneja el envío del formulario para añadir una planta.
	 * @param {Event} e - Evento de envío del formulario.
	 */
	const handleSubmit = (e) => {
		e.preventDefault()
		const validationErrors = validatePlantData(newPlantData)
		setErrors(validationErrors)

		if (Object.keys(validationErrors).length === 0) {
			newPlantData.genetic = genetics.find(
				(gen) => gen.name === newPlantData.genetic
			)

			try {
				dispatch(addPlant(newPlantData))
				setPlantData(defaultPlantData)
				setErrors({})
				closeAddPlantForm()
			} catch (error) {
				console.error('Error al agregar planta AddPlant.jsx:', error)
			}
		}
	}

	return (
		<div className="add-plant-form-container">
			<div className="add-plant-form-name">
				<input
					type="text"
					name="name"
					value={newPlantData.name}
					onChange={handleChange}
					placeholder="Nombre de la planta"
				/>
				{errors.name && <span className="error">{errors.name}</span>}
			</div>

			<div className="add-plant-form-genetic">
				<select
					name="genetic"
					defaultValue={newPlantData.genetic.name}
					onChange={handleChange}
				>
					<option>Seleccionar genética</option>
					{genetics.map((gen) => (
						<option key={gen._id} value={gen.name}>
							{gen.name}
						</option>
					))}
				</select>
				<AddGeneticButton />
			</div>

			<label className="add-plant-form-date">
				<p>Fecha de Ingreso</p>
				<input
					type="date"
					name="entryDate"
					value={newPlantData.entryDate}
					onChange={handleChange}
				/>
				{errors.entryDate && <span className="error">{errors.entryDate}</span>}
			</label>

			<label className="add-plant-form-stage">
				<p>Etapa:</p>
				<select name="stage" onChange={handleChange}>
					<option value="vegetative">Vegetativo</option>
					<option value="flowering">Floración</option>
					<option value="germination">Germinacion</option>
				</select>
			</label>

			<input
				className="add-plant-form-potSize"
				type="number"
				name="potSize"
				value={newPlantData.potSize}
				onChange={handleChange}
				placeholder="Tamaño de la maceta"
			/>

			<label className="add-plant-form-potCheckbox">
				<p>Maceta final</p>
				<ToggleSwitch
					name={'isFinalPot'}
					onEvent={(e) =>
						setPlantData({
							...newPlantData,
							flags: { ...newPlantData.flags, isFinalPot: e.target.checked },
						})
					}
					switcher={newPlantData.flags.isFinalPot}
				/>
			</label>

			<button className="add-plant-form-button" onClick={handleSubmit}>
				Añadir Planta
			</button>
		</div>
	)
}

export default AddPlant
