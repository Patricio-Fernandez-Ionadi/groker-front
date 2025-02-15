import { createContext, useState } from 'react'

export const GenModalContext = createContext()

export const GenModalProvider = ({ children }) => {
	const [isGeneticModalOpen, setGeneticModalOpen] = useState(false)
	const openGeneticModal = () => setGeneticModalOpen(true)
	const closeGeneticModal = () => setGeneticModalOpen(false)
	const toggleGeneticModal = () => setGeneticModalOpen(!isGeneticModalOpen)

	return (
		<GenModalContext.Provider
			value={{
				isGeneticModalOpen,
				openGeneticModal,
				closeGeneticModal,
				toggleGeneticModal,
			}}
		>
			{children}
		</GenModalContext.Provider>
	)
}
