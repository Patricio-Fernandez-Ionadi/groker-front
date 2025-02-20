import React, { useContext } from 'react'

import { GenModalContext } from '../context/GenModalContext'
import { Button } from '../../app'

export function AddGeneticButton() {
	const { openGeneticModal } = useContext(GenModalContext)

	return <Button onEvent={openGeneticModal}>+ Nueva</Button>
}
