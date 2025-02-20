import React from 'react'

import {
	Button,
	Calendar_icon,
	Cloud_arrow_up,
	Edit_icon,
	useTheme,
} from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'
import { useProductsActions } from '../../../Products'

import { WateringForm } from './riego/WateringForm'
import { ProductSelector } from './riego/ProductSelector'
import { updateObjectEvent } from '../history/utils/updateHistory'

import {
	formatDate,
	formatDateToISO,
	formatDateToYYYYMMDD,
	today,
} from '../../utils/dateUtils'

export function WateringField({ edit, plant, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const { updateProductStock } = useProductsActions()
	const { state, update } = edit
	const { theme } = useTheme()
	const wateringDateRef = React.useRef(null)
	const [selectedDate, setSelectedDate] = React.useState(
		formatDateToYYYYMMDD(plant.lastWatered)
	)

	// WIP
	const currentPlantRegister =
		plant.history[plant.history.length - 1]?.events || []
	const currentWateringEvent = currentPlantRegister.find(
		(entry) => entry.type === 'watering'
	)

	const [wateringData, setWateringData] = React.useState({
		ec: currentWateringEvent?.details.ec || 0,
		ph: currentWateringEvent?.details.ph || 0,
		amount: currentWateringEvent?.details.amount || 0,
		productsUsed: currentWateringEvent?.details.productsUsed || [],
	})

	const handleWateringEdition = () => {
		if (!state.lastWatered) {
			update({ ...state, lastWatered: true })
		} else {
			// Ignorar estas validaciones de momento. pasar al siguiente bloque de comentario.
			/* Asegurarse de: 
				- no se puede registrar si la fecha es posterior a la actual
				- no se puede guardar ec ni ph si no hay amount
				- no se puede agregar productos si no hay amount
				- no se pueden agregar productos duplicados (deben editarse y gestionar el stock en consecuencia)
				- si un producto se edita con amount 0 ademas de gestionar el stok se debe quitar el producto (se considera eliminado)
			*/
			const newWateringDate = formatDateToISO(wateringDateRef.current.value)

			const updatedPlant = {
				...plant,
				lastWatered: newWateringDate,
			}

			const updatedHistory = updateObjectEvent(
				updatedPlant,
				'watering',
				wateringData
			)

			const plantToSave = {
				...updatedPlant,
				history: updatedHistory,
			}

			// Obtener los productos antes y después del cambio
			const previousProducts = currentWateringEvent?.details.productsUsed || []
			const newProducts = wateringData.productsUsed
			updateProductStock(previousProducts, newProducts)

			updatePlant(plantToSave)

			// finally
			update({ ...state, lastWatered: false })
		}
	}

	return (
		<section className="field-section" aria-labelledby="watering-field-label">
			{state.lastWatered ? (
				<>
					<div className={`field-edit-mode ${theme}`}>
						<label className={`input-label ${theme}`}>Ultimo Riego</label>
						<div className={`input-field ${theme}`}>
							<input
								ref={wateringDateRef}
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
								onClick={() => wateringDateRef.current.showPicker()}
								className="custom-date-input"
							/>
							<button
								className="custom-date-button"
								onClick={() => wateringDateRef.current.showPicker()}
								aria-label="Abrir selector de fecha"
							>
								<Calendar_icon size={iconSize} />
							</button>
						</div>
						<div className="field-actions">
							<Cloud_arrow_up
								size={iconSize}
								onEvent={handleWateringEdition}
								aria-label="Guardar fecha de ingreso"
							/>
							<Button
								onEvent={() => update({ ...state, lastWatered: false })}
								aria-label="Cancelar edición"
								className="info-action-button"
							>
								Cancelar
							</Button>
						</div>
					</div>
					<WateringForm
						edit={{ state: wateringData, update: setWateringData }}
					/>
					<ProductSelector
						edit={{ state: wateringData, update: setWateringData }}
						iconSize={iconSize}
						eventData={currentWateringEvent}
					/>
				</>
			) : (
				<div className="field-view-mode">
					<div>
						<label className={`field-label`}>Ultimo Riego</label>
						<span>{formatDate(plant.lastWatered)}</span>
					</div>
					<Edit_icon
						size={iconSize}
						onEvent={handleWateringEdition}
						aria-label="Editar ultima fecha de riego"
					/>
				</div>
			)}
		</section>
	)

	return (
		<>
			<p>
				Último riego:{' '}
				<input
					type="date"
					defaultValue={formatDateToYYYYMMDD(plant.lastWatered) || today}
					// onChange={handleWateringEdition}
					ref={wateringDateRef}
				/>
				<Cloud_arrow_up size={iconSize} onEvent={handleWateringEdition} />
				<Button onEvent={() => update({ ...state, lastWatered: false })}>
					Cancelar
				</Button>
			</p>

			<WateringForm
				edit={{ state: wateringData, update: setWateringData }}
				plant={plant}
				iconSize={iconSize}
				eventData={currentWateringEvent}
			/>
			<ProductSelector
				edit={{ state: wateringData, update: setWateringData }}
				iconSize={iconSize}
				eventData={currentWateringEvent}
			/>
		</>
	)
}
