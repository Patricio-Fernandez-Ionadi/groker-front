import { toISO } from 'Groker/date'

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

	return toISO(newChangeDate)
}
