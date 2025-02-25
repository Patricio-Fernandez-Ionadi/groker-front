import React from 'react'
import { Paragraph } from './Paragraph'
import { List } from './List'
import { Image } from './Image'

export const Section = ({ title, content }) => {
	const renderContent = (content) => {
		return content.map((item, index) => {
			switch (item.type) {
				case 'paragraph':
					return <Paragraph key={index} text={item.text} />
				case 'list':
					return <List key={index} items={item.items} />
				case 'image':
					return <Image key={index} title={item.title} src={item.src} />
				case 'section':
					return (
						<Section key={index} title={item.title} content={item.content} />
					)
				default:
					return null
			}
		})
	}
	return (
		<div className="article_container_single">
			<h3 className="article_title">{title}</h3> {renderContent(content)}
		</div>
	)
}
