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

	const selectProduct = (product) => {
		dispatch(setSelectedProduct(product))
	}

	const unselectProduct = () => {
		dispatch(setSelectedProduct(null))
	}

	const addNewProduct = (newProduct) => {
		dispatch(store_addProduct(newProduct))
	}

	const editProduct = (id) => {
		dispatch(store_updateProduct(id))
	}

	const deleteProduct = (id) => {
		dispatch(store_deleteProduct(id))
	}

	const updateProductStock = (previousProducts, newProducts) => {
		// Calcular la diferencia de stock
		const stockDifferences = calculateStockDifference(
			previousProducts,
			newProducts
		)
		// Aplicar cambios de stock antes de actualizar la planta
		applyStockDifferences(stockDifferences, dispatch)
	}

	return {
		selectProduct,
		unselectProduct,
		addNewProduct,
		editProduct,
		deleteProduct,
		updateProductStock,
	}
}
