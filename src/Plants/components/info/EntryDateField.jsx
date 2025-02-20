import React from 'react'
import {
	Button,
	Calendar_icon,
	Cloud_arrow_up,
	Edit_icon,
	useTheme,
} from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import { updateSimpleEvents } from '../history/utils/updateHistory'
import {
	calculateEstimatedChangeFromEntryDate,
	formatDate,
	formatDateToISO,
	formatDateToYYYYMMDD,
} from '../../utils/dateUtils'

export const EntryDateField = ({ edit, plant, iconSize }) => {
	const { state, update } = edit
	const { theme } = useTheme()
	const { updatePlant } = usePlantsActions()
	const [selectedDate, setSelectedDate] = React.useState(
		formatDateToYYYYMMDD(plant.entryDate)
	)

	const entryDateRef = React.useRef(null)

	const handleDateEdition = () => {
		if (!state.entryDate) {
			update({ ...state, entryDate: true })
		} else {
			const newDate = formatDateToISO(entryDateRef.current.value)

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
		<section className="field-section" aria-labelledby="entry-date-field-label">
			{state.entryDate ? (
				<div className={`field-edit-mode ${theme}`}>
					<label className={`input-label ${theme}`}>Fecha de ingreso</label>
					<div className={`input-field ${theme}`}>
						<input
							ref={entryDateRef}
							type="date"
							style={{
								opacity: 0,
								position: 'absolute',
								zIndex: -1,
							}}
							defaultValue={selectedDate}
							onChange={(e) => {
								setSelectedDate(e.target.value)
							}}
						/>
						<input
							type="text"
							readOnly
							value={formatDate(selectedDate)}
							onClick={() => entryDateRef.current.showPicker()}
							className="custom-date-input"
						/>
						<button
							className="custom-date-button"
							onClick={() => entryDateRef.current.showPicker()}
							aria-label="Abrir selector de fecha"
						>
							<Calendar_icon size={iconSize} />
						</button>
					</div>
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
						>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<div className="field-view-mode">
					<div>
						<label className={`field-label`}>Fecha de ingreso</label>
						<span>{formatDate(plant.entryDate)}</span>
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
