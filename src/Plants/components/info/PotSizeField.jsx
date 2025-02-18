import React from 'react'
import {
	AlertModal,
	Button,
	Cloud_arrow_up,
	Edit_icon,
	ToggleSwitch,
	useTheme,
} from '../../../app'
import { usePlantsActions } from '../../hooks/usePlantsActions'
import { updateSimpleEvents } from '../history/utils/updateHistory'

export function PotSizeField({ edit, plant, iconSize }) {
	const { theme } = useTheme()
	const { updatePlant } = usePlantsActions()
	const { state, update } = edit
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
		const clickTimeout = localStorage.getItem('clickTimeOut')
		const now = new Date().getTime() // Tiempo actual en milisegundos
		// Si hay un clickTimeout y no han pasado 2 minutos, se muestra la alerta
		if (clickTimeout && now - clickTimeout < 2 * 60 * 1000) {
			const remainingTime = 2 * 60 * 1000 - (now - clickTimeout)
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
			localStorage.setItem('clickTimeOut', now)

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
		<>
			<span>
				Tamaño de la maceta:{' '}
				{state.potSize ? (
					<>
						<input type="number" ref={potSizeRef} />
						<Cloud_arrow_up size={iconSize} onEvent={handlePotSizeEdition} />

						<Button onEvent={() => update({ ...state, potSize: false })}>
							Cancelar
						</Button>
					</>
				) : (
					<>
						<span>{plant.potSize !== 0 ? `${plant.potSize}L` : 'N/A'} </span>
						<span onClick={handlePotSizeEdition}>
							<Edit_icon size={iconSize} />
						</span>
					</>
				)}
			</span>
			{plant.potSize !== 0 && (
				<span>
					- Maceta final:{' '}
					<ToggleSwitch
						switcher={plant.flags.isFinalPot}
						onEvent={handleFinalPotEdition}
						name="isFinalPot"
					/>
				</span>
			)}
			{showAlert && (
				<AlertModal
					message={alertMessage}
					onClose={handleCloseAlert}
					theme={theme}
				/>
			)}
		</>
	)
}
