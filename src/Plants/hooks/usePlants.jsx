import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadPlants } from '../store/plantsAsyncActions'

export function usePlants() {
	const dispatch = useDispatch()
	const plantsStore = useSelector((state) => state.plantsStore)

	useEffect(() => {
		if (!plantsStore.loaded) {
			dispatch(loadPlants())
		}
	}, [])

	return {
		plants: plantsStore.plants,
		selectedPlant: plantsStore.selectedPlant,
	}
}
