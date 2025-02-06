import { createContext, useContext, useEffect, useState } from 'react'
// contextos
import { PlantsContext } from './PlantsContext'
import { FormContext } from '../FormContext'
// hooks
import { usePlantState } from '../../hooks/plants/usePlantState'
import { useNotesLogic } from '../../hooks/plants/useNotesLogic'
import { useHistoryEvents } from '../../hooks/plants/useHistoryEvents'
import { useWateringLogic } from '../../hooks/plants/useWateringLogic'
import { useStockManagement } from '../../hooks/products/useStockManagement'
// utils
import { formatDateToISO, formatDateToYYYYMMDD } from '../../utils/dateUtils'
import { existingEventIndex } from '../../utils/helpers'

export const PlantEditionContext = createContext()

export const PlantsEditiontProvider = ({ children }) => {
	const { selectedPlant, updatePlant } = useContext(PlantsContext)
	const { isEditPlantFormOpen, closeEditPlantForm } = useContext(FormContext)

	// Local States
	const [showAdvancedFields, setShowAdvancedFields] = useState(false)
	const [isWatered, setIsWatered] = useState(false)
	const [shouldSave, setShouldSave] = useState(false)
	// copia de planta saleccionada para edicion
	const plantToCopy = {
		...selectedPlant,
		entryDate: formatDateToYYYYMMDD(selectedPlant.entryDate),
		estimatedChange: formatDateToYYYYMMDD(selectedPlant.estimatedChange),
	}
	const [editedPlant, setEditedPlant] = useState(plantToCopy)

	const { newNote, handleAddNote } = useNotesLogic()
	const { newEvents, setNewEvents, addOrUpdateEvent, deleteNoteFromHistory } =
		useHistoryEvents()

	const {
		wateringData,
		handleWateringEntry,
		addProductField,
		removeProductField,
	} = useWateringLogic(setEditedPlant)

	const { handlePlantChange } = usePlantState(
		newEvents,
		setNewEvents,
		setEditedPlant
	)

	const { calculateStockDifference, applyStockDifferences } =
		useStockManagement()

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

			setEditedPlant(plantToCopy)
		}
	}, [selectedPlant])

	useEffect(() => {
		if (shouldSave) {
			const updatedHistory = addOrUpdateEvent(editedPlant.history, newEvents)

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

	const contextExposes = {
		showAdvancedFields,
		setShowAdvancedFields,
		isWatered,
		setIsWatered,
		editedPlant,
		handlePlantChange,
		newEvents,
		handleAddNote,
		deleteNoteFromHistory,
		wateringData,
		handleWateringEntry,
		addProductField,
		removeProductField,
		handleSubmit,
	}

	return (
		<PlantEditionContext.Provider value={contextExposes}>
			{children}
		</PlantEditionContext.Provider>
	)
}
