import React, { useState, useContext, useEffect } from 'react'
import { PlantContext } from '../context/PlantContext'

/**
 * Componente para editar los detalles de una planta específica.
 */
const EditPlant = () => {
	const { selectedPlant, updatePlant, addNote } = useContext(PlantContext)
	const [plantData, setPlantData] = useState({})
	const [note, setNote] = useState('')
	const [showAdvancedFields, setShowAdvancedFields] = useState(false)

	useEffect(() => {
		if (selectedPlant) {
			setPlantData(selectedPlant)
		}
	}, [selectedPlant])

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
	 * Maneja los cambios en el campo de notas.
	 * @param {Event} e - Evento de cambio del campo de notas.
	 */
	const handleNoteChange = (e) => {
		setNote(e.target.value)
	}

	/**
	 * Maneja el envío del formulario para guardar los cambios en la planta.
	 * @param {Event} e - Evento de envío del formulario.
	 */
	const handleSubmit = (e) => {
		e.preventDefault()
		if (plantData) {
			const changeDescription = `Planta actualizada: ${Object.keys(plantData)
				.map((key) => `${key}: ${plantData[key]}`)
				.join(', ')}`
			updatePlant(plantData, changeDescription)
			if (note.trim()) {
				addNote(selectedPlant.id, note.trim())
				setNote('')
			}
		}
	}

	if (!selectedPlant) return <div>Seleccione una planta para editar</div>

	return (
		<form onSubmit={handleSubmit}>
			{showAdvancedFields && (
				<>
					<label>
						Fecha de ingreso:
						<input
							type="date"
							name="entryDate"
							value={plantData.entryDate || ''}
							onChange={handleChange}
							placeholder="Fecha de ingreso"
						/>
					</label>
					<label>
						Nombre de la planta:
						<input
							type="text"
							name="name"
							value={plantData.name || ''}
							onChange={handleChange}
							placeholder="Nombre de la planta"
						/>
					</label>
					<label>
						Genética:
						<input
							type="text"
							name="genetic"
							value={plantData.genetic || ''}
							onChange={handleChange}
							placeholder="Genética"
						/>
					</label>
				</>
			)}
			<label>
				Etapa:
				<select name="stage" value={plantData.stage} onChange={handleChange}>
					<option value="Vegetativo">Vegetativo</option>
					<option value="Floracion">Floración</option>
				</select>
			</label>
			<label>
				Cambio estimado:
				<input
					type="date"
					name="estimatedChange"
					value={plantData.estimatedChange || ''}
					onChange={handleChange}
					placeholder="Cambio estimado"
				/>
			</label>
			<label>
				Último riego:
				<input
					type="date"
					name="lastWatered"
					value={plantData.lastWatered || ''}
					onChange={handleChange}
					placeholder="Último riego"
				/>
			</label>
			<label>
				Tamaño de la maceta:
				<input
					type="text"
					name="potSize"
					value={plantData.potSize || ''}
					onChange={handleChange}
					placeholder="Tamaño de la maceta"
				/>
			</label>
			<label>
				<input
					type="checkbox"
					name="isFinalPot"
					checked={plantData.isFinalPot || false}
					onChange={handleChange}
				/>
				Maceta final
			</label>
			<label>
				<input
					type="checkbox"
					name="underObservation"
					checked={plantData.underObservation || false}
					onChange={handleChange}
				/>
				Bajo observación
			</label>
			<label>
				Notas:
				<textarea
					name="note"
					value={note}
					onChange={handleNoteChange}
					placeholder="Añadir una nota"
				/>
			</label>
			<button
				type="button"
				onClick={() => setShowAdvancedFields(!showAdvancedFields)}
			>
				{showAdvancedFields
					? 'Ocultar Campos Avanzados'
					: 'Mostrar Campos Avanzados'}
			</button>
			<button type="submit">Guardar Cambios</button>
		</form>
	)
}

export default EditPlant
