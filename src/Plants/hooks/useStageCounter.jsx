import { useEffect, useState } from 'react'

import { usePlants } from './usePlants'

export function useStageCounter() {
	const { plants } = usePlants()

	const [stageCounter, setStageCounter] = useState({
		germination: 0,
		vegetative: 0,
		flowering: 0,
	})

	useEffect(() => {
		const countStages = (plants) => {
			const counts = {
				germination: 0,
				vegetative: 0,
				flowering: 0,
			}

			plants.forEach((plant) => {
				if (plant.stage in counts) {
					counts[plant.stage]++
				}
			})

			return counts
		}

		setStageCounter(countStages(plants))
	}, [plants])

	return stageCounter
}
