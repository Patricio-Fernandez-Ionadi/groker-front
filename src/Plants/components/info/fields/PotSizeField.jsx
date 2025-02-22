import React from 'react'
import { Button, ToggleSwitch, AlertModal } from 'groker/components'
import { Cloud_arrow_up, Edit_icon } from 'groker/icons'
import { useTheme } from '@/app'
import { usePlantsActions } from '../../../hooks/usePlantsActions'
import { updateSimpleEvents } from '../../history/utils/updateHistory'

export function PotSizeField({ edit, plant, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const { state, update } = edit
	const { theme } = useTheme()
	const potSizeRef = React.useRef(null)

	const [finalPotClicks, setFinalPotClicks] = React.useState(0)
	const [showAlert, setShowAlert] = React.useState(false)
	const [alertMessage, setAlertMessage] = React.useState('')

	const handleCloseAlert = () => {
		setShowAlert(false)
	}

	const handlePotSizeEdition = () => {
		if (!state.potSize) {
			update({ ...state, potSize: true })

			if (plant.potSize !== 0) {
				setTimeout(() => {
					potSizeRef.current.focus()
					potSizeRef.current.select()
				}, 0)
			}
		} else {
			const newPotSize = potSizeRef.current.value

			let updatedPlant = { ...plant, potSize: newPotSize }

			const updatedHistory = updateSimpleEvents(
				updatedPlant,
				'potSize',
				newPotSize
			)

			const plantToSave = {
				...updatedPlant,
				history: updatedHistory,
			}

			updatePlant(plantToSave)

			update({ ...state, potSize: false })
		}
	}

	const handleFinalPotEdition = () => {
		const clickTimeoutPot = localStorage.getItem('clickTimeOutPot')
		const now = new Date().getTime() // Tiempo actual en milisegundos
		// Si hay un clickTimeoutPot y no han pasado 2 minutos, se muestra la alerta
		if (clickTimeoutPot && now - clickTimeoutPot < 2 * 60 * 1000) {
			const remainingTime = 2 * 60 * 1000 - (now - clickTimeoutPot)
			setAlertMessage(
				`Demasiados clicks realizados. Debes esperar un tiempo antes de realizar esta accion. Restan ${Math.ceil(
					remainingTime / 1000
				)} segundos.`
			)
			setShowAlert(true)
			return
		}
		if (finalPotClicks >= 3) {
			setAlertMessage(
				'Demasiados clicks realizados. Debes esperar unos minutos.'
			)
			setShowAlert(true)

			// Guardar el timestamp actual en localStorage
			localStorage.setItem('clickTimeOutPot', now)

			setFinalPotClicks(0)
			return
		}
		// fin de logica para time out de clicks
		// ###########

		let updatedPlant = {
			...plant,
			flags: { ...plant.flags, isFinalPot: !plant.flags.isFinalPot },
		}

		const updatedHistory = updateSimpleEvents(
			updatedPlant,
			'isFinalPot',
			!plant.flags.isFinalPot
		)

		const plantToSave = {
			...updatedPlant,
			history: updatedHistory,
		}

		updatePlant(plantToSave)
		setFinalPotClicks((prev) => prev + 1)
	}

	return (
		<section className="field-section" aria-labelledby="pot-size-field-label">
			{state.potSize ? (
				<div className={`field-edit-mode ${theme}`}>
					<label className={`input-label ${theme}`}>Tamaño de la maceta</label>
					<input
						type="number"
						ref={potSizeRef}
						aria-labelledby="pot-size-field-label"
						className={`input-field ${theme}`}
					/>
					<div className="field-actions">
						<Cloud_arrow_up
							size={iconSize}
							onEvent={handlePotSizeEdition}
							aria-label="Guardar tamaño de maceta"
						/>
						<Button
							onEvent={() => update({ ...state, potSize: false })}
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
						<label className="field-label">Tamaño de la maceta</label>
						<span>{plant.potSize !== 0 ? `${plant.potSize}L` : 'N/A'}</span>
					</div>
					<Edit_icon
						size={iconSize}
						onEvent={handlePotSizeEdition}
						aria-label="Editar tamaño de maceta"
					/>
				</div>
			)}
			{plant.potSize !== 0 && (
				<div className="final-pot-toggle">
					<span>Maceta final: </span>
					<ToggleSwitch
						switcher={plant.flags.isFinalPot}
						onEvent={handleFinalPotEdition}
						name="isFinalPot"
						aria-label="Cambiar estado de maceta final"
					/>
				</div>
			)}
			<AlertModal
				isOpen={showAlert}
				message={alertMessage}
				onClose={handleCloseAlert}
				theme={theme}
			/>
		</section>
	)
}
