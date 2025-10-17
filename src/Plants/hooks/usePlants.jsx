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

  const { plants, selectedPlant, selectedIndex } = plantsStore
  return { plants, selectedPlant, selectedIndex }
}
