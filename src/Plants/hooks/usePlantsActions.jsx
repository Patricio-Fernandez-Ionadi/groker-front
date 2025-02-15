import { useDispatch } from 'react-redux'

import { setPlantSelected } from '../store/plantsSlice'
import { deletePlantById } from '../store/plantsAsyncActions'

export function usePlantsActions() {
	const dispatch = useDispatch()

	const selectPlant = (plant) => {
		dispatch(setPlantSelected(plant))
	}

	const unselectPlant = () => {
		dispatch(setPlantSelected(null))
	}

	const deletePlant = (id) => {
		dispatch(deletePlantById(id))
	}

	return { selectPlant, unselectPlant, deletePlant }
}
