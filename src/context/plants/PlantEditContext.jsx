import { createContext, useContext } from 'react'
import { useEditPlant } from '../../hooks/useEditPlant'

const PlantEditContext = createContext()

export const PlantsFormsEditProvider = ({ children }) => {
	const hookValues = useEditPlant()

	return (
		<PlantEditContext.Provider value={hookValues}>
			{children}
		</PlantEditContext.Provider>
	)
}

export const useEditPlantContext = () => useContext(PlantEditContext)
