import React, { useContext } from 'react'
import { GenModalContext } from '../../context/genetics/GenModalContext'

export function AddGeneticButton() {
	const { openGeneticModal } = useContext(GenModalContext)

	return <button onClick={openGeneticModal}>+ Nueva</button>
}
