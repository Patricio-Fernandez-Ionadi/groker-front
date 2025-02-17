import React from 'react'

import { Button, Cloud_arrow_up, Edit_icon } from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { formatDate, formatDateToISO, today } from '../../utils/dateUtils'

export function WateringField({ edit, plant, iconSize, theme }) {
	const { updatePlant } = usePlantsActions()
	const { state, update } = edit
	const wateringDateRef = React.useRef(null)

	const handleWateringEdition = () => {
		if (!state.lastWatered) {
			update({ ...state, lastWatered: true })
		} else {
			// const newWateringDate = formatDateToISO(wateringDateRef.current.value)

			// finally
			update({ ...state, lastWatered: false })
		}
	}

	if (!state.lastWatered) {
		return (
			<p>
				Último riego:{' '}
				{plant.lastWatered ? formatDate(plant.lastWatered) : 'N/A'}
				<Edit_icon size={iconSize} onEvent={handleWateringEdition} />
			</p>
		)
	} else {
		return (
			<>
				<p>
					Último riego:{' '}
					<input
						type="date"
						value={plant.lastWatered || today}
						onChange={handleWateringEdition}
						ref={wateringDateRef}
					/>
					<Cloud_arrow_up size={iconSize} onEvent={handleWateringEdition} />
					<Button onEvent={() => update({ ...state, lastWatered: false })}>
						Cancelar
					</Button>
				</p>

				<div>
					<label>
						<input type="number" placeholder="pH" />
					</label>
					<label>
						<input type="number" placeholder="EC" />
					</label>
					<label>
						<input type="number" placeholder="Cant. agua (ml)" />
					</label>
					<div></div>
				</div>
			</>
		)
	}
}
