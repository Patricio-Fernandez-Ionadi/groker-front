import { createContext, useState } from 'react'

export const GenModalContext = createContext()

const GenModalProvider = ({ children }) => {
	const [showGeneticForm, setShowGeneticForm] = useState(false)

	return (
		<GenModalContext.Provider
			value={{
				showGeneticForm,
				setShowGeneticForm,
			}}
		>
			{children}
		</GenModalContext.Provider>
	)
}

export default GenModalProvider
