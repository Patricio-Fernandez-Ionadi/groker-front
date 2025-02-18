import React, { useEffect } from 'react'
import { useProducts } from '../../../../Products'
import { Button } from '../../../../app'

export function ProductSelector({ edit, eventData }) {
	const { products } = useProducts()
	const { state, update } = edit

	const [selectedProducts, setSelectedProducts] = React.useState(
		() => eventData?.details.productsUsed || []
	)
	const [showAddProduct, setShowAddProduct] = React.useState(false)
	const [newProduct, setNewProduct] = React.useState({
		product: '',
		productAmount: '',
	})

	console.log('productos seleccionados en el estado:', selectedProducts)

	useEffect(() => {
		update({ ...state, productsUsed: selectedProducts })
	}, [selectedProducts])

	const handleProductChange = (e) => {
		const { name, value } = e.target
		setNewProduct((prev) => ({ ...prev, [name]: value }))
	}

	const addProductField = () => {
		if (newProduct.product && newProduct.productAmount) {
			const product = products.find((p) => p._id === newProduct.product)

			const updatedProducts = [
				...selectedProducts,
				{ product, productAmount: Number(newProduct.productAmount) },
			]
			setSelectedProducts(updatedProducts)
			setNewProduct({ product: '', productAmount: '' })
			setShowAddProduct(false)
		}
	}

	const removeProductField = (index) => {
		const updatedProducts = selectedProducts.filter((_, i) => i !== index)
		setSelectedProducts(updatedProducts)
	}

	return (
		<>
			<div className="watering-products">
				{selectedProducts.map((product, index) => (
					<div key={index} className="watering-product-item">
						<p>
							{product.product.name}

							<span>{product.productAmount}ml</span>

							<Button
								className="watering-product-remove"
								onEvent={() => removeProductField(index)}
							>
								Eliminar Producto
							</Button>
						</p>
					</div>
				))}
			</div>

			{showAddProduct && (
				<div className="watering-product-add">
					<select
						name="product"
						value={newProduct.product}
						onChange={handleProductChange}
					>
						<option value="">Seleccionar producto</option>
						{products
							.filter(
								(p) => !selectedProducts.some((sp) => sp.product._id === p._id)
							)
							.map((p) => (
								<option key={p._id} value={p._id}>
									{p.name}
								</option>
							))}
					</select>

					<input
						type="number"
						name="productAmount"
						value={newProduct.productAmount}
						onChange={handleProductChange}
						placeholder="Cant. de producto (ml)"
					/>

					<Button onEvent={addProductField}>Confirmar Producto</Button>
					<Button onEvent={() => setShowAddProduct(false)}>Cancelar</Button>
				</div>
			)}

			<Button
				className="watering-product-add-button"
				onEvent={() => setShowAddProduct(true)}
			>
				Añadir Producto
			</Button>
		</>
	)
}
