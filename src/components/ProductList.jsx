import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

/**
 * Componente que muestra la lista de productos en el inventario.
 */
const ProductList = () => {
	const { products } = useContext(ProductContext)

	return (
		<div>
			<h2>Inventario de Productos</h2>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
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
