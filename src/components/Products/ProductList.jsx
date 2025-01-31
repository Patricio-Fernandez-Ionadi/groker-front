import React, { useEffect, useState } from 'react'

import { getProducts } from '../../api/products'
import AddProduct from './AddProduct'

/**
 * Componente que muestra la lista de productos en el inventario.
 */
const ProductList = () => {
	const [products, setProducts] = useState([])
	const [showAddProductForm, setShowAddProductForm] = useState(false)

	useEffect(() => {
		getProducts().then((data) => setProducts(data))
	}, [])

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
