import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	api_addPlant,
	api_deletePlant,
	api_getPlants,
	api_updatePlant,
} from '../index'
import { calculateEstimatedChangeFromEntryDate } from '../utils/dateUtils'

export const store_loadPlants = createAsyncThunk(
	'plantsStore/loadPlants',
	async () => {
		try {
			const data = await api_getPlants()
			return data
		} catch (error) {
			return rejectWithValue('Las plantas no pudieron ser cargadas')
		}
	}
)

export const store_addPlant = createAsyncThunk(
	'plantsStore/addPlant',
	async (newPlant) => {
		const plantToAdd = {
			...newPlant,
			estimatedChange: calculateEstimatedChangeFromEntryDate(newPlant),
		}
		try {
			const data = await api_addPlant(plantToAdd)
			return data
		} catch (error) {
			return rejectWithValue('La planta no pudo ser agregada')
		}
	}
)

export const store_deletePlantById = createAsyncThunk(
	'plantsStore/deletePlant',
	async (id) => {
		try {
			const data = await api_deletePlant(id)
			return data
		} catch (error) {
			return rejectWithValue('La planta no pudo ser eliminada')
		}
	}
)

export const store_updatePlant = createAsyncThunk(
	'plantsStore/updatePlant',
	async (updatedPlant) => {
		// console.log(updatedPlant)
		try {
			const data = await api_updatePlant(updatedPlant)
			return data
		} catch (error) {
			return rejectWithValue('La planta no pudo ser editada')
		}
	}
)
