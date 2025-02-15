import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { store_loadPlants } from '../store/plantsAsyncActions'

export function usePlants() {
	const dispatch = useDispatch()
	const plantsStore = useSelector((state) => state.plantsStore)

	useEffect(() => {
		if (!plantsStore.loaded) {
			dispatch(store_loadPlants())
		}
	}, [])

	return {
		plants: plantsStore.plants,
		selectedPlant: plantsStore.selectedPlant,
	}
}
