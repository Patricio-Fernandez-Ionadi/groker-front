import { createSlice } from '@reduxjs/toolkit'
import {
	addProduct,
	deleteProduct,
	editProduct,
	loadProducts,
	updateStock,
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
		selectProduct: (state, action) => {
			state.selectedProduct = action.payload
		},
		unselectProduct: (state, action) => {
			state.selectedProduct = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadProducts.fulfilled, (state, action) => ({
			...state,
			products: action.payload,
			loaded: true,
		}))
		builder.addCase(addProduct.fulfilled, (state, action) => ({
			...state,
			products: [...state.products, action.payload],
		}))
		builder.addCase(deleteProduct.fulfilled, (state, action) => ({
			...state,
			products: state.products.filter(
				(product) => product._id !== action.payload._id
			),
		}))
		builder.addCase(editProduct.fulfilled, (state, action) => ({
			...state,
			products: state.products.map((product) => {
				if (product._id === action.payload._id) {
					return action.payload
				} else {
					return product
				}
			}),
		}))
		builder.addCase(updateStock.fulfilled, (state, action) => ({
			...state,
			products: state.products.map((product) => {
				if (product._id === action.payload._id) {
					return action.payload
				} else {
					return product
				}
			}),
		}))
	},
})

export const { selectProduct, unselectProduct } = productsSlice.actions

export default productsSlice.reducer
