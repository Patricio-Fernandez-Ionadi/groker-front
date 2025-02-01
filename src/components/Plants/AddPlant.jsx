import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

import { AddGenetic } from '../Genetics/AddGenetic'

import { validatePlantData } from '../../utils/validation'

const defaultPlantData = {
	entryDate: '',
	name: '',
	genetic: '',
	stage: 'vegetative',
	potSize: '',
	flags: { isFinalPot: false },
}

const TODAY_FAKE_PLANT_DATA = {
	entryDate: '2025-02-01T00:00:00.000Z',
	name: 'TODAY HISTORY',
	genetic: { _id: '679bf81f5996a713ebb47ece', name: 'Desconocida', __v: 0 },
	stage: 'flowering',
	potSize: 5,
	flags: { isFinalPot: false, underObservation: false },
	estimatedChange: '2025-02-27T00:00:00.000Z',
	history: [
		{
			date: '2025-02-01T00:00:00.000Z',
			events: [
				{
					type: 'stage',
					detail: 'flowering',
				},
				{
					type: 'note',
					detail: [{ id: 4857, note: 'Anotaciones de prueba' }],
				},
			],
		},
	],
}
const NOT_TODAY_FAKE_PLANT_DATA = {
	entryDate: '2025-02-01T00:00:00.000Z',
	name: 'NOT TODAY HISTORY',
	genetic: { _id: '679bf81f5996a713ebb47ece', name: 'Desconocida', __v: 0 },
	stage: 'flowering',
	potSize: 5,
	flags: { isFinalPot: false, underObservation: false },
	estimatedChange: '2025-02-27T00:00:00.000Z',
	history: [
		{
			date: '2025-01-01T00:00:00.000Z',
			events: [
				{
					type: 'stage',
					detail: 'flowering',
				},
				{
					type: 'note',
					detail: [{ id: 4857, note: 'Anotaciones de prueba' }],
				},
			],
		},
	],
}

/**
 * Formulario para añadir una nueva planta al inventario.
 */
const AddPlant = () => {
	const [newPlantData, setPlantData] = useState(defaultPlantData)
	const [showGeneticForm, setShowGeneticForm] = useState(false)
	const [errors, setErrors] = useState({})

	const { state, addPlant } = useContext(AppContext)

	const { genetics } = state

	useEffect(() => {
		addPlant(TODAY_FAKE_PLANT_DATA)
		addPlant(NOT_TODAY_FAKE_PLANT_DATA)
	}, [])

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
			try {
				addPlant(newPlantData)
				setPlantData(defaultPlantData)
				setErrors({})
			} catch (error) {
				console.error('Error al agregar planta AddPlant.jsx:', error)
			}
		}
	}

	/* debe cerrarse el formulario al añadir planta pero el estado de apertura y cerrado de formulario lo maneja APP.jsx */
	/* al añadir varias plantas el valor del select de stage no cambia pero el valor por defecto si se resetea */

	return (
		<div>
			<div>
				<label>
					Fecha de ingreso:
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

				<input
					type="text"
					name="name"
					value={newPlantData.name}
					onChange={handleChange}
					placeholder="Nombre de la planta"
				/>
				{errors.name && <span className="error">{errors.name}</span>}

				<select
					name="genetic"
					value={newPlantData.genetic}
					onChange={handleChange}
				>
					<option value="">Seleccionar genética</option>
					{genetics.map((gen) => (
						<option key={gen._id} value={gen._id}>
							{gen.name}
						</option>
					))}
				</select>
				<button onClick={() => setShowGeneticForm(!showGeneticForm)}>
					{showGeneticForm ? 'Cerrar' : 'Agregar Genética'}
				</button>
			</div>
			<div>
				<label>
					Etapa:
					<select name="stage" onChange={handleChange}>
						<option value="vegetative">Vegetativo</option>
						<option value="flowering">Floración</option>
						<option value="germination">Germinacion</option>
					</select>
				</label>

				<input
					type="text"
					name="potSize"
					value={newPlantData.potSize}
					onChange={handleChange}
					placeholder="Tamaño de la maceta"
				/>
				<label>
					Maceta final
					<input
						type="checkbox"
						name="isFinalPot"
						checked={newPlantData.flags.isFinalPot}
						onChange={(e) =>
							setPlantData({
								...newPlantData,
								flags: { ...newPlantData.flags, isFinalPot: e.target.checked },
							})
						}
					/>
				</label>
			</div>
			{showGeneticForm && <AddGenetic />}
			<button onClick={handleSubmit}>Añadir Planta</button>
		</div>
	)
}

export default AddPlant
