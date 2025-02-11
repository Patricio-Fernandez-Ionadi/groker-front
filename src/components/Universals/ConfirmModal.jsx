import React from 'react'

export function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
	if (!isOpen) return null

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<p>{message}</p>
				<div className="modal-actions">
					<button className="cancel-button" onClick={onClose}>
						Cancelar
					</button>
					<button className="confirm-button" onClick={onConfirm}>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
