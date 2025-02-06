import { useState, useEffect, useContext } from 'react'
import { PlantsContext } from '../../context/plants/PlantsContext'

export const useHistoryEvents = () => {
	const { selectedPlant } = useContext(PlantsContext)

	const history = selectedPlant?.history || []

	const [newEvents, setNewEvents] = useState(history)

	useEffect(() => {
		const todayISO = new Date().toISOString().split('T')[0]
		const existingIndex = history.findIndex(
			(entry) => new Date(entry.date).toISOString().split('T')[0] === todayISO
		)
		if (existingIndex !== -1) {
			setNewEvents(history[existingIndex].events)
		}
	}, [selectedPlant])

	const addOrUpdateEvent = (history, newEvents) => {
		const todayISO = new Date().toISOString().split('T')[0]
		const existingIndex = history.findIndex(
			(entry) => new Date(entry.date).toISOString().split('T')[0] === todayISO
		)

		if (existingIndex !== -1) {
			const updatedEvents = [
				...history[existingIndex].events.filter(
					(event) => !newEvents.some((newEvent) => newEvent.type === event.type)
				),
				...newEvents,
			]
			const updatedHistory = [...history]
			updatedHistory[existingIndex] = {
				...history[existingIndex],
				events: updatedEvents,
			}
			return updatedHistory
		} else {
			return [
				...history,
				{ date: new Date().toISOString(), events: [...newEvents] },
			]
		}
	}

	const deleteNoteFromHistory = (noteId) => {
		setNewEvents((prevEvents) =>
			prevEvents
				.map((event) => {
					if (event.type === 'note') {
						const updatedDetails = event.details.filter(
							(note) => note.id !== noteId
						)
						return { ...event, details: updatedDetails }
					}
					return event
				})
				.filter((event) => event.type !== 'note' || event.details.length > 0)
		)
	}

	return { newEvents, setNewEvents, addOrUpdateEvent, deleteNoteFromHistory }
}
