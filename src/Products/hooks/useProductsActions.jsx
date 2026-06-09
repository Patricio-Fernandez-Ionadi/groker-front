import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { setSelectedProduct } from '../store/productsSlice'
import {
	store_addProduct,
	store_deleteProduct,
	store_updateProduct,
} from '../store/productsAsyncActions'
import {
	applyStockDifferences,
	calculateStockDifference,
} from '../utils/stockUtils'

export function useProductsActions() {
	const dispatch = useDispatch()

	const selectProduct = useCallback(
		(product) => {
			dispatch(setSelectedProduct(product))
		},
		[dispatch]
	)

	const unselectProduct = useCallback(() => {
		dispatch(setSelectedProduct(null))
	}, [dispatch])

	const addNewProduct = useCallback(
		(newProduct) => {
			dispatch(store_addProduct(newProduct))
		},
		[dispatch]
	)

	const editProduct = useCallback(
		(id) => {
			dispatch(store_updateProduct(id))
		},
		[dispatch]
	)

	const deleteProduct = useCallback(
		(id) => {
			dispatch(store_deleteProduct(id))
		},
		[dispatch]
	)

	const updateProductStock = useCallback(
		(previousProducts, newProducts) => {
			const stockDifferences = calculateStockDifference(
				previousProducts,
				newProducts
			)
			applyStockDifferences(stockDifferences, dispatch)
		},
		[dispatch]
	)

	return {
		selectProduct,
		unselectProduct,
		addNewProduct,
		editProduct,
		deleteProduct,
		updateProductStock,
	}
}
