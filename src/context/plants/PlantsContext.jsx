import { createContext, useContext, useEffect, useState } from 'react'
import {
	api_addPlant,
	api_deletePlant,
	api_editPlant,
	api_getPlants,
} from '../../api/plants'

import { GeneticsContext } from '../genetics/GeneticsContext'

import { calculateEstimatedChange } from '../../utils/dateUtils'

export const PlantsContext = createContext()

export const PlantsProvider = ({ children }) => {
	const [plantsState, setPlantsState] = useState({
		plants: [],
		selectedPlant: null,
	})

	const { genetics } = useContext(GeneticsContext)

	useEffect(() => {
		__getAllPlants()
	}, [])

	const __getAllPlants = async () => {
		try {
			const plants = await api_getPlants()
			setPlantsState((prev) => ({ ...prev, plants }))
		} catch (error) {
			console.error('Error al obtener las plantas:', error)
		}
	}

	/**
	 * Selecciona una planta del inventario y la asigna al estado global.
	 * @param {Object} plant - planta a seleccionar.
	 * @returns {void}
	 */
	const selectPlant = (plant) => {
		setPlantsState((prev) => ({ ...prev, selectedPlant: plant }))
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

		const geneticReference = genetics.find(
			(g) => g.name === plantToAdd.genetic // string name
		)
		// -> { _id: ..., name: ..., __v:0 }

		try {
			const addedPlant = await api_addPlant({
				...plantToAdd,
				genetic: geneticReference,
			})

			// actualizacion del estado interno de la aplicacion
			setPlantsState((prev) => ({
				...prev,
				plants: [...prev.plants, { ...addedPlant, genetic: geneticReference }],
			}))
		} catch (error) {
			console.error('Error al agregar planta addPlantContext', error)
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

			setPlantsState((prev) => ({
				...prev,
				plants: prev.plants.filter((plant) => plant._id !== plantId),
			}))
		} catch (error) {
			console.error('Error al eliminar planta deletePlantContext', error)
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

			const geneticReference = genetics.find((g) => g._id === updated.genetic)

			setPlantsState((prev) => ({
				plants: prev.plants.map((plant) =>
					plant._id === updated._id
						? { ...updated, genetic: geneticReference }
						: plant
				),
				selectedPlant: {
					...updated,
					genetic: geneticReference,
				},
			}))
		} catch (error) {
			console.error('Error al editar planta updatePlantContext', error)
		}
	}

	return (
		<PlantsContext.Provider
			value={{
				selectPlant,
				addPlant,
				updatePlant,
				deletePlant,
				plants: plantsState.plants,
				selectedPlant: plantsState.selectedPlant,
			}}
		>
			{children}
		</PlantsContext.Provider>
	)
}
