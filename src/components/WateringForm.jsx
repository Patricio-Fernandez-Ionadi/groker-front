import React from 'react'

/**
 * Componente para manejar los datos de riego.
 */
const WateringForm = ({ wateringData, setWateringData, products }) => {
	const handleWateringChange = (e, index) => {
		const { name, value } = e.target
		if (name === 'product' || name === 'productAmount') {
			const newProductsUsed = [...wateringData.productsUsed]
			newProductsUsed[index][name] = value
			setWateringData({
				...wateringData,
				productsUsed: newProductsUsed,
			})
		} else {
			setWateringData({
				...wateringData,
				[name]: value,
			})
		}
	}

	const addProductField = () => {
		setWateringData((prevState) => ({
			...prevState,
			productsUsed: [
				...prevState.productsUsed,
				{ product: '', productAmount: '' },
			],
		}))
	}

	const removeProductField = (index) => {
		const newProductsUsed = wateringData.productsUsed.filter(
			(_, i) => i !== index
		)
		setWateringData({
			...wateringData,
			productsUsed: newProductsUsed,
		})
	}

	return (
		<div className="form-group">
			<label>
				Fecha de último riego:
				<input
					type="date"
					name="lastWatered"
					value={wateringData.lastWatered}
					onChange={handleWateringChange}
					placeholder="Fecha de último riego"
				/>
			</label>
			<label>
				Cantidad de agua (ml):
				<input
					type="number"
					name="amount"
					value={wateringData.amount}
					onChange={handleWateringChange}
					placeholder="Cantidad de agua (ml)"
				/>
			</label>
			<label>
				pH del agua:
				<input
					type="number"
					name="ph"
					value={wateringData.ph}
					onChange={handleWateringChange}
					placeholder="pH del agua"
				/>
			</label>
			<label>
				EC del agua:
				<input
					type="number"
					name="ec"
					value={wateringData.ec}
					onChange={handleWateringChange}
					placeholder="EC del agua"
				/>
			</label>
			<label>
				Temperatura (°C):
				<input
					type="number"
					name="temperature"
					value={wateringData.temperature}
					onChange={handleWateringChange}
					placeholder="Temperatura (°C)"
				/>
			</label>
			<label>
				Humedad (%):
				<input
					type="number"
					name="humidity"
					value={wateringData.humidity}
					onChange={handleWateringChange}
					placeholder="Humedad (%)"
				/>
			</label>
			{wateringData.productsUsed.map((productUsed, index) => (
				<div key={index} className="form-group">
					<label>
						Producto:
						<select
							name="product"
							value={productUsed.product}
							onChange={(e) => handleWateringChange(e, index)}
						>
							<option value="">Seleccionar producto</option>
							{products.map((product) => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))}
						</select>
					</label>
					<label>
						Cantidad de producto (ml):
						<input
							type="number"
							name="productAmount"
							value={productUsed.productAmount}
							onChange={(e) => handleWateringChange(e, index)}
							placeholder="Cantidad de producto (ml)"
						/>
					</label>
					<button type="button" onClick={() => removeProductField(index)}>
						Eliminar Producto
					</button>
				</div>
			))}
			<button type="button" onClick={addProductField}>
				Añadir Producto
			</button>
		</div>
	)
}

export default WateringForm
