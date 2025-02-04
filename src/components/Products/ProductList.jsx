import React, { useContext } from 'react'

import AddProduct from './AddProduct'
import { AppContext } from '../../context/AppContext'
import { FormContext } from '../../context/FormContext'

/**
 * Componente que muestra la lista de productos en el inventario.
 */
const ProductList = () => {
	const { isAddProductFormOpen, toggleAddProductForm } = useContext(FormContext)

	const { state } = useContext(AppContext)
	const { products } = state

	return (
		<div>
			<h2>Inventario de Productos</h2>

			<button onClick={toggleAddProductForm}>
				{isAddProductFormOpen ? 'Cerrar' : 'Añadir Producto'}
			</button>
			{isAddProductFormOpen && <AddProduct />}

			<ul>
				{products.map((product) => (
					<li key={product.name}>
						<h3>{product.name}</h3>
						<p>Stock: {product.stock} ml</p>
						<p>Nitrógeno: {product.nitrogen} %</p>
						<p>Fósforo: {product.phosphorus} %</p>
						<p>Potasio: {product.potassium} %</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProductList
