import React from 'react'
import { useDispatch } from 'react-redux'

import { setPlantByIndex, setPlantSelected } from '../store/plantsSlice'
import {
	store_addPlant,
	store_deletePlantById,
	store_loadPlants,
	store_updatePlant,
} from '../store/plantsAsyncActions'
import { usePlants } from './usePlants'

export function usePlantsActions() {
	const dispatch = useDispatch()
	const { plants } = usePlants()

	const selectPlant = (plant) => {
		dispatch(setPlantSelected(plant))
	}

	const selectPlantByIndex = (index) => {
		dispatch(setPlantByIndex(index))
	}

	const unselectPlant = () => {
		dispatch(setPlantSelected(null))
	}

	const deletePlant = (id) => {
		dispatch(store_deletePlantById(id))
	}

	const addNewPlant = async (newPlant) => {
		await dispatch(store_addPlant(newPlant))

		// actualizacion de plantas para tener el .populate('genetics') de la api
		dispatch(store_loadPlants())
	}

	const updatePlant = async (plant) => {
		await dispatch(store_updatePlant(plant))
		// actualizacion de plantas para tener el .populate('genetics') de la api
		dispatch(store_loadPlants())
		selectPlant(plant)
	}

	const getPlantById = (plantId) => {
		return plants.find((p) => p._id === plantId)
	}

	return {
		selectPlant,
		unselectPlant,
		deletePlant,
		addNewPlant,
		updatePlant,
		getPlantById,
		selectPlantByIndex,
	}
}
