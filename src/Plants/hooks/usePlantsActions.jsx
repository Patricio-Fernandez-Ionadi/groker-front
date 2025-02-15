import { useDispatch } from 'react-redux'

import { setPlantSelected } from '../store/plantsSlice'
import {
	store_addPlant,
	store_deletePlantById,
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

	const addNewPlant = (newPlant) => {
		dispatch(store_addPlant(newPlant))
	}

	return { selectPlant, unselectPlant, deletePlant, addNewPlant }
}
