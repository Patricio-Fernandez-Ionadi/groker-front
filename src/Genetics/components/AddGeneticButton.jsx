import React, { useContext } from 'react'
import { GenModalContext } from '../../../src/Genetics/context/GenModalContext'

export function AddGeneticButton() {
	const { openGeneticModal } = useContext(GenModalContext)

	return <button onClick={openGeneticModal}>+ Nueva</button>
}
