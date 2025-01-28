/**
 * Calcula la fecha estimada de cambio o corte de una planta.
 * @param {Object} plant - Objeto que contiene los detalles de la planta.
 * @returns {string} - La fecha estimada en formato ISO (YYYY-MM-DD).
 */
export const calculateEstimatedChange = (plant) => {
	const entryDate = new Date(plant.entryDate)
	if (plant.stage === 'Vegetativo') {
		entryDate.setDate(entryDate.getDate() + 42) // 6 weeks
	} else if (plant.stage === 'Floracion') {
		entryDate.setDate(entryDate.getDate() + 98) // 14 weeks
	}

	// Ajustar la fecha para considerar el huso horario de la zona de uso
	const adjustedDate = new Date(
		entryDate.getTime() + Math.abs(entryDate.getTimezoneOffset() * 60000)
	)
	return adjustedDate.toISOString().split('T')[0]
}
