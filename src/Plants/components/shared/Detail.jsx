import React from 'react'
import { usePlants, PlantDetails, InventoryDetails } from '@/Plants'

import { useTheme } from '@/app'

export const Detail = () => {
	const { theme } = useTheme()
	const { selectedPlant } = usePlants()

	return (
		<section className={`details-component ${theme}`}>
			{selectedPlant ? <PlantDetails /> : <InventoryDetails />}
		</section>
	)
}
