import { createSlice } from '@reduxjs/toolkit'
//
import {
	store_loadPlants,
	store_addPlant,
	store_deletePlantById,
	store_updatePlant,
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
		builder.addCase(store_loadPlants.fulfilled, (state, action) => ({
			...state,
			plants: action.payload,
			loaded: true,
		}))
		builder.addCase(store_addPlant.fulfilled, (state, action) => ({
			...state,
			plants: [...state.plants, action.payload],
		}))
		builder.addCase(store_deletePlantById.fulfilled, (state, action) => ({
			...state,
			plants: state.plants.filter((plant) => plant._id !== action.payload._id),
			selectedPlant: null,
		}))
		builder.addCase(store_updatePlant.fulfilled, (state, action) => ({
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
