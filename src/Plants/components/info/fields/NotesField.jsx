import React from 'react'
import {
	Button,
	ToggleSwitch,
	AlertModal,
	ConfirmModal,
} from 'groker/components'
import { inputsFormat, today } from 'groker/date'
import { useTheme, routes } from '@/app'
import {
	usePlantsActions,
	updateNoteEvents,
	updateSimpleEvents,
} from '@/Plants'
import { useNavigate } from 'react-router'

export function NotesField({ edit, plant }) {
	const { updatePlant, deletePlant } = usePlantsActions()
	const { theme } = useTheme()
	const { state, update } = edit
	const navigate = useNavigate()

	// Registro de la fecha
	const todayEntry = plant.history.find((entry) => {
		const entryDate = inputsFormat(entry.date)
		const todayDate = inputsFormat(today)
		return entryDate === todayDate
	})

	// Under Observation states
	const [observationClicks, setObservationClicks] = React.useState(0)
	const [showAlert, setShowAlert] = React.useState(false)
	const [alertMessage, setAlertMessage] = React.useState('')
	const handleCloseAlert = () => {
		setShowAlert(false)
	}
	const handleObservationPlant = () => {
		const clickTimeoutObs = localStorage.getItem('clickTimeOutObs')
		const now = new Date().getTime() // Tiempo actual en milisegundos
		// Si hay un clickTimeoutObs y no han pasado 2 minutos, se muestra la alerta
		if (clickTimeoutObs && now - clickTimeoutObs < 2 * 60 * 1000) {
			const remainingTime = 2 * 60 * 1000 - (now - clickTimeoutObs)
			setAlertMessage(
				`Demasiados clicks realizados. Debes esperar un tiempo antes de realizar esta accion. Restan ${Math.ceil(
					remainingTime / 1000
				)} segundos.`
			)
			setShowAlert(true)
			return
		}
		if (observationClicks >= 3) {
			setAlertMessage(
				'Demasiados clicks realizados. Debes esperar unos minutos.'
			)
			setShowAlert(true)

			// Guardar el timestamp actual en localStorage
			localStorage.setItem('clickTimeOutObs', now)

			setObservationClicks(0)
			return
		}
		// fin de logica para time out de clicks
		// ###########

		let updatedPlant = {
			...plant,
			flags: {
				...plant.flags,
				underObservation: !plant.flags.underObservation,
			},
		}

		const updatedHistory = updateSimpleEvents(
			updatedPlant,
			'underObservation',
			!plant.flags.underObservation
		)

		const plantToSave = {
			...updatedPlant,
			history: updatedHistory,
		}

		updatePlant(plantToSave)
		setObservationClicks((prev) => prev + 1)
	}

	// Delete Plant states
	const [plantToDelete, setPlantToDelete] = React.useState(null)
	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const handleDeletePlant = () => {
		setPlantToDelete(plant)
		setIsModalOpen(true)
	}
	const confirmDelete = () => {
		if (plantToDelete) {
			deletePlant(plantToDelete._id)
			setIsModalOpen(false)
			setPlantToDelete(null)
			navigate(routes.home.path)
		}
	}
	const closeModal = () => {
		setIsModalOpen(false)
		setPlantToDelete(null)
	}

	const areaRef = React.useRef(null)

	// Buscar notas previas
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
		<section className="field-section" aria-labelledby="notes-field-label">
			{state.note ? (
				<div className={`field-edit-mode notes ${theme}`}>
					<textarea
						ref={areaRef}
						placeholder="Escribe tu nota aquí..."
						aria-labelledby="notes-field-label"
					/>
					<div className="field-actions">
						<div className="underObservation-field">
							<span onClick={handleObservationPlant}>
								Poner bajo observacion
							</span>
							<ToggleSwitch
								switcher={plant.flags.underObservation}
								onEvent={handleObservationPlant}
							/>
						</div>
						<Button
							onEvent={handleAddNote}
							aria-label="Guardar nota"
							className="info-action-button"
							theme={theme}
						>
							Guardar nota
						</Button>
						<Button
							onEvent={() => update({ ...state, note: false })}
							aria-label="Cancelar edición"
							className="info-action-button"
							theme={theme}
						>
							Cancelar
						</Button>
					</div>
					{/* Lista de notas previas */}
					{notes.length > 0 && (
						<>
							<p>Notas en este registro:</p>
							<ul className={`notes-list ${theme}`}>
								{notes.map((note) => (
									<li key={note.id} className="note-item">
										<span>{note.note}</span>
										<Button
											onEvent={() => handleDeleteNote(note.id)}
											aria-label="Eliminar nota"
											className="delete-note-button"
											theme={theme}
										>
											Eliminar
										</Button>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			) : (
				<div className="field-view-mode notes">
					<Button
						onEvent={handleAddNote}
						aria-label="Añadir una nota"
						theme={theme}
					>
						Añadir una nota
					</Button>
					<Button
						onEvent={handleDeletePlant}
						aria-label="Eliminar Planta"
						theme={theme}
						className="delete-plant-button"
					>
						Eliminar Planta
					</Button>
				</div>
			)}
			{/* Modal de confirmación de eliminación */}
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={confirmDelete}
				message={`¿Estás seguro de que deseas eliminar esta planta "${plant?.name}"?`}
				theme={theme}
			/>

			{/* Modal de alerta underObservation */}
			<AlertModal
				isOpen={showAlert}
				message={alertMessage}
				onClose={handleCloseAlert}
				theme={theme}
			/>
		</section>
	)
}
