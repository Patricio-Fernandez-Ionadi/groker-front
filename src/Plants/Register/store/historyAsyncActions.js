import { createAsyncThunk } from '@reduxjs/toolkit'
import { store_updatePlant } from '../../index'
import {
	formatDateToYYYYMMDD,
	formatDateToISO,
	calculateEstimatedChange,
} from '../../utils/dateUtils'
// import {
// 	applyStockDifferences,
// 	calculateStockDifference,
// } from '../../../utils/stockUtils'

export const savePlantHistory = createAsyncThunk(
	'historyStore/savePlantHistory',
	async (editingState, { dispatch, getState }) => {
		const store = getState()

		try {
			const { products: selectedProducts } = editingState
			let selectedPlant = store.plantsStore.selectedPlant

			const today = formatDateToYYYYMMDD(new Date())
			const todayHistoryIndex = selectedPlant.history?.findIndex(
				(h) => formatDateToYYYYMMDD(h.date) === today
			)

			const hayHistorial = todayHistoryIndex !== -1

			// Inicializar changes con los eventos existentes o un array vacío
			let changes = []
			if (hayHistorial) {
				changes = [...selectedPlant.history[todayHistoryIndex].events]
			}

			// ##### ADVANCED #####
			// NAME
			if (editingState.name !== selectedPlant.name) {
				changes.push({ type: 'name', details: editingState.name })

				const updatedPlant = {
					...selectedPlant,
					name: editingState.name,
				}

				const resultAction = await dispatch(store_updatePlant(updatedPlant))
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('name', selectedPlant)
			}
			// ENTRY DATE
			if (
				formatDateToYYYYMMDD(editingState.entryDate) !==
				formatDateToYYYYMMDD(selectedPlant.entryDate)
			) {
				const newChangeDate = calculateEstimatedChange(editingState)

				changes.push(
					{
						type: 'entryDate',
						details: formatDateToISO(editingState.entryDate),
					},
					{
						type: 'estimatedChange',
						details: formatDateToISO(newChangeDate),
					}
				)
				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						entryDate: formatDateToISO(editingState.entryDate),
						estimatedChange: formatDateToISO(newChangeDate),
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('entryDate', selectedPlant)
			}
			// GENETIC
			if (editingState.genetic !== selectedPlant.genetic.name) {
				const selectedGenetic = store.geneticsStore.genetics.find(
					(gen) => gen.name === editingState.genetic
				)
				changes.push({ type: 'genetic', details: selectedGenetic })

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						genetic: selectedGenetic,
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('genetic', selectedPlant)
			}
			// ESTIMATED CHANGE
			if (
				formatDateToYYYYMMDD(editingState.estimatedChange) !==
				formatDateToYYYYMMDD(selectedPlant.estimatedChange)
			) {
				changes.push({
					type: 'estimatedChange',
					details: formatDateToISO(editingState.estimatedChange),
				})
				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						estimatedChange: formatDateToISO(editingState.estimatedChange),
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('estimatedChange', selectedPlant)
			}

			// ##### COMMON #####
			// STAGE
			if (editingState.stage !== selectedPlant.stage) {
				changes.push({ type: 'stage', details: editingState.stage })

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						stage: editingState.stage,
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('stage', selectedPlant)
			}
			// POT SIZE
			if (Number(editingState.potSize) !== selectedPlant.potSize) {
				changes.push({ type: 'potSize', details: editingState.potSize })

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						potSize: Number(editingState.potSize),
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('potSize', selectedPlant)
			}
			// TEMPERATURE
			if (Number(editingState.temperature) !== selectedPlant.temperature) {
				changes.push({ type: 'temperature', details: editingState.temperature })

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						temperature: Number(editingState.temperature),
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('temperature', selectedPlant)
			}
			// HUMIDITY
			if (Number(editingState.humidity) !== selectedPlant.humidity) {
				changes.push({ type: 'humidity', details: editingState.humidity })

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						humidity: Number(editingState.humidity),
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('humidity', selectedPlant)
			}
			// IS FINAL POT
			if (editingState.flags.isFinalPot !== selectedPlant.flags.isFinalPot) {
				changes.push({
					type: 'isFinalPot',
					details: editingState.flags.isFinalPot,
				})

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						flags: {
							...selectedPlant.flags,
							isFinalPot: editingState.flags.isFinalPot,
						},
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('isFinalPot', selectedPlant)
			}
			// UNDER OBSERVATION
			if (
				editingState.flags.underObservation !==
				selectedPlant.flags.underObservation
			) {
				changes.push({
					type: 'underObservation',
					details: editingState.flags.underObservation,
				})

				const resultAction = await dispatch(
					store_updatePlant({
						...selectedPlant,
						flags: {
							...selectedPlant.flags,
							underObservation: editingState.flags.underObservation,
						},
					})
				)
				if (store_updatePlant.fulfilled.match(resultAction)) {
					selectedPlant = resultAction.payload
				}
				console.log('underObservation', selectedPlant)
			}

			/* $$$$$$$$$$$$ TODO $$$$$$$$$$$$ */

			// NOTES
			if (editingState.note && editingState.note.trim() !== '') {
				const newNote = { id: Date.now(), note: editingState.note }
				const existingNoteEvent = changes.find(
					(change) => change.type === 'note'
				)

				if (existingNoteEvent) {
					// Si ya existe un evento de tipo 'note', agregar la nueva nota al array `details`
					// Crear una copia del objeto y del array de detalles
					const updatedNoteEvent = {
						...existingNoteEvent,
						details: [...existingNoteEvent.details, newNote],
					}

					// Reemplazar el evento viejo por el nuevo en el array de cambios
					changes = changes.map((change) =>
						change.type === 'note' ? updatedNoteEvent : change
					)
				} else {
					// Si no existe un evento de tipo 'note', crear uno nuevo
					changes.push({
						type: 'note',
						details: [newNote],
					})
				}
			}

			// ##### WATERING #####

			// Manejo del evento 'watering'
			let hasWateringData = false // Bandera para verificar si hay datos de riego
			const wateringEvent = {
				type: 'watering',
				details: {},
			}

			// LASTWATERED
			if (
				formatDateToYYYYMMDD(editingState.lastWatered) !==
					formatDateToYYYYMMDD(selectedPlant.lastWatered) &&
				editingState.lastWatered !== ''
			) {
				wateringEvent.details.lastWatered = formatDateToISO(
					editingState.lastWatered
				)
				hasWateringData = true
				dispatch(
					store_updatePlant({
						...selectedPlant,
						lastWatered: formatDateToISO(editingState.lastWatered),
					})
				)
			}
			// PH
			if (
				Number(editingState.ph) !== selectedPlant.ph &&
				editingState.ph !== ''
			) {
				wateringEvent.details.ph = Number(editingState.ph)
				hasWateringData = true
			}
			// EC
			if (
				Number(editingState.ec) !== selectedPlant.ec &&
				editingState.ec !== ''
			) {
				wateringEvent.details.ec = Number(editingState.ec)
				hasWateringData = true
			}
			// AMOUNT
			if (
				Number(editingState.amount) !== selectedPlant.amount &&
				editingState.amount !== ''
			) {
				wateringEvent.details.amount = Number(editingState.amount)
				hasWateringData = true
			}

			// PRODUCTOS USADOS
			// Verificar productsUsed
			/* if (selectedProducts.length > 0) {
				wateringEvent.details.productsUsed = selectedProducts.map(
					(product) => ({
						product: product.product,
						amount: product.productAmount,
					})
				)
				hasWateringData = true
			} */
			if (selectedProducts.length > 0) {
				// Clonar la lista actual de productos usados
				const previousProductsUsed = [
					...(wateringEvent.details.productsUsed || []),
				]

				// Crear un mapa de productos usados para actualizarlos sin perder otros registros
				const productsMap = new Map(
					previousProductsUsed.map((p) => [p.product._id, p])
				)

				// Actualizar productos existentes o agregar nuevos
				selectedProducts.forEach((product) => {
					productsMap.set(product.product._id, {
						product: product.product,
						amount: product.productAmount,
					})
				})

				console.log(
					'Previous productsUsed:',
					wateringEvent.details.productsUsed
				)
				console.log('Updated productsUsed:', Array.from(productsMap.values()))

				// Convertir el mapa de vuelta a un array y asignarlo
				wateringEvent.details.productsUsed = Array.from(productsMap.values())

				hasWateringData = true
			}

			if (hasWateringData) {
				// Buscar si ya existe un evento de tipo 'watering'
				let existingWateringEvent = changes.find(
					(change) => change.type === 'watering'
				)

				if (existingWateringEvent) {
					// Fusionar los datos de riego
					// Crear un nuevo objeto en lugar de modificar el existente
					const updatedWateringEvent = {
						...existingWateringEvent,
						details: {
							...existingWateringEvent.details,
							...wateringEvent.details,
						},
					}

					// Reemplazar en el array `changes`
					changes = changes.map((event) =>
						event.type === 'watering' ? updatedWateringEvent : event
					)
				} else {
					// Agregar un nuevo evento de riego
					changes.push(wateringEvent)
				}
			}

			// Si no hay cambios válidos, no se guarda nada en el historial
			if (changes.length === 0) {
				return
			}

			// const updatedPlant = {
			// ...selectedPlant,
			// name: editingState.name,
			// stage: editingState.stage,
			// potSize: Number(editingState.potSize),
			// temperature: Number(editingState.temperature),
			// humidity: Number(editingState.humidity),
			// lastWatered: formatDateToISO(editingState.lastWatered),
			// history:
			// 	todayHistoryIndex !== -1
			// 		? selectedPlant.history.map((entry, index) =>
			// 				index === todayHistoryIndex
			// 					? { ...entry, events: changes }
			// 					: entry
			// 		  )
			// 		: [
			// 				...selectedPlant.history,
			// 				{ date: new Date().toISOString(), events: changes },
			// 		  ],
			// }

			// Despachar la acción para actualizar la planta
			// dispatch(updatePlant(updatedPlant))

			// Obtener el historial actualizado de la planta
			// const updatedHistory = updatedPlant.history

			/* // Obtener el último registro de riego del historial actualizado
			const [lastWateringRegister] =
				updatedHistory?.[updatedHistory?.length - 1]?.events?.filter(
					(ev) => ev.type === 'watering'
				) || []

			// Calcular diferencias de stock usando el historial actualizado
			const stockDifferences = calculateStockDifference(
				lastWateringRegister?.details.productsUsed || [],
				selectedProducts
			)

			console.log(stockDifferences) // Verificar las diferencias calculadas

			// Aplicar las diferencias de stock
			applyStockDifferences(stockDifferences, dispatch) */

			/* // Obtener el último registro de riego
			const lastWateringRegister = updatedHistory?.[
				updatedHistory?.length - 1
			]?.events?.find((ev) => ev.type === 'watering')

			// Si hay un registro previo de riego, modificar solo los productos afectados
			if (lastWateringRegister) {
				const previousProducts = lastWateringRegister.details.productsUsed || []

				// Crear un mapa del historial anterior para modificar solo los productos cambiados
				const productMap = new Map(
					previousProducts.map((p) => [p.product._id, p])
				)

				selectedProducts.forEach((newProduct) => {
					if (productMap.has(newProduct.product._id)) {
						// Si ya existe, actualizar solo la cantidad
						productMap.get(newProduct.product._id).amount =
							newProduct.productAmount
					} else {
						// Si es un nuevo producto, agregarlo
						productMap.set(newProduct.product._id, {
							product: newProduct.product,
							amount: newProduct.productAmount,
						})
					}
				})

				// Reconvertir el mapa a un array actualizado
				wateringEvent.details.productsUsed = Array.from(productMap.values())
			} else {
				// Si no hay registros previos, simplemente agregar los productos usados
				wateringEvent.details.productsUsed = selectedProducts.map(
					(product) => ({
						product: product.product,
						amount: product.productAmount,
					})
				)
			} */
		} catch (error) {
			console.error('Error al guardar la planta:', error)
			throw error // Propagar el error para que se maneje en el slice
		}
	}
)
