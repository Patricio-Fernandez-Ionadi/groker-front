import React from 'react'
import { calendarFormat, isoFormat, inputsFormat } from 'groker/date'
import { Button, DateInput } from 'groker/components'
import { Cloud_arrow_up, Edit_icon } from 'groker/icons'
import { useTheme } from '@/app'

import {
	calculateEstimatedChangeFromEntryDate,
	usePlantsActions,
	updateSimpleEvents,
} from '@/Plants'

export const EntryDateField = ({ edit, plant, iconSize }) => {
	const { state, update } = edit
	const { theme } = useTheme()
	const { updatePlant } = usePlantsActions()
	const [selectedDate, setSelectedDate] = React.useState(
		inputsFormat(plant.entryDate)
	)

	const handleDateEdition = () => {
		if (!state.entryDate) {
			update({ ...state, entryDate: true })
		} else {
			const newDate = isoFormat(selectedDate)

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
					estimatedChange: isoFormat(newChangeDate),
				},
				'estimatedChange',
				isoFormat(newChangeDate)
			)

			const plantToSave = {
				...updatedPlant,
				estimatedChange: isoFormat(newChangeDate),
				history: updateEstimatedChangeHistory,
			}

			updatePlant(plantToSave)

			update({ ...state, entryDate: false })
		}
	}

	return (
		<section className="field-section" aria-labelledby="entry-date-field-label">
			{state.entryDate ? (
				<div className={`field-edit-mode ${theme}`}>
					<DateInput
						theme={theme}
						onChangeEvent={(e) => setSelectedDate(e.target.value)}
						iconSize={iconSize}
						label="Fecha de ingreso"
						className="groker-date"
						defaultValue={inputsFormat(plant.entryDate)}
					/>
					<div className="field-actions">
						<Cloud_arrow_up
							size={iconSize}
							onEvent={handleDateEdition}
							aria-label="Guardar fecha de ingreso"
						/>
						<Button
							onEvent={() => update({ ...state, entryDate: false })}
							aria-label="Cancelar edición"
							className="info-action-button"
							theme={theme}
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<div className="field-view-mode">
					<div>
						<label className={`field-label`}>Fecha de ingreso</label>
						<span>{calendarFormat(plant.entryDate)}</span>
					</div>
					<Edit_icon
						size={iconSize}
						onEvent={handleDateEdition}
						aria-label="Editar fecha de ingreso"
					/>
				</div>
			)}
		</section>
	)
}
