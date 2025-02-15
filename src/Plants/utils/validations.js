/**
 * Valida los campos del formulario de planta.
 * @param {Object} plantData - Los datos de la planta a validar.
 * @returns {Object} - Un objeto con los errores de validación.
 */
export const validatePlantData = (plantData) => {
	const errors = {}
	if (!plantData.entryDate)
		errors.entryDate = 'La fecha de ingreso es obligatoria'
	if (!plantData.name) errors.name = 'El nombre de la planta es obligatorio'
	return errors
}
