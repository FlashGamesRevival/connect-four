import React from 'react'
import { Entities } from '@connect-four/core'
import { Dot } from '../../components/Dot'
import { DotWrapper } from '../../components/DotWrapper'
import { Row } from '../../components/Row'

import './style.css'
import styled from 'styled-components'
import { MatchStoreProvider, useMatchStoreContext } from './hooks'

const Layout = styled.div`
	display: flex;

	> main {
		flex: 1;
	}
`

const Debugger = () => {
	const { events } = useMatchStoreContext()

	return (
		<aside>
			{events.map((event, index) => (
				<div key={index}>
					{event.name}: {event.description}
				</div>
			))}
		</aside>
	)
}

const Field = () => {
	const { state } = useMatchStoreContext()

	return (
		<main>
			{state.rows.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map((cell, cellIndex) => (
						<DotWrapper>
							<Dot key={cellIndex} {...cell} hoveredBy={null} />
						</DotWrapper>
					))}
				</Row>
			))}
		</main>
	)
}

const MatchView = () => {
	return (
		<MatchStoreProvider>
			<Layout>
				<Field />
				<Debugger />
			</Layout>
		</MatchStoreProvider>
	)
}

export { MatchView }
