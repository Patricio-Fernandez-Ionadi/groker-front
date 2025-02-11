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
		builder.addCase(addNewGenetic.fulfilled, (state, action) => ({
			...state,
			genetics: [...state.genetics, action.payload],
		}))
		builder.addCase(deleteGenetic.fulfilled, (state, action) => ({
			...state,
			genetics: state.genetics.filter(
				(genetic) => genetic._id !== action.payload._id
			),
		}))
	},
})
