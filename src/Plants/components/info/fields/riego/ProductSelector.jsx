import React, { useEffect } from 'react'
import { Button } from 'Groker/components'
import { useTheme } from '@/app'
import { useProducts } from '@/Products'

export function ProductSelector({ edit, eventData }) {
	const { products } = useProducts()
	const { state, update } = edit
	const { theme } = useTheme()

	const [selectedProducts, setSelectedProducts] = React.useState(
		() => eventData?.details.productsUsed || []
	)
	const [showAddProduct, setShowAddProduct] = React.useState(false)
	const [newProduct, setNewProduct] = React.useState({
		product: '',
		productAmount: '',
	})

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
		<section className="field-section" aria-labelledby="product-selector-label">
			<div className={`watering-products-added ${theme}`}>
				{selectedProducts.length > 0 && (
					<span className="field-label">Productos añadidos</span>
				)}
				{selectedProducts.map((product, index) => (
					<div key={index} className={`watering-product-item ${theme}`}>
						<p>
							<span>{product.product.name}</span>
							<span>{product.productAmount}ml</span>
						</p>
						<Button
							className="watering-product-remove"
							onEvent={() => removeProductField(index)}
							aria-label={`Eliminar producto ${product.product.name}`}
							theme={theme}
						>
							Eliminar
						</Button>
					</div>
				))}
			</div>

			{showAddProduct && (
				<div className={`field-edit-mode product-selection-form ${theme}`}>
					<select
						name="product"
						value={newProduct.product}
						onChange={handleProductChange}
						aria-label="Seleccionar producto"
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
						aria-label="Cantidad de producto"
					/>
					<div className="field-actions">
						<Button
							onEvent={addProductField}
							aria-label="Confirmar producto"
							className="primary"
							theme={theme}
						>
							Confirmar
						</Button>
						<Button
							onEvent={() => setShowAddProduct(false)}
							aria-label="Cancelar edición"
							className="secondary"
							theme={theme}
						>
							Cancelar
						</Button>
					</div>
				</div>
			)}

			<div className="field-view-mode product-selector">
				<Button
					className="watering-product-add-button primary"
					onEvent={() => setShowAddProduct(true)}
					aria-label="Añadir producto"
					theme={theme}
				>
					Añadir Producto
				</Button>
			</div>
		</section>
	)
}
