import { configureStore } from '@reduxjs/toolkit'

import { plantSlice } from './reducers/plants/plantsSlice'
import { geneticsSlice } from './reducers/genetics/geneticsSlice'
import { productsSlice } from './reducers/products/productsSlice'
import { eventsSlice } from './reducers/history/historySlice'

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
		historyStore: eventsSlice.reducer,
	},
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware().concat(loggerMiddleware),
})
