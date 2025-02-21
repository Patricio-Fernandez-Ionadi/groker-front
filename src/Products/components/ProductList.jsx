import React, { useContext, useState } from 'react'
import { Button } from 'Groker/components'

import { FormContext, useTheme, ConfirmModal } from '@/app'

import { AddProduct } from './AddProduct'

import { useProducts, useProductsActions } from '../'

export const ProductList = () => {
	const {
		isAddProductFormOpen,
		toggleAddProductForm,
		isEditProductFormOpen,
		openEditProductForm,
		closeEditProductForm,
	} = useContext(FormContext)

	const { theme } = useTheme()

	const { products, selectedProduct } = useProducts()
	const { selectProduct, deleteProduct } = useProductsActions()

	const handleEditProduct = (product) => {
		openEditProductForm()
		selectProduct(product)
	}

	const [productToDelete, setProductToDelete] = useState(null) // Estado para el producto a eliminar
	const [isModalOpen, setIsModalOpen] = useState(false) // Estado para el modal

	const handleDeleteProduct = (productId) => {
		const product = products.find((p) => p._id === productId)
		setProductToDelete(product) // Guarda el producto a eliminar
		setIsModalOpen(true) // Abre el modal
	}

	const confirmDelete = () => {
		if (productToDelete) {
			deleteProduct(productToDelete._id)
			setIsModalOpen(false) // Cierra el modal
			setProductToDelete(null) // Limpia el estado
		}
	}

	const closeModal = () => {
		setIsModalOpen(false) // Cierra el modal
		setProductToDelete(null) // Limpia el estado
	}

	return (
		<div className="product-list-container">
			<h2>Inventario de Productos</h2>

			{isEditProductFormOpen && selectedProduct ? (
				<Button
					className="add-product-button"
					onEvent={closeEditProductForm}
					theme={theme}
				>
					Cancelar
				</Button>
			) : (
				<Button
					className="add-product-button"
					onEvent={toggleAddProductForm}
					theme={theme}
				>
					{isAddProductFormOpen ? 'Cerrar' : 'Añadir Producto'}
				</Button>
			)}

			{(isAddProductFormOpen || isEditProductFormOpen) && <AddProduct />}

			<div className="products-grid">
				{products.map((product) => (
					<div className="product-card" key={product.name}>
						<h3>{product.name}</h3>
						<table className="product-table">
							<tbody>
								<tr>
									<td>Stock</td>
									<td>{product.stock}</td>
								</tr>
								<tr>
									<td>Nitrogeno</td>
									<td>{product.nitrogen ? `${product.nitrogen} %` : 'N/A'} </td>
								</tr>
								<tr>
									<td>Potasio</td>
									<td>
										{product.potassium ? `${product.potassium} %` : 'N/A'}
									</td>
								</tr>
								<tr>
									<td>Fósforo</td>
									<td>
										{product.phosphorus ? `${product.phosphorus} %` : 'N/A'}
									</td>
								</tr>
								<tr>
									<td>{product.type}</td>
								</tr>
							</tbody>
						</table>
						<div className="product-actions">
							<Button
								className="edit-button"
								onEvent={() => handleEditProduct(product)}
								theme={theme}
							>
								Editar
							</Button>
							<Button
								className="delete-button"
								onEvent={() => handleDeleteProduct(product._id)}
								theme={theme}
							>
								Eliminar
							</Button>
						</div>
					</div>
				))}
			</div>
			{/* Modal de confirmación */}
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={confirmDelete}
				message={`¿Estás seguro de que deseas eliminar el producto "${productToDelete?.name}"?`}
			/>
		</div>
	)
}
