import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useEditPlantContext } from '../../../context/PlantEditContext'

export function WateringFields() {
	const { state } = useContext(AppContext)

	const {
		handleWateringEntry,
		wateringData,
		addProductField,
		removeProductField,
		isWatered,
	} = useEditPlantContext()

	if (!isWatered) return null

	return (
		<>
			<div>
				<label>
					Fecha de último riego:
					<input
						type="date"
						name="lastWatering"
						onChange={handleWateringEntry}
					/>
				</label>

				<input
					type="number"
					name="amount"
					onChange={handleWateringEntry}
					placeholder="Cant. de agua (ml)"
				/>

				<input
					type="number"
					name="ph"
					onChange={handleWateringEntry}
					placeholder="pH del agua"
				/>

				<input
					type="number"
					name="ec"
					onChange={handleWateringEntry}
					placeholder="EC del agua"
				/>

				{wateringData.productsUsed.map((productUsed, index) => (
					<div key={index}>
						<label>
							Producto:
							<select
								name="product"
								// value={productUsed.product}
								onChange={(e) => handleWateringEntry(e, index)}
							>
								<option>Seleccionar producto</option>
								{state.products.map((product) => (
									<option key={product._id}>{product.name}</option>
								))}
							</select>
						</label>

						<input
							type="number"
							name="productAmount"
							onChange={(e) => handleWateringEntry(e, index)}
							placeholder="Cant. de producto (ml)"
						/>
						<button type="button" onClick={() => removeProductField(index)}>
							Eliminar Producto
						</button>
					</div>
				))}
				<button type="button" onClick={addProductField}>
					Añadir Producto
				</button>
			</div>
		</>
	)
}
