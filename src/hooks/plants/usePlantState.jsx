import { useContext } from 'react'
import { GeneticsContext } from '../../context/genetics/GeneticsContext'

import { calculateEstimatedChange } from '../../utils/dateUtils'
import { editPrevEvent } from '../../utils/helpers'

export const usePlantState = (newEvents, setNewEvents, setEditedPlant) => {
	const { genetics } = useContext(GeneticsContext)

	const handlePlantChange = (e) => {
		const { name, value, type, checked } = e.target
		const fieldValue = type === 'checkbox' ? checked : value

		switch (name) {
			case 'entryDate':
				setEditedPlant((prev) => ({
					...prev,
					entryDate: fieldValue,
					estimatedChange: calculateEstimatedChange({
						...prev,
						entryDate: fieldValue,
					}),
				}))
				editPrevEvent('entryDate', fieldValue, newEvents, setNewEvents)
				break
			case 'name':
				setEditedPlant((prev) => ({ ...prev, name: fieldValue }))
				editPrevEvent('name', fieldValue, newEvents, setNewEvents)
				break
			case 'stage':
				setEditedPlant((prev) => ({
					...prev,
					stage: fieldValue,
					estimatedChange: calculateEstimatedChange({
						...prev,
						stage: fieldValue,
					}),
				}))
				editPrevEvent('stage', fieldValue, newEvents, setNewEvents)
				break
			case 'genetic':
				const newGenetic = genetics.find(
					(genetic) => genetic.name === fieldValue
				)
				setEditedPlant((prev) => ({ ...prev, genetic: newGenetic }))
				editPrevEvent('genetic', fieldValue, newEvents, setNewEvents)
				break
			case 'estimatedChange':
				setEditedPlant((prev) => ({ ...prev, estimatedChange: fieldValue }))
				editPrevEvent('estimatedChange', fieldValue, newEvents, setNewEvents)
				break
			case 'potSize':
				setEditedPlant((prev) => ({ ...prev, potSize: fieldValue }))
				editPrevEvent('potSize', fieldValue, newEvents, setNewEvents)
				break
			case 'isFinalPot':
				setEditedPlant((prev) => ({
					...prev,
					flags: { ...prev.flags, isFinalPot: fieldValue },
				}))
				editPrevEvent('isFinalPot', fieldValue, newEvents, setNewEvents)
				break
			case 'underObservation':
				setEditedPlant((prev) => ({
					...prev,
					flags: { ...prev.flags, underObservation: fieldValue },
				}))
				editPrevEvent('underObservation', fieldValue, newEvents, setNewEvents)
				break
			case 'temperature':
				setEditedPlant((prev) => ({ ...prev, temperature: fieldValue }))
				editPrevEvent('temperature', fieldValue, newEvents, setNewEvents)
				break
			case 'humidity':
				setEditedPlant((prev) => ({ ...prev, humidity: fieldValue }))
				editPrevEvent('humidity', fieldValue, newEvents, setNewEvents)
				break
			default:
				console.warn(`Campo no manejado: ${name}`)
				break
		}
	}

	return { handlePlantChange }
}
