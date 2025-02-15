import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	setAmount,
	setEc,
	setLastWatered,
	setPh,
	setProducts,
} from '../../Register/store/historySlice'

export function WateringFields() {
	const dispatch = useDispatch()

	const { products } = useSelector((state) => state.productsStore)
	const editingState = useSelector((state) => state.historyStore)

	const { isWatered, products: selectedProducts } = editingState

	const [showAddProduct, setShowAddProduct] = useState(false)
	const [newProduct, setNewProduct] = useState({
		product: '',
		productAmount: '',
	})

	const handleWateringChanges = (e) => {
		const { name, value } = e.target

		switch (name) {
			case 'lastWatering':
				dispatch(setLastWatered(value))
				break
			case 'amount':
				dispatch(setAmount(value))
				break
			case 'ph':
				dispatch(setPh(value))
				break
			case 'ec':
				dispatch(setEc(value))
				break
			default:
				console.log('por ahora no controlado', name)
		}
	}

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
			dispatch(setProducts(updatedProducts))
			setNewProduct({ product: '', productAmount: '' })
			setShowAddProduct(false)
		}
	}

	const removeProductField = (index) => {
		const updatedProducts = selectedProducts.filter((_, i) => i !== index)
		dispatch(setProducts(updatedProducts))
	}

	const updateProductField = (index, field, value) => {
		const updatedProducts = selectedProducts.map((product, i) =>
			i === index ? { ...product, [field]: value } : product
		)
		dispatch(setProducts(updatedProducts))
	}

	if (!isWatered) return null

	return (
		<div className="watering-fields">
			<label className="watering-date">
				Fecha de último riego:
				<input
					type="date"
					name="lastWatering"
					onChange={handleWateringChanges}
				/>
			</label>

			<input
				className="watering-amount"
				type="number"
				name="amount"
				onChange={handleWateringChanges}
				placeholder="Cant. de agua (ml)"
			/>

			<input
				className="watering-ph"
				type="number"
				name="ph"
				onChange={handleWateringChanges}
				placeholder="pH del agua"
			/>

			<input
				className="watering-ec"
				type="number"
				name="ec"
				onChange={handleWateringChanges}
				placeholder="EC del agua"
			/>

			<div className="watering-products">
				{selectedProducts.map((product, index) => (
					<div key={index} className="watering-product-item">
						<select
							className="watering-product-select"
							value={product.product._id}
							onChange={(e) =>
								updateProductField(index, 'product', e.target.value)
							}
						>
							<option value="">Seleccionar producto</option>
							{products.map((p) => (
								<option
									key={p._id}
									value={p._id}
									disabled={selectedProducts.some(
										(sp) => sp.product._id === p._id
									)}
								>
									{p.name}
								</option>
							))}
						</select>

						<input
							className="watering-product-amount"
							type="number"
							value={product.productAmount}
							onChange={(e) =>
								updateProductField(
									index,
									'productAmount',
									Number(e.target.value)
								)
							}
							placeholder="Cant. de producto (ml)"
						/>
						<button
							className="watering-product-remove"
							onClick={() => removeProductField(index)}
						>
							Eliminar Producto
						</button>
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

					<button onClick={addProductField}>Confirmar Producto</button>
				</div>
			)}

			<button
				className="watering-product-add-button"
				onClick={() => setShowAddProduct(true)}
			>
				Añadir Producto
			</button>
		</div>
	)
}
