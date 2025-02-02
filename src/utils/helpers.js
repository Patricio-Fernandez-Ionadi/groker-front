export const toggleCheckboxState = (state, setState) => {
	setState(!state)
}

/**
 * Usado en EditPlant.jsx.
 * Busca el idx del primer evento con el tipo dado.
 * @param {string} tipo - tipo de dato a buscar.
 * @param {Array} eventos - Array de eventos a buscar.
 * @returns {number} - El idx del primer evento con el tipo dado o -1 si no lo encuentra.
 */
export const existingEventIndex = (tipo, eventos) => {
	const index = eventos.findIndex((event) => event.type === tipo)
	return index
}

export const editPrevEvent = (tipo, dato, state, updater) => {
	const eventIndex = existingEventIndex(tipo, state)

	if (eventIndex !== -1) {
		// Si el evento ya existe, actualiza su detalle.
		updater((prev) =>
			prev.map((event, index) =>
				index === eventIndex ? { type: tipo, details: dato } : event
			)
		)
	} else {
		// Si el evento no existe, crea uno nuevo,
		updater((prev) => [...prev, { type: tipo, details: dato }])
	}
}
