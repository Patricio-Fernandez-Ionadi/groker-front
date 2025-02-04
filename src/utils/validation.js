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

/**
 * Valida los campos del formulario de producto.
 * @param {Object} productData - Los datos del producto a validar.
 * @returns {Object} - Un objeto con los errores de validación.
 */
export const validateProductData = (productData) => {
	const errors = {}
	if (!productData.name) errors.name = 'El nombre del producto es obligatorio'
	if (!productData.stock) errors.stock = 'El stock del producto es obligatorio'
	return errors
}
