import { createSlice } from '@reduxjs/toolkit'
import {
	addNewGenetic,
	deleteGenetic,
	loadGenetics,
} from './geneticsAsyncActions'

const genetics_InitialState = {
	genetics: [],
	loaded: false,
}

export const geneticsSlice = createSlice({
	name: 'geneticsStore',
	initialState: genetics_InitialState,
	// reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadGenetics.fulfilled, (state, action) => ({
			...state,
			genetics: action.payload,
			loaded: true,
		}))
		builder.addCase(loadGenetics.rejected, (state, action) => {
			console.error(
				'Error al cargar genéticas:',
				action.payload || action.error.message
			)
		})
		builder.addCase(addNewGenetic.fulfilled, (state, action) => ({
			...state,
			genetics: [...state.genetics, action.payload],
		}))
		builder.addCase(addNewGenetic.rejected, (state, action) => {
			console.error(
				'Error al agregar genética:',
				action.payload || action.error.message
			)
		})
		builder.addCase(deleteGenetic.fulfilled, (state, action) => ({
			...state,
			genetics: state.genetics.filter(
				(genetic) => genetic._id !== action.payload._id
			),
		}))
		builder.addCase(deleteGenetic.rejected, (state, action) => {
			console.error(
				'Error al eliminar genética:',
				action.payload || action.error.message
			)
		})
	},
})
