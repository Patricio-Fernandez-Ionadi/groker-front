export const today = new Date().toISOString().split('T')[0]

/**
 * Formatea una fecha en formato DD/MM/YY.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} - La fecha formateada en formato DD/MM/YY.
 */
export const toNormal = (dateString) => {
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

/**
 * Formatea una fecha en formato ISO.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} - La fecha formateada.
 */
export const toYYYYMMDD = (dateString) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toISOString().split('T')[0]
}

/**
 * Formatea una fecha en formato ISO.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} - La fecha formateada en ISO (YYYY-MM-DDTHH:MM:SS.SSSZ).
 */
export const toISO = (dateString) => {
	if (!dateString) return ''
	return new Date(dateString).toISOString()
}
