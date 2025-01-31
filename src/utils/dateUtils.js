/**
 * Calcula la fecha estimada de cambio o corte de una planta.
 * @param {Object} plant - Objeto que contiene los detalles de la planta.
 * @returns {string} - La fecha estimada en formato ISO (YYYY-MM-DD).
 */
export const calculateEstimatedChange = (plant) => {
	const entryDate = new Date(plant.entryDate)
	if (plant.stage === 'vegetative') {
		entryDate.setDate(entryDate.getDate() + 42) // 6 weeks
	} else if (plant.stage === 'flowering') {
		entryDate.setDate(entryDate.getDate() + 98) // 14 weeks
	} else if (plant.stage === 'germination') {
		entryDate.setDate(entryDate.getDate() + 28) // 4 weeks
	}

	// Ajustar la fecha para considerar el huso horario de la zona de uso
	const adjustedDate = new Date(
		entryDate.getTime() + Math.abs(entryDate.getTimezoneOffset() * 60000)
	)
	return adjustedDate.toISOString().split('T')[0]
}

/**
 * Formatea una fecha en formato DD/MM/YY.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} - La fecha formateada en formato DD/MM/YY.
 */
export const formatDate = (dateString) => {
	// Verificar que dateString sea un valor válido
	if (!dateString) return 'N/A'

	const date = new Date(dateString)

	// Si no es una fecha válida, devolver el valor original
	if (isNaN(date.getTime())) return dateString

	// Ajustar la fecha para considerar el uso horario
	const adjustedDate = new Date(
		date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)
	)

	const day = String(adjustedDate.getDate()).padStart(2, '0')
	const month = String(adjustedDate.getMonth() + 1).padStart(2, '0')
	// Tomar los últimos 2 dígitos del año
	const year = String(adjustedDate.getFullYear()).slice(-2)

	return `${day}/${month}/${year}`
}
