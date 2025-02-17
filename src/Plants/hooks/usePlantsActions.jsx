import { useDispatch } from 'react-redux'

import { setPlantSelected } from '../store/plantsSlice'
import {
	store_addPlant,
	store_deletePlantById,
	store_loadPlants,
	store_updatePlant,
} from '../store/plantsAsyncActions'

export function usePlantsActions() {
	const dispatch = useDispatch()

	const selectPlant = (plant) => {
		dispatch(setPlantSelected(plant))
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

	return { selectPlant, unselectPlant, deletePlant, addNewPlant, updatePlant }
}
