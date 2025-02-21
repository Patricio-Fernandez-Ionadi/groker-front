import React from 'react'
import { Button } from 'Groker/components'

export function ConfirmModal({
	isOpen,
	onClose,
	onConfirm,
	message,
	theme = 'light',
}) {
	if (!isOpen) return null

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div
				className={`modal-content ${theme}`}
				onClick={(e) => e.stopPropagation()}
			>
				<p>{message}</p>
				<div className="modal-actions">
					<Button className="confirm-button" onEvent={onConfirm} theme={theme}>
						Confirmar
					</Button>
					<Button className="cancel-button" onEvent={onClose} theme={theme}>
						Cancelar
					</Button>
				</div>
			</div>
		</div>
	)
}
