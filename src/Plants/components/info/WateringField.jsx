import React from 'react'

import { Button, Cloud_arrow_up, Edit_icon } from '../../../app'

import { usePlantsActions } from '../../hooks/usePlantsActions'

import {
	formatDate,
	formatDateToISO,
	formatDateToYYYYMMDD,
	today,
} from '../../utils/dateUtils'
import { WateringForm } from './riego/WateringForm'
import { ProductSelector } from './riego/ProductSelector'
import { updateObjectEvent } from '../history/utils/updateHistory'

export function WateringField({ edit, plant, iconSize }) {
	const { updatePlant } = usePlantsActions()
	const { state, update } = edit
	const wateringDateRef = React.useRef(null)

	// WIP
	const currentPlantRegister = plant.history[plant.history.length - 1].events
	const currentWateringEvent = currentPlantRegister.find(
		(entry) => entry.type === 'watering'
	)

	const [wateringData, setWateringData] = React.useState({
		ec: currentWateringEvent?.details.ec || 0,
		ph: currentWateringEvent?.details.ph || 0,
		amount: currentWateringEvent?.details.amount || 0,
		productsUsed: currentWateringEvent?.details.productsUsed || [],
	})

	// console.log(wateringData)

	const handleWateringEdition = () => {
		if (!state.lastWatered) {
			update({ ...state, lastWatered: true })
		} else {
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

			updatePlant(plantToSave)

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
}
