import { today } from '../../../utils/dateUtils'

export const updateSimpleEvents = (plant, type, newValue) => {
	let [updatedHistory, todayEntryIndex, existingEntry] = historyCopy(plant)

	if (existingEntry) {
		// Ya existe un registro de hoy
		let updatedEntry = { ...updatedHistory[todayEntryIndex] }
		let updatedEvents = [...updatedEntry.events]

		// Buscar si ya hay un evento del mismo type
		const eventIndex = updatedEvents.findIndex((event) => event.type === type)

		if (eventIndex !== -1) {
			// Si ya existe, actualizarlo
			updatedEvents[eventIndex] = {
				...updatedEvents[eventIndex],
				details: newValue, // 🔹 Se sobrescribe el valor directamente
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

export const updateObjectEvent = (plant, type, newValues) => {
	// copia del historial y el índice del registro de hoy
	let [updatedHistory, todayEntryIndex] = historyCopy(plant)

	// Busca si hay un evento del tipo type hoy
	const existingEvent =
		todayEntryIndex !== -1
			? updatedHistory[todayEntryIndex].events.find(
					(event) => event.type === type
			  )
			: null

	// 🔹 Filtrar solo valores cambiados
	let filteredValues = {}
	for (let key in newValues) {
		if (key === 'productsUsed') continue

		// Si un valor es 0 o no cambió, no se guarda en filteredValues
		if (
			newValues[key] !== 0 &&
			newValues[key] !== existingEvent?.details[key]
		) {
			filteredValues[key] = newValues[key]
		}
	}

	// 🔹 Actualizar array de `productsUsed`
	const updatedProducts = updateProductsArray(
		existingEvent?.details.productsUsed || [],
		newValues.productsUsed
	)

	// Si no hay cambios devuelve el historial sin modificar
	if (updatedProducts.updatedArray.length > 0) {
		filteredValues.productsUsed = updatedProducts.updatedArray
	}

	// 🔹 No actualizar si no hay cambios
	if (Object.keys(filteredValues).length === 0) return updatedHistory

	if (todayEntryIndex !== -1) {
		let updatedEntry = { ...updatedHistory[todayEntryIndex] }
		let updatedEvents = [...updatedEntry.events]

		const eventIndex = updatedEvents.findIndex((event) => event.type === type)

		// Si el evento ya existía, se actualiza su details
		if (eventIndex !== -1) {
			updatedEvents[eventIndex] = {
				...updatedEvents[eventIndex],
				details: {
					...updatedEvents[eventIndex].details,
					...filteredValues,
				},
			}
		} else {
			updatedEvents.push({ type, details: filteredValues })
		}

		updatedEntry.events = updatedEvents
		updatedHistory[todayEntryIndex] = updatedEntry
	} else {
		// Si no existía, se crea un nuevo evento
		updatedHistory.push({
			date: new Date().toISOString(),
			events: [{ type, details: filteredValues }],
		})
	}

	return updatedHistory
}

function historyCopy(plant) {
	// Copia el historial de la planta
	let updatedHistory = [...plant.history]
	let existingEntry = false

	// Buscar si hay un registro con la fecha de hoy
	const todayEntryIndex = updatedHistory.findIndex((entry) =>
		entry.date.startsWith(today)
	)

	// true si hay un registro de hoy, false si no
	if (todayEntryIndex !== -1) existingEntry = true

	return [updatedHistory, todayEntryIndex, existingEntry]
}
function updateProductsArray(prevArray, newArray) {
	// Si newArray no tiene productos, devuelve prevArray sin cambios
	if (!newArray || newArray.length === 0) return prevArray

	// Crear un Set con los IDs de los productos nuevos
	const newProductIds = new Set(newArray.map((item) => item.product._id))

	// Filtrar solo los productos que están en newArray
	let updatedArray = prevArray.filter((item) =>
		newProductIds.has(item.product._id)
	)

	// Actualizar o agregar nuevos productos
	newArray.forEach((newItem) => {
		const existingIndex = updatedArray.findIndex(
			(item) => item.product._id === newItem.product._id
		)

		if (existingIndex === -1) {
			updatedArray.push(newItem) // 🔹 Agregar nuevo producto
		} else {
			updatedArray[existingIndex] = {
				...updatedArray[existingIndex],
				productAmount: newItem.productAmount,
			}
		}
	})

	return { updatedArray, prev: prevArray, new: newArray }
}
