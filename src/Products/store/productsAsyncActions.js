import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	api_addProduct,
	api_deleteProduct,
	api_editProduct,
	api_getProducts,
} from '../index'

export const store_loadProducts = createAsyncThunk(
	'productsStore/loadProducts',
	async (_, { rejectWithValue }) => {
		try {
			return await api_getProducts()
		} catch (error) {
			return rejectWithValue('Los productos no pudieron ser cargados')
		}
	}
)

export const store_addProduct = createAsyncThunk(
	'productsStore/addProduct',
	async (newProduct, { rejectWithValue }) => {
		try {
			return await api_addProduct(newProduct)
		} catch (error) {
			return rejectWithValue('El producto no pudo ser agregado')
		}
	}
)

export const store_updateProduct = createAsyncThunk(
	'productsStore/editProduct',
	async (updatedProduct, { rejectWithValue }) => {
		try {
			return await api_editProduct(updatedProduct)
		} catch (error) {
			return rejectWithValue('El producto no pudo ser editado')
		}
	}
)

export const store_deleteProduct = createAsyncThunk(
	'productsStore/deleteProduct',
	async (id, { rejectWithValue }) => {
		try {
			return await api_deleteProduct(id)
		} catch (error) {
			return rejectWithValue('El producto no pudo ser eliminado')
		}
	}
)

export const store_updateStock = createAsyncThunk(
	'productsStore/updateStock',
	async ({ productId, difference }, { getState, rejectWithValue }) => {
		const { productsStore } = getState()

		const productToUpdate = productsStore.products.find(
			(p) => p._id === productId
		)

		if (!productToUpdate) {
			return rejectWithValue(`Producto con ID ${productId} no encontrado.`)
		}

		const newStock = productToUpdate.stock + difference

		try {
			return await api_editProduct({
				...productToUpdate,
				stock: newStock,
			})
		} catch (error) {
			return rejectWithValue('Error al actualizar el stock en la base de datos')
		}
	}
)
