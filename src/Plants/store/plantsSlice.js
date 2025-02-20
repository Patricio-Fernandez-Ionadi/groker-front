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
	selectedIndex: null,
	selectedPlantHistory: null,
	loaded: false,
}

export const plantSlice = createSlice({
	name: 'plantsStore',
	initialState: plants_initialState,
	reducers: {
		setPlantSelected: (state, action) => {
			if (action.payload === null) {
				state.selectedPlant = null
				state.selectedIndex = null
				return
			}
			const indexPlant = state.plants.findIndex(
				(plant) => plant._id === action.payload._id
			)
			state.selectedPlant = action.payload
			state.selectedIndex = indexPlant
		},
		setPlantByIndex: (state, action) => {
			if (action.payload > state.plants.length - 1) {
				state.selectedIndex = 0
				state.selectedPlant = state.plants[0]
			} else if (action.payload < 0) {
				state.selectedIndex = state.plants.length - 1
				state.selectedPlant = state.plants[state.plants.length - 1]
			} else {
				state.selectedIndex = action.payload
				state.selectedPlant = state.plants[action.payload]
			}
		},
	},
	extraReducers: (builder) => {
		/* LOAD PLANTS */
		builder.addCase(store_loadPlants.fulfilled, (state, action) => ({
			...state,
			plants: action.payload,
			loaded: true,
		}))
		builder.addCase(store_loadPlants.rejected, (state, action) => {
			console.error(
				'Error al cargar plantas:',
				action.payload || action.error.message
			)
		})
		/* ADD PLANT */
		builder.addCase(store_addPlant.fulfilled, (state, action) => ({
			...state,
			plants: [...state.plants, action.payload],
		}))
		builder.addCase(store_addPlant.rejected, (state, action) => {
			console.error(
				'Error al agregar planta:',
				action.payload || action.error.message
			)
		})
		/* DELETE PLANT */
		builder.addCase(store_deletePlantById.fulfilled, (state, action) => ({
			...state,
			plants: state.plants.filter((plant) => plant._id !== action.payload._id),
			selectedPlant: null,
		}))
		builder.addCase(store_deletePlantById.rejected, (state, action) => {
			console.error(
				'Error al eliminar planta:',
				action.payload || action.error.message
			)
		})
		/* UPDATE PLANT */
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
		builder.addCase(store_updatePlant.rejected, (state, action) => {
			console.error(
				'Error al actualizar planta:',
				action.payload || action.error.message
			)
		})
	},
})

export const { setPlantSelected, setPlantByIndex } = plantSlice.actions
