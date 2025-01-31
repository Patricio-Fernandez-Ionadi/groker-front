import React, { createContext, useState, useEffect } from 'react'
import { getGenetics } from '../api/genetics'
import { getProducts } from '../api/products'
import { api_getPlants, api_deletePlant, api_addPlant } from '../api/plants'
import { calculateEstimatedChange } from '../utils/dateUtils'

const initialState = {
	plants: [],
	genetics: [],
	products: [],
	isLoading: false,
	selectedPlant: null,
}

const AppContext = createContext()

const AppProvider = ({ children }) => {
	// estado global
	const [state, setState] = useState(initialState)

	// Cargar datos iniciales al iniciar la aplicación
	useEffect(() => {
		setState((prev) => ({ ...prev, isLoading: true }))

		if (state.genetics.length === 0) {
			getGenetics().then((data) =>
				setState((prev) => ({ ...prev, genetics: data }))
			)
			getProducts().then((data) =>
				setState((prev) => ({ ...prev, products: data }))
			)
			api_getPlants().then((data) =>
				setState((prev) => ({ ...prev, plants: data }))
			)
		}
	}, [state.plants])

	/**
	 * Selecciona una planta del inventario y la asigna al estado global.
	 * @param {Object} plant - planta a seleccionar.
	 * @returns {void}
	 */
	const selectPlant = (plant) => {
		setState((prev) => ({ ...prev, selectedPlant: plant }))
	}

	/**
	 * Agrega nueva planta al inventario haciendo POST a la API.
	 * Actualiza el estado global con la nueva planta.
	 * @param {Object} newPlant - planta a agregar.
	 * @returns {void}
	 */
	const addPlant = async (newPlant) => {
		// calculo de fecha de cambio segun fecha de ingreso y etapa de la planta
		const plantToAdd = {
			...newPlant,
			estimatedChange: calculateEstimatedChange(newPlant),
		}

		try {
			// POST de la planta
			const response = await api_addPlant(plantToAdd)

			// actualizacion del estado interno de la aplicacion
			setState((prev) => ({ ...prev, plants: [...prev.plants, response] }))
		} catch (error) {
			console.error('Error al agregar planta addPlantContext:', error)
		}
	}

	/**
	 * Elimina una planta y la elimina del estado.
	 * @param {number|string} plantId - ID de la planta a eliminar.
	 * @returns {void}
	 */
	const deletePlant = async (plantId) => {
		try {
			const response = await api_deletePlant(plantId)
			setState((prev) => ({
				...prev,
				plants: response,
			}))
		} catch (error) {
			console.error('Error al eliminar planta deletePlantContext:', error)
		}
	}

	// ----- TODO -----

	// Función para actualizar una planta
	const updatePlant = async (updatedPlant) => {
		try {
			const response = await fetch(`/api/plants/${updatedPlant._id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedPlant),
			})
			const data = await response.json()
			setState((prev) => ({
				...prev,
				plants: prev.plants.map((plant) =>
					plant._id === updatedPlant._id ? data : plant
				),
			}))
		} catch (error) {
			handleError(error)
		}
	}
	// Función para agregar un evento al historial de una planta
	const addPlantHistoryEvent = async (plantId, event) => {
		try {
			const response = await fetch(`/api/plants/${plantId}/history`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(event),
			})
			const data = await response.json()
			setState((prev) => ({
				...prev,
				plants: prev.plants.map((plant) =>
					plant._id === plantId ? data : plant
				),
			}))
		} catch (error) {
			handleError(error)
		}
	}

	// Valor proporcionado por el contexto
	const value = {
		state,
		selectPlant,
		addPlant,
		updatePlant,
		deletePlant,
		addPlantHistoryEvent,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }
