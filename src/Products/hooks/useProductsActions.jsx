import { useDispatch } from 'react-redux'

import { setSelectedProduct } from '../store/productsSlice'
import {
	store_addProduct,
	store_deleteProduct,
	store_updateProduct,
} from '../store/productsAsyncActions'

export function useProductsActions() {
	const dispatch = useDispatch()

	const selectProduct = () => {
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

	return { selectProduct, unselectProduct, addNewProduct, editProduct }
}
