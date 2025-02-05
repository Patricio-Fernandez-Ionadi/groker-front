import React, { createContext, useState, useEffect } from 'react'
import {
	api_addGenetic,
	api_deleteGenetic,
	api_getGenetics,
} from '../api/genetics'
import {
	api_addProduct,
	api_deleteProduct,
	api_editProduct,
	api_getProducts,
} from '../api/products'
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
	selectedProduct: null,
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

	const handleError = (error, message) => {
		console.error(message, error)
		alert(`${message}\n${error?.message || ''} `)
	}

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
	 * @requires name-entryDate
	 * @returns {void}
	 */
	const addPlant = async (newPlant) => {
		const plantToAdd = {
			...newPlant,
			estimatedChange: calculateEstimatedChange(newPlant),
		}

		const geneticReference = state.genetics.find(
			(g) => g.name === plantToAdd.genetic // string name
		)
		// -> { _id: ..., name: ..., __v:0 }

		try {
			const addedPlant = await api_addPlant({
				...plantToAdd,
				genetic: geneticReference,
			})

			// actualizacion del estado interno de la aplicacion
			setState((prev) => ({
				...prev,
				plants: [...prev.plants, { ...addedPlant, genetic: geneticReference }],
			}))
		} catch (error) {
			handleError(error, 'Error al agregar planta addPlantContext')
		}
	}

	/**
	 * Elimina una planta y la elimina del estado.
	 * @param {string} plantId - ID de la planta a eliminar.
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

	/**
	 * Edita una planta existente en el inventario y actualiza el estado global.
	 * @param {Object} updatedPlant - La planta con los nuevos datos.
	 * @returns {void}
	 */
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

	const selectProduct = (product) => {
		setState((prev) => ({ ...prev, selectedProduct: product }))
	}

	const removeStateProduct = () => {
		setState((prev) => ({ ...prev, selectedProduct: null }))
	}

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

	const editExistingProduct = async (updatedProduct) => {
		/* TODO
			hay que asegurarse que el producto tenga _id ya que si fue agregado sin refrescar la app al estar guardado en el estado (optimist render) no la tendrá 
			// actualizar los productos en el estado antes de seguir
		*/
		try {
			const updated = await api_editProduct(updatedProduct._id, updatedProduct)
			setState((prev) => ({
				...prev,
				products: prev.products.map((product) =>
					product._id === updatedProduct._id ? updated : product
				),
			}))
		} catch (error) {
			handleError(error, 'Error al editar producto updateProductContext')
		}
	}

	const deleteProduct = async (productId) => {
		console.log('eliminar producto de api:', productId)

		/* TODO
			hay que asegurarse que el producto tenga _id ya que si fue agregado sin refrescar la app al estar guardado en el estado (optimist render) no la tendrá 
			// actualizar los productos en el estado antes de seguir
		*/

		try {
			await api_deleteProduct(productId)
			setState((prev) => ({
				...prev,
				products: prev.products.filter((product) => product._id !== productId),
			}))
		} catch (error) {
			handleError(error, 'Error al eliminar producto deleteProductContext')
		}
	}

	const updateProductStock = async (productId, amount) => {
		const productToUpdate = state.products.find((p) => p._id === productId)

		// aca hacemos un retorno pero deberiamos chequear que todos los productos tengan _id primero ya que en el estado podria haber productos sin esta propiedad

		if (!productToUpdate) {
			handleError(null, `Producto con ID ${productId} no encontrado.`)
			return
		}

		// Calcular el nuevo stock
		const newStock = productToUpdate.stock + amount

		// actualizacion en el estado de la aplicacion
		setState((prev) => ({
			...prev,
			products: prev.products.map((product) =>
				product._id === productId ? { ...product, stock: newStock } : product
			),
		}))

		// Actualizar el stock en la base de datos
		try {
			await api_editProduct(productId, { ...productToUpdate, stock: newStock })
		} catch (error) {
			handleError(error, 'Error al actualizar el stock en la base de datos')
		}
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
		selectProduct,
		removeStateProduct,
		addProduct,
		editExistingProduct,
		deleteProduct,
		updateProductStock,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }
