export const Eye_icon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
		/>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
		/>
	</svg>
)

export const Exlamation_triangle = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
		/>
	</svg>
)

export const Exlamation_cicle = (props) => {
	const {
		strokeWidth = 1.5,
		size = 200,
		color = 'currentColor',
		fill = 'none',
		getProps,
	} = props

	if (getProps)
		console.log({
			strokeWidth: 'Number',
			size: 'Number',
			color: 'String',
			fill: 'String',
		})

	return (
		<svg
			// xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke={color}
			width={size}
			height={size}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
			/>
		</svg>
	)
}

//  =(
export const Face_frown = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
		/>
	</svg>
)

export const Cube_transparent = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
		/>
	</svg>
)

export const Cloud_arrow_up = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
		/>
	</svg>
)

export const Arrow_left = (props) => {
	const { size, color = '#222', strokeWidth = 1, getProps } = props

	if (getProps)
		console.log({ size: 'Number', color: 'String', strokeWidth: 'Number' })

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={color}
			width={size}
			height={size}
			// stroke={color}
			// strokeWidth={strokeWidth}
		>
			<path
				fillRule="evenodd"
				d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
				clipRule="evenodd"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</svg>
	)
}
