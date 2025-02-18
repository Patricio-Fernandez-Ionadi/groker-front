import React from 'react'
import { Button, Cloud_arrow_up, Edit_icon } from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { updateSimpleEvents } from '../history/utils/updateHistory'
import {
	calculateEstimatedChangeFromEntryDate,
	formatDate,
	formatDateToISO,
	formatDateToYYYYMMDD,
} from '../../utils/dateUtils'

export const EntryDateField = ({ edit, plant }) => {
	const { state, update } = edit
	const { updatePlant } = usePlantsActions()

	const enrtyDateRef = React.useRef(null)

	const handleDateEdition = () => {
		if (!state.entryDate) {
			update({ ...state, entryDate: true })
		} else {
			const newDate = formatDateToISO(enrtyDateRef.current.value)

			let updatedPlant = { ...plant, entryDate: newDate }

			const updateEntryDateHistory = updateSimpleEvents(
				updatedPlant,
				'entryDate',
				newDate
			)

			const plantEDyHistoryUpdated = {
				...updatedPlant,
				history: updateEntryDateHistory,
			}

			const newChangeDate = calculateEstimatedChangeFromEntryDate(
				plantEDyHistoryUpdated
			)

			const updateEstimatedChangeHistory = updateSimpleEvents(
				{
					...plantEDyHistoryUpdated,
					estimatedChange: formatDateToISO(newChangeDate),
				},
				'estimatedChange',
				formatDateToISO(newChangeDate)
			)

			const plantToSave = {
				...updatedPlant,
				estimatedChange: formatDateToISO(newChangeDate),
				history: updateEstimatedChangeHistory,
			}

			updatePlant(plantToSave)

			update({ ...state, entryDate: false })
		}
	}

	return (
		<p>
			Fecha de ingreso:
			{state.entryDate ? (
				<input
					ref={enrtyDateRef}
					type="date"
					name="entryDate"
					defaultValue={formatDateToYYYYMMDD(plant.entryDate)}
				/>
			) : (
				formatDate(plant.entryDate)
			)}
			{state.entryDate ? (
				<>
					<Cloud_arrow_up size={25} onEvent={handleDateEdition} />
					<Button onEvent={() => update({ ...state, entryDate: false })}>
						Cancelar
					</Button>
				</>
			) : (
				<Edit_icon size={25} onEvent={handleDateEdition} />
			)}
		</p>
	)
}
