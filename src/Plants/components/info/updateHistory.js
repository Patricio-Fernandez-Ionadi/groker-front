import { today } from '../../utils/dateUtils'

export const updatePlantHistoryEvents = (plant, type, newValue) => {
	let updatedHistory = [...plant.history]

	// Buscar si hay un registro con la fecha de hoy
	const todayEntryIndex = updatedHistory.findIndex((entry) =>
		entry.date.startsWith(today)
	)

	if (todayEntryIndex !== -1) {
		// Ya existe un registro de hoy
		let updatedEntry = { ...updatedHistory[todayEntryIndex] }
		let updatedEvents = [...updatedEntry.events]

		// Buscar si ya hay un evento del mismo type
		const nameEventIndex = updatedEvents.findIndex(
			(event) => event.type === type
		)

		if (nameEventIndex !== -1) {
			// Si ya existe, actualizarlo
			updatedEvents[nameEventIndex] = {
				...updatedEvents[nameEventIndex],
				details: newValue,
			}
		} else {
			// Si no existe, agregar un nuevo evento al registro del día
			updatedEvents.push({ type: type, details: newValue })
		}
		// Asignar la copia de los eventos actualizados al registro
		updatedEntry.events = updatedEvents

		// Actualizar el historial con la nueva versión del registro del día
		updatedHistory[todayEntryIndex] = updatedEntry
	} else {
		// Si no hay registro de hoy, crear uno nuevo con el evento
		updatedHistory = [
			...updatedHistory,
			{
				date: new Date().toISOString(),
				events: [{ type: type, details: newValue }],
			},
		]
	}

	// Retornar el historial actualizado
	return updatedHistory
}
