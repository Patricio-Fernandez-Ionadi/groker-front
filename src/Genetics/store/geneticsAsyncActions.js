import { createAsyncThunk } from '@reduxjs/toolkit'
import { api_addGenetic, api_deleteGenetic, api_getGenetics } from '../index'

export const loadGenetics = createAsyncThunk(
	'geneticsStore/loadGenetics',
	async (_, { rejectWithValue }) => {
		try {
			return await api_getGenetics()
		} catch (error) {
			return rejectWithValue('Las genéticas no pudieron ser cargadas')
		}
	}
)

export const addNewGenetic = createAsyncThunk(
	'geneticsStore/addNewGenetic',
	async (newGenetic, { rejectWithValue }) => {
		try {
			return await api_addGenetic(newGenetic)
		} catch (error) {
			return rejectWithValue('La genética no pudo ser agregada')
		}
	}
)

export const deleteGenetic = createAsyncThunk(
	'geneticsStore/deleteGenetic',
	async (id, { rejectWithValue }) => {
		try {
			return await api_deleteGenetic(id)
		} catch (error) {
			return rejectWithValue('La genética no pudo ser eliminada')
		}
	}
)
