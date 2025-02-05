import { createContext, useEffect, useState } from 'react'
import {
	api_addGenetic,
	api_deleteGenetic,
	api_getGenetics,
} from '../../api/genetics'

export const GeneticsContext = createContext()

export const GeneticsProvider = ({ children }) => {
	const [geneticsState, setGeneticState] = useState([])

	useEffect(() => {
		__getAllGenetics()
	}, [])

	const __getAllGenetics = async () => {
		try {
			const genetics = await api_getGenetics()
			setGeneticState(genetics)
		} catch (error) {
			console.error(error)
			throw new Error('Error al obtener genetica __getAllGeneticsContext')
		}
	}

	const addGenetic = async (newGenetic) => {
		try {
			const addedGenetic = await api_addGenetic(newGenetic)
			setState((prev) => ({
				...prev,
				genetics: [...prev.genetics, addedGenetic],
			}))
		} catch (error) {
			handleError(error, 'Error al agregar genetica addGeneticContext')
		}
	}

	const deleteGenetic = async (geneticId) => {
		try {
			await api_deleteGenetic(geneticId)
			setState((prev) => ({
				...prev,
				genetics: prev.genetics.filter((genetic) => genetic._id !== geneticId),
			}))
		} catch (error) {
			handleError(error, 'Error al eliminar genetica deleteGeneticContext')
		}
	}

	return (
		<GeneticsContext.Provider
			value={{
				addGenetic,
				deleteGenetic,
				genetics: geneticsState,
			}}
		>
			{children}
		</GeneticsContext.Provider>
	)
}
