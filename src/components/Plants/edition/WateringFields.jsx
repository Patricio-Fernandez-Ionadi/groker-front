import React, { useContext } from 'react'
import { ProductsContext } from '../../../context/products/ProductsContext'
import { PlantEditionContext } from '../../../context/plants/PlantEditContext'

export function WateringFields() {
	const { products } = useContext(ProductsContext)

	const {
		handleWateringEntry,
		wateringData,
		addProductField,
		removeProductField,
		isWatered,
	} = useContext(PlantEditionContext)

	if (!isWatered) return null

	return (
		<div className="watering-fields">
			<label className="watering-date">
				Fecha de último riego:
				<input type="date" name="lastWatering" onChange={handleWateringEntry} />
			</label>

			<input
				className="watering-amount"
				type="number"
				name="amount"
				onChange={handleWateringEntry}
				placeholder="Cant. de agua (ml)"
			/>

			<input
				className="watering-ph"
				type="number"
				name="ph"
				onChange={handleWateringEntry}
				placeholder="pH del agua"
			/>

			<input
				className="watering-ec"
				type="number"
				name="ec"
				onChange={handleWateringEntry}
				placeholder="EC del agua"
			/>

			<div className="watering-products">
				{wateringData.productsUsed.map((_, index) => (
					<div key={index} className="watering-product-item">
						<select
							className="watering-product-select"
							name="product"
							onChange={(e) => handleWateringEntry(e, index)}
						>
							<option>Seleccionar producto</option>
							{products.map((product) => (
								<option key={product._id}>{product.name}</option>
							))}
						</select>

						<input
							className="watering-product-amount"
							type="number"
							name="productAmount"
							onChange={(e) => handleWateringEntry(e, index)}
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

			<button className="watering-product-add" onClick={addProductField}>
				Añadir Producto
			</button>
		</div>
	)
}
