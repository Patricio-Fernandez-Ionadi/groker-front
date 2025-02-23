import React from 'react'
import { Button, DateInput } from 'groker/components'
import { calendarFormat, isoFormat, inputsFormat, today } from 'groker/date'
import { Cloud_arrow_up, Edit_icon } from 'groker/icons'

import { useTheme } from '@/app'
import { useProductsActions } from '@/Products'
import { updateObjectEvent, usePlantsActions } from '@/Plants'

import { WateringForm } from './riego/WateringForm'
import { ProductSelector } from './riego/ProductSelector'

export function WateringField({ edit, plant, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const { updateProductStock } = useProductsActions()
	const { state, update } = edit
	const { theme } = useTheme()
	const [selectedDate, setSelectedDate] = React.useState(
		inputsFormat(plant.lastWatered)
	)

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
		lastWatered: selectedDate,
	})

	const handleWateringEdition = () => {
		if (!state.lastWatered) {
			update({ ...state, lastWatered: true })
		} else {
			// Ignorar estas validaciones de momento.
			/* Asegurarse de: 
				- no se puede registrar si la fecha es posterior a la actual
				- no se puede guardar ec ni ph si no hay amount
				- no se puede agregar productos si no hay amount
				- no se pueden agregar productos duplicados (deben editarse y gestionar el stock en consecuencia)
				- si un producto se edita con amount 0 ademas de gestionar el stok se debe quitar el producto (se considera eliminado)
			*/
			const newWateringDate = isoFormat(selectedDate)

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
						<DateInput
							theme={theme}
							onChangeEvent={(e) => setSelectedDate(e.target.value)}
							defaultValue={selectedDate}
							iconSize={iconSize}
							label="Ultimo Riego"
						/>
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
								theme={theme}
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
						<span>{calendarFormat(plant.lastWatered)}</span>
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
}
