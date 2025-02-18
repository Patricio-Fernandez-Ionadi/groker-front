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

/**
 * Formatea una fecha en formato ISO.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} - La fecha formateada.
 */
export const formatDateToYYYYMMDD = (dateString) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toISOString().split('T')[0]
}

/**
 * Formatea una fecha en formato ISO.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} - La fecha formateada en ISO (YYYY-MM-DDTHH:MM:SS.SSSZ).
 */
export const formatDateToISO = (dateString) => {
	if (!dateString) return ''
	return new Date(dateString).toISOString()
}

/**
 * Calcula la fecha estimada de cambio o corte de una planta segun la fecha de ingreso.
 * @param {Object} plant - Objeto de la planta.
 * @returns {string} - La fecha estimada en formato (YYYY-MM-DD).
 */
export const calculateEstimatedChangeFromEntryDate = (plant) => {
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

	// YYYY-MM-DD
	return adjustedDate.toISOString().split('T')[0]
}

/**
 * Calcula la fecha estimada de cambio o corte de una planta a partir de la fecha actual.
 * @returns {string} - La fecha en formato ISO (YYYY-MM-DDTHH:MM:SS.SSSZ).
 */
export const culateEstimatedChangeFromNow = (currentStage) => {
	const todayDate = new Date()

	let newChangeDate

	// Calcula la fecha estimada de cambio o corte de una planta segun la nueva etapa registrada
	if (currentStage === 'vegetative') {
		newChangeDate = todayDate.setDate(todayDate.getDate() + 42) // 6 weeks
	} else if (currentStage === 'flowering') {
		newChangeDate = todayDate.setDate(todayDate.getDate() + 56) // 8 weeks
	} else if (currentStage === 'germination') {
		newChangeDate = todayDate.setDate(todayDate.getDate() + 28) // 4 weeks
	}

	return formatDateToISO(newChangeDate)
}

export const today = new Date().toISOString().split('T')[0]
