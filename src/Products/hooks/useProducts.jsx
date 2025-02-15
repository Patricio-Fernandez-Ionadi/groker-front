import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { store_loadProducts } from '../store/productsAsyncActions'

export function useProducts() {
	const dispatch = useDispatch()
	const productsStore = useSelector((state) => state.productsStore)

	useEffect(() => {
		if (!productsStore.loaded) {
			dispatch(store_loadProducts())
		}
	}, [])

	return productsStore
}
