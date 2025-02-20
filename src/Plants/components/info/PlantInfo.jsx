import React from 'react'
import { useParams } from 'react-router'

import { PlantHistory, usePlants, usePlantsActions } from '../../'

// Fields
import { NameField } from './NameField'
import { GeneticField } from './GeneticField'
import { EntryDateField } from './EntryDateField'
import { StageField } from './StageField'
import { EstimatedChangeField } from './EstimatedChangeField'
import { PotSizeField } from './PotSizeField'
import { WateringField } from './WateringField'
import { NotesField } from './NotesField'
import { useTheme } from '../../../app'

export function PlantInfo() {
	const { plants, selectedPlant } = usePlants()
	const { selectPlant } = usePlantsActions()
	const plantId = useParams().id
	const { theme } = useTheme()

	const iconSize = 25

	const [edit, setEdit] = React.useState({
		name: false,
		entryDate: false,
		genetic: false,
		stage: false,
		estimatedChange: false,
		potSize: false,
		lastWatered: false,
		note: false,
	})

	const plant = React.useMemo(
		() => plants.find((p) => p._id === plantId),
		[plants, plantId]
	)

	React.useEffect(() => {
		if (plant && !selectedPlant) selectPlant(plant)
	}, [plant, selectPlant])

	if (!plant) return <p>Parece que la planta no existe</p>
	return (
		<main className="plant-info-container">
			<section
				className={`plant-info-section ${theme}`}
				aria-labelledby="plant-info-title"
			>
				<header>
					<h1 id="plant-info-title">Información de la Planta</h1>
				</header>

				<div className={`plant-info-fields ${theme}`}>
					{/* NAME */}
					<NameField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* ENTRY DATE */}
					<EntryDateField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* GENETIC */}
					<GeneticField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* STAGE */}
					<StageField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* ESTIMATED CHANGE */}
					<EstimatedChangeField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* POT SIZE */}
					<PotSizeField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* LAST WATERED */}
					<WateringField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>

					{/* UNDER OBSERVATION */}
					{/* <ToggleSwitch
				switcher={plant.flags.underObservation}
				onEvent={() => {}}
			/> */}

					{/* NOTES */}
					<NotesField
						edit={{ state: edit, update: setEdit }}
						plant={plant}
						iconSize={iconSize}
					/>
				</div>
			</section>
			<PlantHistory />
		</main>
	)
}
