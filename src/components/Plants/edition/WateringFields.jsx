import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	setAmount,
	setEc,
	setLastWatered,
	setPh,
} from '../../../store/reducers/history/historySlice'

export function WateringFields() {
	const dispatch = useDispatch()

	const { products } = useSelector((state) => state.productsStore)
	const editingState = useSelector((state) => state.historyStore)

	const { isWatered } = editingState

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
				{/* {wateringData.productsUsed.map((_, index) => (
					<div key={index} className="watering-product-item">
						<select
							className="watering-product-select"
							name="product"
							// onChange={(e) => handleWateringEntry(e, index)}
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
							// onChange={(e) => handleWateringEntry(e, index)}
							placeholder="Cant. de producto (ml)"
						/>
						<button
							className="watering-product-remove"
							// onClick={() => removeProductField(index)}
						>
							Eliminar Producto
						</button>
					</div>
				))} */}
			</div>

			<button className="watering-product-add" /*  onClick={addProductField} */>
				Añadir Producto
			</button>
		</div>
	)
}
