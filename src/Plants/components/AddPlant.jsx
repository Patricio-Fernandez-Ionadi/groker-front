import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { Button, FormContext, ToggleSwitch } from '../../app'
import { AddGeneticButton, useGenetics } from '../../Genetics'

import { validatePlantData, usePlantsActions } from '../'

const defaultPlantData = {
	entryDate: '',
	name: '',
	genetic: 'Desconocida',
	stage: 'vegetative',
	flags: { isFinalPot: false },
	lastWatered: '',
}

export const AddPlant = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { closeAddPlantForm } = useContext(FormContext)
	const { genetics } = useGenetics()
	const { addNewPlant } = usePlantsActions()

	const [newPlantData, setPlantData] = useState(defaultPlantData)
	const [errors, setErrors] = useState({})

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
				addNewPlant(newPlantData)
				setPlantData(defaultPlantData)
				setErrors({})
				navigate('/')
			} catch (error) {
				console.error('Error al agregar planta AddPlant.jsx:', error)
			}
		}
	}

	const handleCancelForm = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from)
		} else if (location.pathname === '/') {
			closeAddPlantForm()
		} else {
			navigate('/')
		}
	}

	return (
		<>
			<div className="add-plant-form-container">
				<Button className="cancel-button" onEvent={handleCancelForm}>
					Cerrar
				</Button>
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
					{errors.entryDate && (
						<span className="error">{errors.entryDate}</span>
					)}
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

				<Button className="add-plant-form-button" onEvent={handleSubmit}>
					Añadir Planta
				</Button>
			</div>
		</>
	)
}
