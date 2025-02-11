import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	api_addProduct,
	api_deleteProduct,
	api_editProduct,
	api_getProducts,
} from '../../../api/products'

export const loadProducts = createAsyncThunk(
	'productsStore/loadProducts',
	async () => {
		try {
			const data = await api_getProducts()
			return data
		} catch (error) {
			throw new Error('Los productos no pudieron ser cargados', error)
		}
	}
)

export const addProduct = createAsyncThunk(
	'productsStore/addProduct',
	async (newProduct) => {
		try {
			const data = await api_addProduct(newProduct)
			return data
		} catch (error) {
			throw new Error(
				'El producto no pudo ser agregado (productsActions)',
				error
			)
		}
	}
)

export const editProduct = createAsyncThunk(
	'productsStore/editProduct',
	async (updatedProduct) => {
		try {
			const data = await api_editProduct(updatedProduct)
			return data
		} catch (error) {
			throw new Error(
				'El producto no pudo ser editado (productsActions)',
				error
			)
		}
	}
)

export const deleteProduct = createAsyncThunk(
	'productsStore/deleteProduct',
	async (id) => {
		try {
			const data = await api_deleteProduct(id)
			return data
		} catch (error) {
			throw new Error(
				'El producto no pudo ser eliminado (productsActions)',
				error
			)
		}
	}
)

export const updateStock = createAsyncThunk(
	'productsStore/updateStock',
	async (id, amount) => {
		const productToUpdate = state.products.find((p) => p._id === productId)
		const newStock = productToUpdate.stock + amount

		try {
			const data = await api_editProduct(id, {
				...productToUpdate,
				stock: newStock,
			})
			return data
		} catch (error) {
			throw new Error(
				'Error al actualizar el stock en la base de datos (productsActions)',
				error
			)
		}
	}
)
