import React, { useContext } from 'react'
import { Button } from 'groker'

import { GenModalContext } from '@/Genetics'
import { useTheme } from '@/app'

export function AddGeneticButton() {
	const { openGeneticModal } = useContext(GenModalContext)
	const { theme } = useTheme()

	return (
		<Button onEvent={openGeneticModal} theme={theme}>
			+ Nueva
		</Button>
	)
}
