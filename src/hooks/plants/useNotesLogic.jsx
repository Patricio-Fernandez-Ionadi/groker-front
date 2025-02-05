import { useState } from 'react'

export const useNotesLogic = () => {
	const [newNote, setNewNote] = useState({ id: '', note: '' })

	const handleAddNote = (e) => {
		setNewNote({ id: Date.now(), note: e.target.value })
	}

	return { newNote, handleAddNote }
}
