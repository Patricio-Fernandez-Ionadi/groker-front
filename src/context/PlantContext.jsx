import React, { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { translateField } from '../utils/translations'

export const PlantContext = createContext()

/**
 * Proveedor del contexto de plantas.
 * @param {Object} props - Props del componente.
 */
export const PlantProvider = (props) => {
	const [plants, setPlants] = useState([])
	const [selectedPlant, setSelectedPlant] = useState(null)
	const [history, setHistory] = useState([])
	const [viewMode, setViewMode] = useState('details') // 'details' o 'edit'

	// Cargar plantas desde localStorage al montar el componente
	useEffect(() => {
		const storedPlants = JSON.parse(localStorage.getItem('plants'))
		if (storedPlants) {
			setPlants(storedPlants)
		}
	}, [])

	// Guardar plantas en localStorage cuando cambie el estado de plantas
	useEffect(() => {
		localStorage.setItem('plants', JSON.stringify(plants))
	}, [plants])

	/**
	 * Añade una nueva planta al inventario.
	 * @param {Object} plantData - Datos de la nueva planta.
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
				{ date: new Date().toLocaleDateString(), changes: ['Planta añadida'] },
			],
		}
		setPlants([...plants, newPlant])
	}

	/**
	 * Elimina una planta del inventario.
	 * @param {number} id - ID de la planta a eliminar.
	 */
	const deletePlant = (id) => {
		setPlants(plants.filter((plant) => plant.id !== id))
	}

	/**
	 * Selecciona una planta del inventario.
	 * @param {Object} plant - Objeto de la planta seleccionada.
	 */
	const selectPlant = (plant, mode = 'details') => {
		setSelectedPlant(plant)
		setHistory(plant.history)
		setViewMode(mode)
	}

	/**
	 * Actualiza una planta en el inventario y registra el cambio en el historial.
	 * @param {Object} updatedPlant - Objeto de la planta actualizada.
	 * @param {string} changeDescription - Descripción del cambio realizado.
	 */
	const updatePlant = (updatedPlant, changeDescription) => {
		const updatedPlants = plants.map((plant) =>
			plant.id === updatedPlant.id ? { ...plant, ...updatedPlant } : plant
		)
		const today = new Date().toLocaleDateString()
		const plantToUpdate = updatedPlants.find(
			(plant) => plant.id === updatedPlant.id
		)
		const lastHistoryEntry =
			plantToUpdate.history[plantToUpdate.history.length - 1]

		// Registrar solo los cambios específicos
		const changes = []
		for (const key in updatedPlant) {
			if (updatedPlant[key] !== selectedPlant[key]) {
				changes.push(`${translateField(key)}: ${updatedPlant[key]}`)
			}
		}

		if (changes.length > 0) {
			if (lastHistoryEntry && lastHistoryEntry.date === today) {
				lastHistoryEntry.changes.push(...changes)
			} else {
				plantToUpdate.history.push({ date: today, changes })
			}
		}

		setPlants(updatedPlants)
		setSelectedPlant(plantToUpdate)
		setHistory(plantToUpdate.history)
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
				history,
				viewMode,
			}}
		>
			{props.children}
		</PlantContext.Provider>
	)
}
