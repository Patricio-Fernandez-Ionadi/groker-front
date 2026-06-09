import { createSlice } from '@reduxjs/toolkit'
import {
	store_addProduct,
	store_deleteProduct,
	store_updateProduct,
	store_loadProducts,
	store_updateStock,
} from './productsAsyncActions'

const products_InitialState = {
	products: [],
	selectedProduct: null,
	loaded: false,
}

export const productsSlice = createSlice({
	name: 'productsStore',
	initialState: products_InitialState,
	reducers: {
		setSelectedProduct: (state, action) => {
			state.selectedProduct = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(store_loadProducts.fulfilled, (state, action) => ({
			...state,
			products: action.payload,
			loaded: true,
		}))
		builder.addCase(store_loadProducts.rejected, (state, action) => {
			console.error(
				'Error al cargar productos:',
				action.payload || action.error.message
			)
		})
		builder.addCase(store_addProduct.fulfilled, (state, action) => ({
			...state,
			products: [...state.products, action.payload],
		}))
		builder.addCase(store_addProduct.rejected, (state, action) => {
			console.error(
				'Error al agregar producto:',
				action.payload || action.error.message
			)
		})
		builder.addCase(store_deleteProduct.fulfilled, (state, action) => ({
			...state,
			products: state.products.filter(
				(product) => product._id !== action.payload._id
			),
		}))
		builder.addCase(store_deleteProduct.rejected, (state, action) => {
			console.error(
				'Error al eliminar producto:',
				action.payload || action.error.message
			)
		})
		builder.addCase(store_updateProduct.fulfilled, (state, action) => ({
			...state,
			products: state.products.map((product) => {
				if (product._id === action.payload._id) {
					return action.payload
				} else {
					return product
				}
			}),
		}))
		builder.addCase(store_updateProduct.rejected, (state, action) => {
			console.error(
				'Error al actualizar producto:',
				action.payload || action.error.message
			)
		})
		builder.addCase(store_updateStock.fulfilled, (state, action) => ({
			...state,
			products: state.products.map((product) => {
				if (product._id === action.payload._id) {
					return action.payload
				} else {
					return product
				}
			}),
		}))
		builder.addCase(store_updateStock.rejected, (state, action) => {
			console.error(
				'Error al actualizar stock:',
				action.payload || action.error.message
			)
		})
	},
})

export const { setSelectedProduct } = productsSlice.actions

export default productsSlice.reducer
