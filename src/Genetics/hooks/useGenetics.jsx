import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadGenetics } from '../store/geneticsAsyncActions'

export function useGenetics() {
	const dispatch = useDispatch()
	const geneticsStore = useSelector((state) => state.geneticsStore)

	useEffect(() => {
		if (!geneticsStore.loaded) {
			dispatch(loadGenetics())
		}
	}, [])

	return geneticsStore
}
