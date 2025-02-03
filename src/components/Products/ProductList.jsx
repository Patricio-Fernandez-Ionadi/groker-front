import React, { useContext, useState } from 'react'

import AddProduct from './AddProduct'
import { AppContext } from '../../context/AppContext'

/**
 * Componente que muestra la lista de productos en el inventario.
 */
const ProductList = () => {
	const [showAddProductForm, setShowAddProductForm] = useState(false)

	const { state } = useContext(AppContext)
	const { products } = state

	return (
		<div>
			<h2>Inventario de Productos</h2>

			<button onClick={() => setShowAddProductForm(!showAddProductForm)}>
				{showAddProductForm ? 'Cerrar' : 'Añadir Producto'}
			</button>
			{showAddProductForm && <AddProduct />}

			<ul>
				{products.map((product) => (
					<li key={product._id}>
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
