import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	setFlags,
	setHumidity,
	setIsWatered,
	setNote,
	setPotSize,
	setStage,
	setTemperature,
} from '../../../store/reducers/history/historySlice'

import { ToggleSwitch } from '../../Universals/ToggleSwitch'

export function CommonFields() {
	const dispatch = useDispatch()

	const editingState = useSelector((state) => state.historyStore)

	const handlePlantChange = (e) => {
		const { name, value, type, checked } = e.target
		const fieldValue = type === 'checkbox' ? checked : value

		switch (name) {
			case 'stage':
				dispatch(setStage(fieldValue))
				break
			case 'isWatered':
				dispatch(setIsWatered(fieldValue))
				break
			case 'isFinalPot':
				dispatch(setFlags(fieldValue))
				break
			case 'underObservation':
				dispatch(setFlags(fieldValue))
				break
			case 'temperature':
				dispatch(setTemperature(fieldValue))
				break
			case 'humidity':
				dispatch(setHumidity(fieldValue))
				break
			case 'potSize':
				dispatch(setPotSize(fieldValue))
				break
			case 'note':
				dispatch(setNote(fieldValue))
				break
			default:
				console.log('por ahora no controlado', name)
		}
	}

	return (
		<div className="common-fields">
			<select
				className="stage-select"
				name="stage"
				type="text"
				value={editingState.stage}
				onChange={handlePlantChange}
			>
				<option value="germination">Germinación</option>
				<option value="vegetative">Vegetativo</option>
				<option value="flowering">Floración</option>
			</select>

			<input
				className="potSize-input"
				type="text"
				name="potSize"
				onChange={handlePlantChange}
				placeholder="Tamaño de la maceta"
			/>

			<input
				className="temperature-input"
				type="number"
				name="temperature"
				onChange={handlePlantChange}
				placeholder="Temperatura (°C)"
			/>

			<input
				className="humidity-input"
				type="number"
				name="humidity"
				onChange={handlePlantChange}
				placeholder="Humedad (%)"
			/>

			<label className="isFinalPot-switch">
				<p>Maceta Final</p>
				<ToggleSwitch
					switcher={editingState.flags.isFinalPot}
					onEvent={(e) => dispatch(setFlags({ isFinalPot: e.target.checked }))}
					name={'isFinalPot'}
				/>
			</label>

			<label className="underObservation-switch">
				<p>Bajo observación</p>
				<ToggleSwitch
					switcher={editingState.flags.underObservation}
					onEvent={(e) =>
						dispatch(setFlags({ underObservation: e.target.checked }))
					}
					name={'underObservation'}
				/>
			</label>
			<label className="watered-switch">
				<p>Riego</p>
				<ToggleSwitch
					switcher={editingState.isWatered}
					onEvent={(e) =>
						dispatch(setIsWatered({ isWatered: e.target.checked }))
					}
				/>
			</label>
			<textarea
				className="notes-textarea"
				name="note"
				// value={newNote.note}
				onChange={handlePlantChange}
				placeholder="Añadir una nota"
			/>
		</div>
	)
}
