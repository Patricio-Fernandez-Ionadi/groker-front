import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {
	calculateEstimatedChange,
	formatDateToISO,
	formatDateToYYYYMMDD,
} from '../utils/dateUtils'
import { editPrevEvent, existingEventIndex } from '../utils/helpers'

export const useEditPlant = () => {
	const { state, updateProductStock, updatePlant } = useContext(AppContext)
	const { selectedPlant } = state

	const [showAdvancedFields, setShowAdvancedFields] = useState(false)
	const [isWatered, setIsWatered] = useState(false)
	const [shouldSave, setShouldSave] = useState(false)
	const [newEvents, setNewEvents] = useState([])
	const [newNote, setNewNote] = useState({ id: '', note: '' })
	const [wateringData, setWateringData] = useState({
		amount: '',
		productsUsed: [],
		ph: '',
		ec: '',
	})

	const [editedPlant, setEditedPlant] = useState({
		...selectedPlant,
		entryDate: formatDateToYYYYMMDD(selectedPlant.entryDate),
		estimatedChange: formatDateToYYYYMMDD(selectedPlant.estimatedChange),
	})

	useEffect(() => {
		if (selectedPlant) {
			const todayISO = new Date().toISOString().split('T')[0]

			// Buscar si ya existe un registro con la fecha de hoy
			const existingIndex = editedPlant.history.findIndex(
				(entry) => new Date(entry.date).toISOString().split('T')[0] === todayISO
			)

			if (existingIndex !== -1) {
				setNewEvents(editedPlant.history[existingIndex].events)
			}

			setEditedPlant({
				...selectedPlant,
				entryDate: formatDateToYYYYMMDD(selectedPlant.entryDate),
				estimatedChange: formatDateToYYYYMMDD(selectedPlant.estimatedChange),
			})
		}
	}, [selectedPlant])

	useEffect(() => {
		if (shouldSave) {
			const updatedHistory = updateHistoryWithNewEvents(
				editedPlant.history,
				newEvents
			)

			const plantToSave = {
				...editedPlant,
				entryDate: formatDateToISO(editedPlant.entryDate),
				estimatedChange: formatDateToISO(editedPlant.estimatedChange),
				history: updatedHistory,
			}

			updatePlant(plantToSave)

			setShouldSave(false)
		}
	}, [newEvents, shouldSave])

	const handlePlantChange = (e) => {
		const { name, value, type, checked } = e.target

		// Si el campo es un checkbox, usa "checked" en lugar de "value"
		const fieldValue = type === 'checkbox' ? checked : value

		switch (name) {
			case 'entryDate':
				setEditedPlant((prev) => ({
					...prev,
					entryDate: fieldValue,
					estimatedChange: calculateEstimatedChange({
						...prev,
						entryDate: fieldValue,
					}),
				}))

				editPrevEvent('entryDate', fieldValue, newEvents, setNewEvents)
				break

			case 'name':
				setEditedPlant((prev) => ({
					...prev,
					name: fieldValue,
				}))
				editPrevEvent('name', fieldValue, newEvents, setNewEvents)
				break

			case 'stage':
				setEditedPlant((prev) => ({
					...prev,
					stage: fieldValue,
					estimatedChange: calculateEstimatedChange({
						...prev,
						stage: fieldValue,
					}),
				}))
				editPrevEvent('stage', fieldValue, newEvents, setNewEvents)
				break

			case 'genetic':
				const newGenetic = state.genetics.find(
					(genetic) => genetic.name === fieldValue
				)

				setEditedPlant((prev) => ({
					...prev,
					genetic: newGenetic,
				}))
				editPrevEvent('genetic', fieldValue, newEvents, setNewEvents)
				break

			case 'estimatedChange':
				setEditedPlant((prev) => ({
					...prev,
					estimatedChange: fieldValue,
				}))
				editPrevEvent('estimatedChange', fieldValue, newEvents, setNewEvents)
				break

			case 'potSize':
				setEditedPlant((prev) => ({
					...prev,
					potSize: fieldValue,
				}))
				editPrevEvent('potSize', fieldValue, newEvents, setNewEvents)
				break

			case 'isFinalPot':
				setEditedPlant((prev) => ({
					...prev,
					flags: {
						...prev.flags,
						isFinalPot: fieldValue,
					},
				}))
				editPrevEvent('isFinalPot', fieldValue, newEvents, setNewEvents)
				break

			case 'underObservation':
				setEditedPlant((prev) => ({
					...prev,
					flags: {
						...prev.flags,
						underObservation: fieldValue,
					},
				}))
				editPrevEvent('underObservation', fieldValue, newEvents, setNewEvents)
				break

			case 'temperature':
				setEditedPlant((prev) => ({
					...prev,
					temperature: fieldValue,
				}))
				editPrevEvent('temperature', fieldValue, newEvents, setNewEvents)
				break

			case 'humidity':
				setEditedPlant((prev) => ({
					...prev,
					humidity: fieldValue,
				}))
				editPrevEvent('humidity', fieldValue, newEvents, setNewEvents)
				break

			default:
				console.warn(`Campo no manejado: ${name}`)
				break
		}
	}

	const handleAddNote = (e) => {
		setNewNote({ id: Date.now(), note: e.target.value })
	}

	const handleWateringEntry = (e, index = null) => {
		const { name, value } = e.target
		const formattedValue =
			name === 'lastWatering' ? formatDateToISO(value) : value

		setWateringData((prev) => {
			if (index !== null) {
				const updatedProducts = [...prev.productsUsed]
				updatedProducts[index] = {
					...updatedProducts[index],
					[name]: formattedValue,
				}

				if (name === 'product') {
					const product = state.products.find((p) => p.name === value)
					updatedProducts[index].product = product
				}

				return { ...prev, productsUsed: updatedProducts }
			}
			return { ...prev, [name]: formattedValue }
		})

		if (name === 'lastWatering') {
			setEditedPlant((prev) => ({
				...prev,
				lastWatered: formatDateToISO(value),
			}))
		}
	}

	// Añadir un nuevo producto utilizado en el riego
	const addProductField = () => {
		setWateringData((prev) => ({
			...prev,
			productsUsed: [...prev.productsUsed, { product: '', productAmount: '' }],
		}))
	}

	/**
	 * Elimina campo de seleccion de producto del formulario
	 * @param {number} index - indice del formulario.
	 */
	const removeProductField = (index) => {
		setWateringData((prev) => ({
			...prev,
			productsUsed: prev.productsUsed.filter((_, i) => i !== index),
		}))
	}

	const updateHistoryWithNewEvents = (history, newEvents) => {
		const todayISO = new Date().toISOString().split('T')[0]

		const existingIndex = history.findIndex(
			(entry) => new Date(entry.date).toISOString().split('T')[0] === todayISO
		)

		if (existingIndex !== -1) {
			// Si ya existe un registro, actualizar eventos sin duplicarlos
			const updatedEvents = [
				...history[existingIndex].events.filter(
					(event) => !newEvents.some((newEvent) => newEvent.type === event.type)
				),
				...newEvents,
			]

			const updatedHistory = [...history]
			updatedHistory[existingIndex] = {
				...history[existingIndex],
				events: updatedEvents,
			}
			return updatedHistory
		} else {
			// Si no existe, agregar un nuevo registro
			return [
				...history,
				{ date: new Date().toISOString(), events: [...newEvents] },
			]
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (newNote.note.trim() !== '') {
			setNewEvents((prev) => {
				const noteEventIndex = existingEventIndex('note', prev)
				return noteEventIndex !== -1
					? prev.map((event, index) =>
							index === noteEventIndex
								? { ...event, details: [...event.details, newNote] }
								: event
					  )
					: [...prev, { type: 'note', details: [newNote] }]
			})
		}

		if (isWatered) {
			const wateringEventIndex = existingEventIndex('watering', newEvents)

			if (wateringEventIndex !== -1) {
				const previousWateringData = newEvents[wateringEventIndex].details

				// Crear un objeto para mapear los productos previos por su ID
				const previousProductsMap = new Map(
					previousWateringData.productsUsed.map((p) => [p.product._id, p])
				)

				// Actualizar o agregar productos con la referencia correcta
				// Fusionamos los productos: actualizamos existentes y mantenemos los no modificados
				const updatedProductsUsed = [
					...previousWateringData.productsUsed.map((prevProduct) => {
						const editedProduct = wateringData.productsUsed.find(
							(p) => p.product._id === prevProduct.product._id
						)
						return editedProduct
							? { ...prevProduct, productAmount: editedProduct.productAmount } // Actualizar cantidad
							: prevProduct // Mantener si no fue editado
					}),
					...wateringData.productsUsed.filter(
						(newProduct) => !previousProductsMap.has(newProduct.product._id) // Agregar productos nuevos
					),
				]

				const newEditedWatering = {
					amount: wateringData.amount || previousWateringData.amount,
					ec: wateringData.ec || previousWateringData.ec,
					ph: wateringData.ph || previousWateringData.ph,
					productsUsed: updatedProductsUsed,
				}

				// Calcular la diferencia en el stock de productos
				updatedProductsUsed.forEach((productUsed) => {
					const prevProduct = previousProductsMap.get(productUsed.product._id)
					if (prevProduct) {
						const difference =
							productUsed.productAmount - prevProduct.productAmount
						updateProductStock(productUsed.product._id, difference)
					}
				})

				setNewEvents((prev) =>
					prev.map((event, index) =>
						index === wateringEventIndex
							? { type: 'watering', details: newEditedWatering }
							: event
					)
				)
			} else {
				setNewEvents((prev) => [
					...prev,
					{ type: 'watering', details: wateringData },
				])

				// Actualizar el stock de productos utilizados en el riego
				wateringData.productsUsed.forEach((productUsed) => {
					if (productUsed.product && productUsed.productAmount) {
						const product = state.products.find(
							(p) => p._id === productUsed.product._id
						)
						if (product) {
							updateProductStock(product._id, productUsed.productAmount)
						}
					}
				})
			}
		}

		setShouldSave(true)
	}

	return {
		showAdvancedFields,
		setShowAdvancedFields,
		isWatered,
		setIsWatered,
		editedPlant,
		handlePlantChange,
		newEvents,
		handleAddNote,
		wateringData,
		handleWateringEntry,
		addProductField,
		removeProductField,
		handleSubmit,
	}
}
