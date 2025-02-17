import { configureStore } from '@reduxjs/toolkit'

import { plantSlice } from '../../Plants'
import { geneticsSlice } from '../../Genetics'
import { productsSlice } from '../../Products'

/* const loggerMiddleware = (storeAPI) => (next) => (action) => {
	console.log('🔹 Dispatching Action:', action)
	const result = next(action)
	console.log('🔹 New State:', storeAPI.getState())
	return result
} */

export const store = configureStore({
	reducer: {
		plantsStore: plantSlice.reducer,
		geneticsStore: geneticsSlice.reducer,
		productsStore: productsSlice.reducer,
	},
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware().concat(loggerMiddleware),
})
