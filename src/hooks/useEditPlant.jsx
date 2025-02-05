import { useState, useEffect, useContext } from 'react'
import { ProductsContext } from '../context/products/ProductsContext'
import { GeneticsContext } from '../context/genetics/GeneticsContext'
import { PlantsContext } from '../context/plants/PlantsContext'
import { FormContext } from '../context/FormContext'

import {
	calculateEstimatedChange,
	formatDateToISO,
	formatDateToYYYYMMDD,
} from '../utils/dateUtils'
import { editPrevEvent, existingEventIndex } from '../utils/helpers'

export const useEditPlant = () => {
	const { products, updateProductStock } = useContext(ProductsContext)
	const { genetics } = useContext(GeneticsContext)
	const { selectedPlant, updatePlant } = useContext(PlantsContext)

	const { isEditPlantFormOpen, closeEditPlantForm } = useContext(FormContext)

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

			isEditPlantFormOpen && closeEditPlantForm()
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
				const newGenetic = genetics.find(
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
					const product = products.find((p) => p.name === value)
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

	const calculateStockDifference = (previousProducts, newProducts) => {
		const stockDifferences = []

		// Iterar sobre los productos nuevos
		newProducts.forEach((newProduct) => {
			const previousProduct = previousProducts.find(
				(p) => p.product._id === newProduct.product._id
			)

			if (previousProduct) {
				// Si el producto ya existía, calcular la diferencia
				const difference = -(
					newProduct.productAmount - previousProduct.productAmount
				)
				stockDifferences.push({
					productId: newProduct.product._id,
					difference,
				})
			} else {
				// Si es un producto nuevo, restar la cantidad completa
				stockDifferences.push({
					productId: newProduct.product._id,
					difference: -newProduct.productAmount,
				})
			}
		})

		// Iterar sobre los productos antiguos para detectar eliminaciones
		previousProducts.forEach((prevProduct) => {
			const newProduct = newProducts.find(
				(p) => p.product._id === prevProduct.product._id
			)

			if (!newProduct) {
				// Si el producto fue eliminado, devolverlo al stock
				stockDifferences.push({
					productId: prevProduct.product._id,
					difference: prevProduct.productAmount,
				})
			}
		})

		return stockDifferences
	}

	const applyStockDifferences = (stockDifferences) => {
		stockDifferences.forEach(({ productId, difference }) => {
			updateProductStock(productId, difference)
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		// Guardar notas si existen
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

		// Manejar registros de riego
		if (isWatered) {
			const wateringEventIndex = existingEventIndex('watering', newEvents)

			if (wateringEventIndex !== -1) {
				const previousWateringData = newEvents[wateringEventIndex].details

				// Crear un objeto para mapear los productos previos por su ID
				const previousProductsMap = new Map(
					previousWateringData.productsUsed.map((p) => [p.product._id, p])
				)

				// Fusionar productos: actualizar existentes, mantener no modificados y agregar nuevos
				const updatedProductsUsed = [
					...previousWateringData.productsUsed.map((prevProduct) => {
						const editedProduct = wateringData.productsUsed.find(
							(p) => p.product._id === prevProduct.product._id
						)
						return editedProduct
							? { ...prevProduct, productAmount: editedProduct.productAmount }
							: prevProduct
					}),
					...wateringData.productsUsed.filter(
						(newProduct) => !previousProductsMap.has(newProduct.product._id)
					),
				]

				const newEditedWatering = {
					amount: wateringData.amount || previousWateringData.amount,
					ec: wateringData.ec || previousWateringData.ec,
					ph: wateringData.ph || previousWateringData.ph,
					productsUsed: updatedProductsUsed,
				}

				// Calcular las diferencias de stock
				const stockDifferences = calculateStockDifference(
					previousWateringData.productsUsed,
					updatedProductsUsed
				)

				// Aplicar las diferencias al stock
				applyStockDifferences(stockDifferences)

				// Actualizar el evento de riego
				setNewEvents((prev) =>
					prev.map((event, index) =>
						index === wateringEventIndex
							? { type: 'watering', details: newEditedWatering }
							: event
					)
				)
			} else {
				// Si es un nuevo registro de riego, calcular las diferencias desde cero
				const stockDifferences = wateringData.productsUsed.map(
					(productUsed) => ({
						productId: productUsed.product._id,
						difference: -productUsed.productAmount,
					})
				)

				// Aplicar las diferencias al stock
				applyStockDifferences(stockDifferences)

				// Agregar el nuevo evento de riego
				setNewEvents((prev) => [
					...prev,
					{ type: 'watering', details: wateringData },
				])
			}
		}

		// Marcar para guardar
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
