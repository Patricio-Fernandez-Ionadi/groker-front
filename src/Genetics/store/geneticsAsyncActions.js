import { createAsyncThunk } from '@reduxjs/toolkit'
import { api_addGenetic, api_deleteGenetic, api_getGenetics } from '../index'

export const loadGenetics = createAsyncThunk(
	'geneticsStore/loadGenetics',
	async () => {
		try {
			const data = await api_getGenetics()
			return data
		} catch (error) {
			throw new Error('Las genéticas no pudieron ser cargadas', error)
		}
	}
)

export const addNewGenetic = createAsyncThunk(
	'geneticsStore/addNewGenetic',
	async (newGenetic) => {
		try {
			const data = await api_addGenetic(newGenetic)
			return data
		} catch (error) {
			throw new Error('La genética no pudo ser agregada', error)
		}
	}
)

export const deleteGenetic = createAsyncThunk(
	'geneticsStore/deleteGenetic',
	async (id) => {
		try {
			const data = await api_deleteGenetic(id)
			dispatch({ type: 'DELETE_GENETIC', payload: data })
		} catch (error) {
			throw new Error('La genética no pudo ser eliminada', error)
		}
	}
)
