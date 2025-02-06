import React, { useContext } from 'react'
import { PlantEditContext } from '../../../context/plants/PlantEditContext'

import { toggleCheckboxState } from '../../../utils/helpers'
import { ToggleSwitch } from '../../Universals/ToggleSwitch'

export function CommonFields() {
	const {
		editedPlant,
		handlePlantChange,
		isWatered,
		setIsWatered,
		handleAddNote,
	} = useContext(PlantEditContext)

	return (
		<div className="common-fields">
			<select
				className="stage-select"
				name="stage"
				value={editedPlant.stage}
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
					switcher={editedPlant.flags.isFinalPot}
					onEvent={handlePlantChange}
					name={'isFinalPot'}
				/>
			</label>

			<label className="underObservation-switch">
				<p>Bajo observación</p>
				<ToggleSwitch
					switcher={editedPlant.flags.underObservation}
					onEvent={handlePlantChange}
					name={'underObservation'}
				/>
			</label>
			<label className="watered-switch">
				<p>Riego</p>
				<ToggleSwitch
					switcher={isWatered}
					onEvent={() => toggleCheckboxState(isWatered, setIsWatered)}
				/>
			</label>
			<textarea
				className="notes-textarea"
				name="note"
				onChange={handleAddNote}
				placeholder="Añadir una nota"
			/>
		</div>
	)
}
