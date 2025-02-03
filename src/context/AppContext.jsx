import React, { createContext, useState, useEffect } from 'react'
import {
	api_addGenetic,
	api_deleteGenetic,
	api_getGenetics,
} from '../api/genetics'
import { api_addProduct, api_getProducts } from '../api/products'
import {
	api_getPlants,
	api_deletePlant,
	api_addPlant,
	api_editPlant,
} from '../api/plants'
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
			api_getGenetics().then((data) =>
				setState((prev) => ({ ...prev, genetics: data }))
			)
			api_getProducts().then((data) =>
				setState((prev) => ({ ...prev, products: data }))
			)
			api_getPlants().then((data) =>
				setState((prev) => ({ ...prev, plants: data }))
			)
		}
	}, [])

	const handleError = (error, message) => console.error(message, error)

	// ##### PLANTS #####

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
			const addedPlant = await api_addPlant(plantToAdd)

			const geneticReference = state.genetics.find(
				(g) => g._id === addedPlant.genetic
			)
			const updated = { ...addedPlant, genetic: geneticReference }

			// actualizacion del estado interno de la aplicacion
			setState((prev) => ({ ...prev, plants: [...prev.plants, updated] }))
		} catch (error) {
			handleError(error, 'Error al agregar planta addPlantContext')
		}
	}

	/**
	 * Elimina una planta y la elimina del estado.
	 * @param {number|string} plantId - ID de la planta a eliminar.
	 * @returns {void}
	 */
	const deletePlant = async (plantId) => {
		try {
			await api_deletePlant(plantId)

			setState((prev) => ({
				...prev,
				plants: prev.plants.filter((plant) => plant._id !== plantId),
			}))
		} catch (error) {
			handleError(error, 'Error al eliminar planta deletePlantContext')
		}
	}

	// Función para actualizar una planta
	const updatePlant = async (updatedPlant) => {
		try {
			const updated = await api_editPlant(updatedPlant)

			const geneticReference = state.genetics.find(
				(g) => g._id === updated.genetic
			)

			setState((prev) => ({
				...prev,
				plants: prev.plants.map((plant) =>
					plant._id === updated._id
						? { ...updated, genetic: geneticReference }
						: plant
				),
				selectedPlant: { ...prev.selectedPlant, ...updated },
			}))
		} catch (error) {
			handleError(error, 'Error al editar planta updatePlantContext')
		}
	}

	// ##### GENETICS #####
	const addGenetic = async (newGenetic) => {
		try {
			const addedGenetic = await api_addGenetic(newGenetic)
			setState((prev) => ({
				...prev,
				genetics: [...prev.genetics, addedGenetic],
			}))
		} catch (error) {
			handleError(error, 'Error al agregar genetica addGeneticContext')
		}
	}

	const deleteGenetic = async (geneticId) => {
		try {
			await api_deleteGenetic(geneticId)
			setState((prev) => ({
				...prev,
				genetics: prev.genetics.filter((genetic) => genetic._id !== geneticId),
			}))
		} catch (error) {
			handleError(error, 'Error al eliminar genetica deleteGeneticContext')
		}
	}

	// ##### PRODUCTS #####

	const addProduct = async (newProduct) => {
		try {
			const addedProduct = await api_addProduct(newProduct)
			setState((prev) => ({
				...prev,
				products: [...prev.products, addedProduct],
			}))
		} catch (error) {
			handleError(error, 'Error al agregar producto addProductContext')
		}
	}

	const updateProductStock = (productId, amount) => {
		setState((prev) => ({
			...prev,
			products: prev.products.map((product) =>
				product._id === productId
					? { ...product, stock: product.stock - amount }
					: product
			),
		}))
	}

	// Valor proporcionado por el contexto
	const value = {
		state,
		// plants
		selectPlant,
		addPlant,
		updatePlant,
		deletePlant,
		// genetics
		addGenetic,
		deleteGenetic,
		// products
		addProduct,
		updateProductStock,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }
