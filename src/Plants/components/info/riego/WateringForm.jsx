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
		<div>
			<label>
				<input
					type="number"
					placeholder="pH"
					name="ph"
					value={state.ph || ''}
					onChange={handleChange}
				/>
			</label>
			<label>
				<input
					type="number"
					placeholder="EC"
					name="ec"
					value={state.ec || ''}
					onChange={handleChange}
				/>
			</label>
			<label>
				<input
					type="number"
					placeholder="Cant. agua (ml)"
					name="amount"
					value={state.amount || ''}
					onChange={handleChange}
				/>
			</label>
		</div>
	)
}
