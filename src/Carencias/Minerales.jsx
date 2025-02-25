import React from 'react'
import mineralesData from './data/minerales.json'
import { Section } from './components/Section'

export function Minerales() {
	const nitrogenoRef = React.useRef(null)
	const potasioRef = React.useRef(null)
	const fosforoRef = React.useRef(null)
	const calcioRef = React.useRef(null)
	const manganesoRef = React.useRef(null)
	const magnesioRef = React.useRef(null)

	const [sections, setSections] = React.useState([])
	const [filteredSections, setFilteredSections] = React.useState([])

	React.useEffect(() => {
		setSections(mineralesData.sections)
		setFilteredSections(mineralesData.sections)

		const hash = window.location.hash
		if (hash) {
			const element = document.querySelector(hash)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [])

	/* SEARCHBAR */
	const [query, setQuery] = React.useState('')
	const handleSearch = (e) => {
		console.log(query)
		setQuery(e.target.value)
		const filtered = sections.filter((section) =>
			section.content.some(
				(item) =>
					typeof item === 'object' &&
					Object.values(item).some((val) =>
						String(val).toLowerCase().includes(query.toLowerCase())
					)
			)
		)
		setFilteredSections(filtered)
	}

	return (
		<main className="carencias_container">
			{/* SEARCHBAR */}
			<input
				type="text"
				placeholder="Buscar..."
				value={query}
				onChange={handleSearch}
				className="search_bar"
			/>
			{filteredSections.map((section) => (
				<section
					className="article_container"
					id={section.id}
					key={section.id}
					ref={
						section.id === 'nitrogeno'
							? nitrogenoRef
							: section.id === 'potasio'
							? potasioRef
							: section.id === 'fosforo'
							? fosforoRef
							: section.id === 'calcio'
							? calcioRef
							: section.id === 'manganeso'
							? manganesoRef
							: section.id === 'magnesio'
							? magnesioRef
							: null
					}
				>
					{/* SECTION */}
					<Section title={section.title} content={section.content} />
				</section>
			))}
		</main>
	)
}
