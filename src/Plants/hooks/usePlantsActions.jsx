import { useCallback } from 'react'
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

	const selectPlant = useCallback(
		(plant) => {
			dispatch(setPlantSelected(plant))
		},
		[dispatch]
	)

	const selectPlantByIndex = useCallback(
		(index) => {
			dispatch(setPlantByIndex(index))
		},
		[dispatch]
	)

	const unselectPlant = useCallback(() => {
		dispatch(setPlantSelected(null))
	}, [dispatch])

	const deletePlant = useCallback(
		(id) => {
			dispatch(store_deletePlantById(id))
		},
		[dispatch]
	)

	const addNewPlant = useCallback(
		async (newPlant) => {
			await dispatch(store_addPlant(newPlant))
			dispatch(store_loadPlants())
		},
		[dispatch]
	)

	const updatePlant = useCallback(
		async (plant) => {
			await dispatch(store_updatePlant(plant))
			dispatch(store_loadPlants())
			dispatch(setPlantSelected(plant))
		},
		[dispatch]
	)

	const getPlantById = useCallback(
		(plantId) => {
			return plants.find((p) => p._id === plantId)
		},
		[plants]
	)

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
