import React from 'react'
import { usePlants } from '@/Plants'

import { useTheme } from '@/app'

import { PlantDetails } from '../details/PlantDetails'
import { InventoryDetails } from '../inventory/InventoryDetails'

const Detail = React.memo(() => {
	const { theme } = useTheme()
	const { selectedPlant } = usePlants()

	return (
		<section className={`details-component ${theme}`}>
			{selectedPlant ? <PlantDetails /> : <InventoryDetails />}
		</section>
	)
})

Detail.displayName = 'Detail'

export { Detail }
