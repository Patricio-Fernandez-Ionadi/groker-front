import React, { useContext } from 'react'

import { GenModalContext } from '../../../src/Genetics/context/GenModalContext'

import { Button } from '../../app'

export function AddGeneticButton() {
	const { openGeneticModal } = useContext(GenModalContext)

	return <Button onClick={openGeneticModal}>+ Nueva</Button>
}
