import React from 'react'

export function AlertModal({ message, onClose, theme }) {
	return (
		<div className="modal-overlay">
			<div className={`modal-content ${theme}`}>
				<p>{message}</p>
				<button className="confirm-button" onClick={onClose}>
					Confirmar
				</button>
			</div>
		</div>
	)
}
