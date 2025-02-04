import { createContext, useState } from 'react'

const FormContext = createContext()

const FormProvider = ({ children }) => {
	// Formulario para edicion de plantas (nuevo registro)
	const [isEditionFormOpen, setEditionFormOpen] = useState(false)
	const openEditionForm = () => setEditionFormOpen(true)
	const closeEditionForm = () => setEditionFormOpen(false)
	const toggleEditionForm = () => setEditionFormOpen(!isEditionFormOpen)

	// Formulario para ingreso al inventario de nueva planta
	const [isAddPlantFormOpen, setAddPlantForm] = useState(false)
	const openAddPlantForm = () => setAddPlantForm(true)
	const closeAddPlantForm = () => setAddPlantForm(false)
	const toggleAddPlantForm = () => setAddPlantForm(!isAddPlantFormOpen)

	// Formulario para ingreso de nuevo producto
	const [isAddProductFormOpen, setAddProductForm] = useState(false)
	const openAddProductForm = () => setAddProductForm(true)
	const closeAddProductForm = () => setAddProductForm(false)
	const toggleAddProductForm = () => setAddProductForm(!isAddProductFormOpen)

	// habria que considerar una forma de editar un producto existente lo que podria verse reflejado en un modulo de estos mas

	return (
		<FormContext.Provider
			value={{
				// Form registro de producto
				isAddProductFormOpen,
				openAddProductForm,
				closeAddProductForm,
				toggleAddProductForm,
				// From registro nueva planta
				isAddPlantFormOpen,
				openAddPlantForm,
				closeAddPlantForm,
				toggleAddPlantForm,
				// From edicion de planta existente
				isEditionFormOpen,
				openEditionForm,
				closeEditionForm,
				toggleEditionForm,
			}}
		>
			{children}
		</FormContext.Provider>
	)
}
export { FormContext, FormProvider }
