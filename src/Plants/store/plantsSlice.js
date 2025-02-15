import { createSlice } from '@reduxjs/toolkit'
//
import {
	loadPlants,
	addPlant,
	deletePlantById,
	updatePlant,
} from './plantsAsyncActions'

const plants_initialState = {
	plants: [],
	selectedPlant: null,
	selectedPlantHistory: null,
	loaded: false,
}

export const plantSlice = createSlice({
	name: 'plantsStore',
	initialState: plants_initialState,
	reducers: {
		setPlantSelected: (state, action) => {
			state.selectedPlant = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadPlants.fulfilled, (state, action) => ({
			...state,
			plants: action.payload,
			loaded: true,
		}))
		builder.addCase(addPlant.fulfilled, (state, action) => ({
			...state,
			plants: [...state.plants, action.payload],
		}))
		builder.addCase(deletePlantById.fulfilled, (state, action) => ({
			...state,
			plants: state.plants.filter((plant) => plant._id !== action.payload._id),
			selectedPlant: null,
		}))
		builder.addCase(updatePlant.fulfilled, (state, action) => ({
			...state,
			plants: state.plants.map((plant) => {
				if (plant._id === action.payload._id) {
					return action.payload
				} else {
					return plant
				}
			}),
		}))
	},
})

export const { setPlantSelected } = plantSlice.actions
