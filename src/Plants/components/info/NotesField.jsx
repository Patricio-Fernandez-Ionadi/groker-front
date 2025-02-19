import React from 'react'
import { Button } from '../../../app'
import { usePlantsActions } from '../../hooks/usePlantsActions'
import { updateNoteEvents } from '../history/utils/updateHistory'
import { formatDateToYYYYMMDD, today } from '../../utils/dateUtils'

export function NotesField({ edit, plant, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const { state, update } = edit

	const areaRef = React.useRef(null)

	// Buscar notas previas
	const todayEntry = plant.history.find((entry) => {
		const entryDate = formatDateToYYYYMMDD(entry.date)
		const todayDate = formatDateToYYYYMMDD(today)
		return entryDate === todayDate
	})

	const noteEvent = todayEntry?.events.find((event) => event.type === 'note')
	const notes = noteEvent?.details || []

	const handleAddNote = () => {
		if (!state.note) {
			update({ ...state, note: true })
		} else {
			if (areaRef.current.value === '') return

			const plantToSave = {
				...plant,
				history: updateNoteEvents(plant, 'note', {
					id: Date.now(),
					note: areaRef.current.value,
				}),
			}
			updatePlant(plantToSave)

			update({ ...state, note: false })
		}
	}

	// Eliminar una nota específica
	const handleDeleteNote = (noteId) => {
		const plantToSave = {
			...plant,
			history: updateNoteEvents(plant, 'note', { id: noteId }, 'delete'),
		}
		updatePlant(plantToSave)
	}

	return (
		<>
			{state.note ? (
				<>
					<textarea ref={areaRef} />
					<Button onEvent={handleAddNote}>Guardar nota</Button>
					<Button onEvent={() => update({ ...state, note: false })}>
						Cancelar
					</Button>
					{/* 🔹 Mostrar notas previas con opción de eliminar */}
					{notes.length > 0 && (
						<ul>
							{notes.map((note) => (
								<li key={note.id}>
									{note.note}
									<Button onEvent={() => handleDeleteNote(note.id)}>❌</Button>
								</li>
							))}
						</ul>
					)}
				</>
			) : (
				<Button onEvent={handleAddNote}>Añadir una nota</Button>
			)}
		</>
	)
}
