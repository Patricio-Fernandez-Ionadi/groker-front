import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	api_addProduct,
	api_deleteProduct,
	api_editProduct,
	api_getProducts,
} from '../index'

export const store_loadProducts = createAsyncThunk(
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

export const store_addProduct = createAsyncThunk(
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

export const store_updateProduct = createAsyncThunk(
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

export const store_deleteProduct = createAsyncThunk(
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

// PARTE RELEVANTE PARA EL TEMA A TRATAR
export const store_updateStock = createAsyncThunk(
	'productsStore/updateStock',
	async ({ productId, difference }, { getState }) => {
		const { productsStore } = getState()

		const productToUpdate = productsStore.products.find(
			(p) => p._id === productId
		)

		if (!productToUpdate) {
			throw new Error(`Producto con ID ${productId} no encontrado.`)
		}

		const newStock = productToUpdate.stock + difference // Calcular el nuevo stock

		try {
			// console.log('Updating stock for product:', productId)
			// console.log('Stock difference:', difference)
			// console.log('Product before update:', productToUpdate)
			// console.log('New stock:', newStock)

			const data = await api_editProduct({
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
