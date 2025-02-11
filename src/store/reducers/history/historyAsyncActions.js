import { createAsyncThunk } from '@reduxjs/toolkit'
import { updatePlant } from '../plants/plantsAsyncActions' // Acción para actualizar la planta
import { formatDateToYYYYMMDD, formatDateToISO } from '../../../utils/dateUtils'

export const savePlantHistory = createAsyncThunk(
	'historyStore/savePlantHistory',
	async (editingState, { dispatch }) => {
		try {
			const editedPlant = editingState.editedPlant
			const changes = []

			// Función para agregar cambios
			const addChange = (type, newValue, isArray = false) => {
				const prevValue = editedPlant[type]

				// Convertir fechas al mismo formato antes de comparar
				let formattedPrevValue = prevValue
				let formattedNewValue = newValue

				if (
					type === 'entryDate' ||
					type === 'estimatedChange' ||
					type === 'lastWatered'
				) {
					formattedPrevValue = formatDateToYYYYMMDD(prevValue) // Convertir prevValue a YYYY-MM-DD
					formattedNewValue = newValue // newValue ya está en YYYY-MM-DD
				}

				// Verificar si el valor nuevo es diferente al valor original
				if (
					JSON.stringify(formattedPrevValue) !==
					JSON.stringify(formattedNewValue)
				) {
					// Verificar si el valor nuevo no está vacío
					if (
						(isArray && newValue.length > 0) || // Si es un array, debe tener elementos
						(!isArray &&
							newValue !== '' &&
							newValue !== null &&
							newValue !== undefined) // Si no es un array, no debe estar vacío
					) {
						changes.push({ type, details: isArray ? [...newValue] : newValue })
					}
				}
			}

			// Comparar valores para detectar cambios
			addChange('name', editingState.name)
			addChange('entryDate', editingState.entryDate)
			addChange('genetic', editingState.genetic)
			addChange('estimatedChange', editingState.estimatedChange)
			addChange('stage', editingState.stage)
			addChange('potSize', editingState.potSize)
			addChange('temperature', editingState.temperature)
			addChange('humidity', editingState.humidity)
			addChange('note', [{ id: Date.now(), note: editingState.note }], true)
			addChange('flags', editingState.flags)
			addChange('isWatered', editingState.isWatered)
			addChange('lastWatered', editingState.lastWatered)
			addChange('ph', editingState.ph)
			addChange('ec', editingState.ec)
			addChange('amount', editingState.amount)
			addChange('products', editingState.products, true)

			// Filtrar y mapear los eventos
			const filteredEvents = changes
				.filter((change) => {
					// No guardar eventos de tipo "isWatered"
					if (change.type === 'isWatered') return false

					// No guardar notas vacías
					if (change.type === 'note') {
						return change.details.some((note) => note.note.trim() !== '')
					}

					// No guardar arrays vacíos
					if (Array.isArray(change.details)) {
						return change.details.length > 0
					}

					// No guardar valores vacíos
					return (
						change.details !== '' &&
						change.details !== null &&
						change.details !== undefined
					)
				})
				.map((change) => {
					// Convertir fechas a formato ISO antes de guardar
					if (
						change.type === 'entryDate' ||
						change.type === 'estimatedChange' ||
						change.type === 'lastWatered'
					) {
						return {
							type: change.type,
							details: formatDateToISO(change.details),
						}
					}

					return change
				})

			// Agrupar eventos de riego
			const wateringEvent = {
				type: 'watering',
				details: {},
			}

			const eventsToSave = filteredEvents.reduce((acc, change) => {
				if (
					change.type === 'ph' ||
					change.type === 'ec' ||
					change.type === 'amount' ||
					change.type === 'lastWatered' ||
					change.type === 'products'
				) {
					wateringEvent.details[change.type] = change.details
				} else {
					acc.push(change)
				}
				return acc
			}, [])

			// Si hay datos de riego, agregar el evento de riego
			if (Object.keys(wateringEvent.details).length > 0) {
				eventsToSave.push(wateringEvent)
			}

			// Si no hay eventos válidos, no se guarda nada en el historial
			if (eventsToSave.length === 0) {
				return
			}

			const today = formatDateToYYYYMMDD(new Date())
			const existingHistoryIndex = editedPlant.history.findIndex(
				(h) => formatDateToYYYYMMDD(h.date) === today
			)

			// Actualizar el objeto de la planta con los nuevos valores
			const updatedPlant = {
				...editedPlant,
				name: editingState.name,
				entryDate: formatDateToISO(editingState.entryDate),
				genetic: editingState.genetic._id,
				estimatedChange: formatDateToISO(editingState.estimatedChange),
				stage: editingState.stage,
				potSize: editingState.potSize,
				temperature: editingState.temperature,
				humidity: editingState.humidity,
				flags: editingState.flags,
				lastWatered: formatDateToISO(editingState.lastWatered),
				history:
					existingHistoryIndex !== -1
						? editedPlant.history.map((entry, index) =>
								index === existingHistoryIndex
									? { ...entry, events: eventsToSave }
									: entry
						  )
						: [
								...editedPlant.history,
								{ date: new Date().toISOString(), events: eventsToSave },
						  ],
			}

			// Despachar la acción para actualizar la planta
			console.log({
				updated: JSON.parse(JSON.stringify(updatedPlant)),
			})
			dispatch(updatePlant(updatedPlant))

			// Actualizar el stock de productos si hay cambios en el riego
			/*   if (editingState.isWatered) {
        const stockDifferences = editingState.products.map((product) => ({
          productId: product._id,
          difference: -product.productAmount, // Restar la cantidad usada
        }));
        dispatch(updateProductStock(stockDifferences));
      } */
		} catch (error) {
			console.error('Error al guardar la planta:', error)
			throw error // Propagar el error para que se maneje en el slice
		}
	}
)
