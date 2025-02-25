import React from 'react'
import { Button } from 'groker/components'

export const GoTopButton = () => {
	const [isActive, setIsActive] = React.useState(false)

	const showButton = (e) => {
		if (e.target.scrollingElement.scrollTop > 300) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}
	window.onscroll = showButton

	const scrollToTop = (duration) => {
		if (document.scrollingElement.scrollTop === 0) return

		const totalScrollDistance = document.scrollingElement.scrollTop
		let scrollY = totalScrollDistance
		let oldTimestamp = null

		function step(newTimestamp) {
			if (oldTimestamp !== null) {
				scrollY -=
					(totalScrollDistance * (newTimestamp - oldTimestamp)) / duration
				if (scrollY <= 0) return (document.scrollingElement.scrollTop = 0)
				document.scrollingElement.scrollTop = scrollY
			}
			oldTimestamp = newTimestamp
			window.requestAnimationFrame(step)
		}
		window.requestAnimationFrame(step)
	}
	const handleGoTop = () => {
		scrollToTop(500)
	}

	return (
		<>
			{isActive ? (
				<Button onEvent={handleGoTop} className="go-top-button">
					^
				</Button>
			) : (
				<span></span>
			)}
		</>
	)
}
