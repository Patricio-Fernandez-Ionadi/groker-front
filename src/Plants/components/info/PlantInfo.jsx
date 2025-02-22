import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from 'groker/components'
import { Chevron_left, Chevron_right } from 'groker/icons'
import { routes, useTheme } from '@/app'

import { PlantHistory, usePlants, usePlantsActions } from '../../'

// Fields
import { NameField } from './fields/NameField'
import { GeneticField } from './fields/GeneticField'
import { EntryDateField } from './fields/EntryDateField'
import { StageField } from './fields/StageField'
import { EstimatedChangeField } from './fields/EstimatedChangeField'
import { PotSizeField } from './fields/PotSizeField'
import { WateringField } from './fields/WateringField'
import { NotesField } from './fields/NotesField'

export function PlantInfo() {
	const { theme } = useTheme()
	const { selectedPlant, selectedIndex } = usePlants()
	const { selectPlant, getPlantById, selectPlantByIndex } = usePlantsActions()
	const plantId = useParams().id
	const navigate = useNavigate()

	const plant = getPlantById(plantId)

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

	/**
	 * Selecciona la planta seleccionada si se entra en el componente por el link de la planta
	 * y no hay una planta seleccionada
	 */
	React.useEffect(() => {
		if (plant && !selectedPlant) selectPlant(plant)
	}, [plant, selectPlant])

	React.useEffect(() => {
		if (selectedPlant) {
			navigate(routes.plantDetail.buildPath(selectedPlant._id))
		}
	}, [selectedPlant, navigate])

	const handlePrevPlant = () => {
		selectPlantByIndex(selectedIndex - 1)
	}
	const handleNextPlant = () => {
		selectPlantByIndex(selectedIndex + 1)
	}

	if (!plant) return <p>Parece que la planta no existe</p>
	return (
		<main className="plant-info-container">
			<section
				className={`plant-info-section ${theme}`}
				aria-labelledby="plant-info-title"
			>
				<header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Button onEvent={handlePrevPlant} theme={theme}>
						<Chevron_left size={iconSize} />
					</Button>
					<h1 id="plant-info-title">Información de la Planta</h1>
					<Button onEvent={handleNextPlant} theme={theme}>
						<Chevron_right size={iconSize} />
					</Button>
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
