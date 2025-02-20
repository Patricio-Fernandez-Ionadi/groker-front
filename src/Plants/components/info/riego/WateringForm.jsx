import React from 'react'

export function WateringForm({ edit }) {
	const { state, update } = edit

	const handleChange = (e) => {
		const { name, value } = e.target
		update((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	return (
		<div className="watering-advanced-fields">
			<label className="amount-field">
				<input
					type="number"
					placeholder="Cant. agua (ml)"
					name="amount"
					value={state.amount || ''}
					onChange={handleChange}
				/>
			</label>
			<label className="ph-field">
				<input
					type="number"
					placeholder="pH"
					name="ph"
					value={state.ph || ''}
					onChange={handleChange}
				/>
			</label>
			<label className="ec-field">
				<input
					type="number"
					placeholder="EC"
					name="ec"
					value={state.ec || ''}
					onChange={handleChange}
				/>
			</label>
		</div>
	)
}
