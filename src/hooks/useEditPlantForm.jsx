import { useState, useEffect } from 'react'

/**
 * Hook personalizado para manejar el formulario de edición de plantas.
 * @param {Object} selectedPlant - La planta seleccionada para editar.
 * @returns {Object} - Los datos y funciones del formulario de edición.
 */
const useEditPlantForm = (selectedPlant) => {
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

	const toggleAdvancedFields = () => {
		setShowAdvancedFields(!showAdvancedFields)
	}

	return {
		plantData,
		note,
		showAdvancedFields,
		handleChange,
		handleNoteChange,
		toggleAdvancedFields,
		setNote,
	}
}

export default useEditPlantForm
