import { createSlice, original } from '@reduxjs/toolkit'
import { formatDateToISO, formatDateToYYYYMMDD } from '../../utils/dateUtils'
import { savePlantHistory } from './historyAsyncActions'

const events_InitialState = {
	events: [
		/* {} */
	],
	entryDate: '',
	name: '',
	estimatedChange: '',
	genetic: '',
	note: '',
	lastWatered: '',
	products: [
		/* {_id: '', name: '', amount: ''} */
	],
	ph: '',
	ec: '',
	amount: '',
	stage: '',
	temperature: 0,
	humidity: 0,
	potSize: 0,
	flags: {
		isFinalPot: false,
		underObservation: false,
	},
	isWatered: false,
	showAdvanced: false,
	editedPlant: {},
	loading: false,
	error: null,
}

export const eventsSlice = createSlice({
	name: 'historyStore',
	initialState: events_InitialState,
	reducers: {
		setEditedPlant: (state, action) => {
			state.editedPlant = action.payload

			state.flags = { ...action.payload.flags }
			state.name = action.payload.name
			state.entryDate = formatDateToYYYYMMDD(action.payload.entryDate)
			state.genetic = action.payload.genetic.name
			state.estimatedChange = formatDateToYYYYMMDD(
				action.payload.estimatedChange
			)
			state.stage = action.payload.stage
		},

		// ADVANCED
		setName: (state, action) => {
			state.name = action.payload
		},
		setEntryDate: (state, action) => {
			state.entryDate = action.payload
		},
		setGenetic: (state, action) => {
			state.genetic = action.payload
		},
		setEstimatedChange: (state, action) => {
			state.estimatedChange = action.payload
		},

		// COMMON
		setStage: (state, action) => {
			state.stage = action.payload
		},
		setTemperature: (state, action) => {
			state.temperature = action.payload
		},
		setHumidity: (state, action) => {
			state.humidity = action.payload
		},
		setPotSize: (state, action) => {
			state.potSize = action.payload
		},

		toggleAdvanced: (state) => {
			state.showAdvanced = !state.showAdvanced
		},
		setIsWatered: (state, action) => {
			state.isWatered = !state.isWatered
		},
		setFlags: (state, action) => {
			state.flags = { ...state.flags, ...action.payload }
		},
		setNote: (state, action) => {
			state.note = action.payload
		},

		// WATERING
		setLastWatered: (state, action) => {
			state.lastWatered = action.payload
		},
		setPh: (state, action) => {
			state.ph = action.payload
		},
		setEc: (state, action) => {
			state.ec = action.payload
		},
		setAmount: (state, action) => {
			state.amount = action.payload
		},

		setProducts: (state, action) => {
			state.products = action.payload
		},

		// REGISTERED
		setEvents: (state, action) => {
			state.events = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(savePlantHistory.pending, (state) => {
				// Manejar el estado de "cargando" si es necesario
				state.loading = true
				state.error = null
			})
			.addCase(savePlantHistory.fulfilled, (state, action) => {
				// Manejar el éxito de la operación
				state.loading = false
				// Aquí puedes actualizar el estado si es necesario
			})
			.addCase(savePlantHistory.rejected, (state, action) => {
				// Manejar errores
				state.loading = false
				state.error = action.error.message
			})
	},
})

export const {
	// Copia de planta
	setEditedPlant,

	// Advanced
	setName,
	setEntryDate,
	setGenetic,
	setEstimatedChange,

	// Common
	setStage,
	setPotSize,
	setTemperature,
	setHumidity,
	setFlags,
	setIsWatered,
	setNote,
	toggleAdvanced,

	// Watering
	setPh,
	setEc,
	setAmount,
	setLastWatered,
	setProducts,
} = eventsSlice.actions

export default eventsSlice.reducer
