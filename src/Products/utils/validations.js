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
