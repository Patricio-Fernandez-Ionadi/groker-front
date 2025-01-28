export const translateField = (field) => {
	const translations = {
		name: 'Nombre',
		lastWatered: 'Último Riego',
		stage: 'Etapa',
		entryDate: 'Fecha de Ingreso',
		estimatedChange: 'Fecha Estimada de Cambio',
		underObservation: 'En Observación',
		history: 'Historial',
		genetics: 'Genética',
		potSize: 'Tamaño de la Maceta',
		isFinalPot: 'Maceta Final',
	}
	return translations[field] || field
}
