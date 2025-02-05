import { createContext, useContext, useState } from 'react'
import { AppContext } from './AppContext'

const FormContext = createContext()

const FormProvider = ({ children }) => {
	const { selectProduct, removeStateProduct } = useContext(AppContext)

	// Formulario para edicion de plantas (nuevo registro)
	const [isEditPlantFormOpen, setEditPlantFormOpen] = useState(false)
	const openEditPlantForm = () => setEditPlantFormOpen(true)
	const closeEditPlantForm = () => setEditPlantFormOpen(false)
	const toggleEditPlantForm = () => setEditPlantFormOpen(!isEditPlantFormOpen)

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

	const [isEditProductFormOpen, setEditProductForm] = useState(false)
	const openEditProductForm = (product) => {
		selectProduct(product)
		setEditProductForm(true)
	}
	const closeEditProductForm = () => {
		setEditProductForm(false)
		removeStateProduct()
	}

	return (
		<FormContext.Provider
			value={{
				// Form registro de producto
				isAddProductFormOpen,
				openAddProductForm,
				closeAddProductForm,
				toggleAddProductForm,
				// Form edicion de producto existente
				isEditProductFormOpen,
				openEditProductForm,
				closeEditProductForm,
				// From registro nueva planta
				isAddPlantFormOpen,
				openAddPlantForm,
				closeAddPlantForm,
				toggleAddPlantForm,
				// From edicion de planta existente
				isEditPlantFormOpen,
				openEditPlantForm,
				closeEditPlantForm,
				toggleEditPlantForm,
			}}
		>
			{children}
		</FormContext.Provider>
	)
}
export { FormContext, FormProvider }
