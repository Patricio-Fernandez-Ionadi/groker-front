import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FormContext } from '../../app'
import { ConfirmModal } from '../../app'

import { AddProduct } from './AddProduct'

import { selectProduct, deleteProduct, loadProducts } from '../'

export const ProductList = () => {
	const {
		isAddProductFormOpen,
		toggleAddProductForm,
		openEditProductForm,
		isEditProductFormOpen,
	} = useContext(FormContext)

	const dispatch = useDispatch()
	const { products } = useSelector((state) => state.productsStore)

	const handleEditProduct = (product) => {
		openEditProductForm()
		dispatch(selectProduct(product))
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
			dispatch(deleteProduct(productToDelete._id))
			setIsModalOpen(false) // Cierra el modal
			setProductToDelete(null) // Limpia el estado
		}
	}

	const closeModal = () => {
		setIsModalOpen(false) // Cierra el modal
		setProductToDelete(null) // Limpia el estado
	}

	if (products.length === 0) {
		dispatch(loadProducts())
		return <div>Loading...</div>
	}

	return (
		<div className="product-list-container">
			<h2>Inventario de Productos</h2>
			<button className="add-product-button" onClick={toggleAddProductForm}>
				{isAddProductFormOpen ? 'Cerrar' : 'Añadir Producto'}
			</button>
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
							<button
								className="edit-button"
								onClick={() => handleEditProduct(product)}
							>
								Editar
							</button>
							<button
								className="delete-button"
								onClick={() => handleDeleteProduct(product._id)}
							>
								Eliminar
							</button>
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
