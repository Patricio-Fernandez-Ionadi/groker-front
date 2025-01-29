import React, { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { translateField } from '../utils/translations'
import { samplePlants } from '../utils/sampleData'
import { formatDate } from '../utils/dateUtils'

export const PlantContext = createContext()

/**
 * Proveedor del contexto de plantas.
 * @param {Object} props - Props del componente.
 */
export const PlantProvider = (props) => {
	// Estado para almacenar las plantas
	const [plants, setPlants] = useState([])
	// Estado para almacenar la planta seleccionada
	const [selectedPlant, setSelectedPlant] = useState(null)
	// Estado para almacenar el historial de cambios
	const [history, setHistory] = useState([])
	// Estado para almacenar el modo de visualización ('details' o 'edit')
	const [viewMode, setViewMode] = useState('details')

	// Cargar plantas desde localStorage al montar el componente
	useEffect(() => {
		const storedPlants = JSON.parse(localStorage.getItem('plants'))
		// Establecer plantas desde localStorage
		if (storedPlants) setPlants(storedPlants)
		// Establecer plantas desde sampleData
		else setPlants(samplePlants)
	}, [])

	// Guardar plantas en localStorage cuando cambie el estado de plantas
	useEffect(() => {
		localStorage.setItem('plants', JSON.stringify(plants))
	}, [plants])

	/**
	 * Añade una nueva planta al inventario.
	 * @param {Object} plantData - Datos de la nueva planta.
	 * @returns {void}
	 */
	const addPlant = (plantData) => {
		const newPlant = {
			id: uuidv4(),
			entryDate: plantData.entryDate,
			name: plantData.name,
			genetic: plantData.genetic,
			stage: plantData.stage,
			estimatedChange: plantData.estimatedChange,
			lastWatered: '',
			potSize: plantData.potSize,
			isFinalPot: plantData.isFinalPot,
			underObservation: false,
			history: [
				{
					date: new Date().toISOString().split('T')[0],
					changes: ['Planta añadida'],
				},
			],
		}
		setPlants([...plants, newPlant])
	}

	/**
	 * Elimina una planta del inventario.
	 * @param {number} id - ID de la planta a eliminar.
	 * @returns {void}
	 */
	const deletePlant = (id) => {
		setPlants(plants.filter((plant) => plant.id !== id))
	}

	/**
	 * Selecciona una planta del inventario.
	 * @param {Object} plant - Objeto de la planta seleccionada.
	 * @param {string} mode - Modo de visualización (details o edit).
	 * @returns {void}
	 */
	const selectPlant = (plant, mode = 'details') => {
		setSelectedPlant(plant) // Establecer la planta seleccionada.
		setHistory(plant.history) // Establecer el historial de la planta seleccionada.
		setViewMode(mode) // Establecer el modo de visualización.
	}

	/**
	 * Actualiza una planta y registra el cambio.
	 * @param {Object} updatedPlant - Objeto de la planta actualizada.
	 * @param {Object} wateringData - Datos de riego.
	 * @param {Array} products - Lista de productos disponibles.
	 * @returns {void}
	 */
	const updatePlant = (updatedPlant, wateringData, products) => {
		// Actualizar la planta en el estado de plantas.
		const updatedPlants = plants.map((plant) =>
			plant.id === updatedPlant.id ? { ...plant, ...updatedPlant } : plant
		)

		const today = new Date().toISOString().split('T')[0]

		// Encontrar la planta actualizada.
		const plantToUpdate = updatedPlants.find(
			(plant) => plant.id === updatedPlant.id
		)

		// Obtener la última entrada del historial.
		const lastHistoryEntry =
			plantToUpdate.history[plantToUpdate.history.length - 1]

		// Registrar solo los cambios específicos.
		const changes = []
		for (const key in updatedPlant) {
			if (updatedPlant[key] !== selectedPlant[key]) {
				// Añadir cambios específicos
				changes.push(`${translateField(key)}: ${updatedPlant[key]}`)
			}
		}

		// Registrar datos del riego.
		if (wateringData) {
			if (wateringData.amount)
				changes.push(`Cantidad de agua: ${wateringData.amount} ml`)
			wateringData.productsUsed.forEach((productUsed) => {
				if (productUsed.product) {
					const product = products.find((p) => p.id === productUsed.product)
					if (product)
						changes.push(
							`Producto: ${product.name} (${productUsed.productAmount} ml)`
						)
				}
			})
			if (wateringData.ph) changes.push(`pH del agua: ${wateringData.ph}`)
			if (wateringData.ec) changes.push(`EC del agua: ${wateringData.ec}`)
			if (wateringData.temperature)
				changes.push(`Temperatura: ${wateringData.temperature} °C`)
			if (wateringData.humidity)
				changes.push(`Humedad: ${wateringData.humidity} %`)
			if (
				wateringData.lastWatered &&
				wateringData.lastWatered !== plantToUpdate.lastWatered
			) {
				changes.push(`Último riego: ${formatDate(wateringData.lastWatered)}`)

				// Actualizar la fecha de último riego en la planta.
				plantToUpdate.lastWatered = wateringData.lastWatered
			}
		}

		if (changes.length > 0) {
			if (lastHistoryEntry && lastHistoryEntry.date === today) {
				// Convertir la entrada existente en un objeto clave-valor para evitar duplicados.
				const historyMap = new Map(
					lastHistoryEntry.changes.map((change) => {
						const [key, value] = change.split(': ')
						return [key, value]
					})
				)

				// Agregar o sobrescribir los valores nuevos.
				changes.forEach((change) => {
					const [key, value] = change.split(': ')
					historyMap.set(key, value)
				})

				// Convertir de nuevo a array de strings.
				lastHistoryEntry.changes = Array.from(historyMap.entries()).map(
					([key, value]) => `${key}: ${value}`
				)
			} else {
				// Añadir una nueva entrada si no hay registro en la fecha de hoy.
				plantToUpdate.history.push({ date: today, changes })
			}
		}

		setPlants(updatedPlants) // Actualizar el estado de plantas.
		setSelectedPlant(plantToUpdate) // Actualizar la planta seleccionada.
		setHistory(plantToUpdate.history) // Actualizar el historial de la planta seleccionada.
	}

	/**
	 * Añade una nota a una planta en el inventario.
	 * @param {string} plantId - ID de la planta.
	 * @param {string} note - Nota a añadir.
	 * @returns {void}
	 */
	const addNote = (plantId, note) => {
		const updatedPlants = plants.map((plant) => {
			if (plant.id === plantId) {
				const today = new Date().toLocaleDateString()
				const lastHistoryEntry = plant.history[plant.history.length - 1]

				if (lastHistoryEntry && lastHistoryEntry.date === today)
					// Añadir nota a la última entrada del historial
					lastHistoryEntry.changes.push(`Nota: ${note}`)
				// crear una nueva fecha de entrada en el historial con la nota
				else plant.history.push({ date: today, changes: [`Nota: ${note}`] })
			}
			return plant
		})

		setPlants(updatedPlants) // Actualizar el estado de plantas
		const plantToUpdate = updatedPlants.find((plant) => plant.id === plantId)
		setSelectedPlant(plantToUpdate) // Actualizar la planta seleccionada
		setHistory(plantToUpdate.history) // Actualizar el historial de la planta seleccionada
	}

	/**
	 * Elimina una nota de una planta en el inventario.
	 * @param {string} plantId - ID de la planta.
	 * @param {number} historyIndex - Índice del historial.
	 * @param {number} noteIndex - Índice de la nota.
	 * @returns {void}
	 */
	const deleteNote = (plantId, historyIndex, noteIndex) => {
		const updatedPlants = plants.map((plant) => {
			if (plant.id === plantId) {
				// Eliminar la nota del historial
				plant.history[historyIndex].changes.splice(noteIndex, 1)
				if (plant.history[historyIndex].changes.length === 0)
					// Eliminar la entrada del historial si no tiene más cambios
					plant.history.splice(historyIndex, 1)
			}
			return plant
		})

		setPlants(updatedPlants) // Actualizar el estado de plantas
		const plantToUpdate = updatedPlants.find((plant) => plant.id === plantId)
		setSelectedPlant(plantToUpdate) // Actualizar la planta seleccionada
		setHistory(plantToUpdate.history) // Actualizar el historial de la planta seleccionada
	}

	return (
		<PlantContext.Provider
			value={{
				plants,
				addPlant,
				deletePlant,
				selectedPlant,
				selectPlant,
				updatePlant,
				addNote,
				deleteNote,
				history,
				viewMode,
			}}
		>
			{props.children}
		</PlantContext.Provider>
	)
}

// Modelos de datos

const wateringDataModel = {
	amount: '',
	productsUsed: [{ product: '', productAmount: '' }],
	ph: '',
	ec: '',
	temperature: '',
	humidity: '',
	lastWatered: '',
}

const planModel = {
	id: '',
	entryDate: '',
	name: '',
	genetic: '',
	stage: '',
	estimatedChange: '',
	lastWatered: '',
	potSize: '',
	isFinalPot: false,
	underObservation: false,
	history: [],
}

const historyModel = [
	{
		date: '',
		changes: [
			{
				field: '',
				value: '',
			},
		],
	},
]
