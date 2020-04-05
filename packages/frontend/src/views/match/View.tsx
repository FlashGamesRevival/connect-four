import React from 'react'
import { Board } from './components/Board'
import { PlayerTurn } from './components/PlayerTurn'

import './style.css'
import styled from 'styled-components'
import { MatchStoreProvider, useMatchStoreContext } from './hooks'

const Layout = styled.div`
	display: flex;
	flex-direction: column;

	> main {
		flex: 1;
		display: flex;
		margin: 0 auto;
	}
`

const Debugger = () => {
	const { events, matchId } = useMatchStoreContext()

	return (
		<aside>
			{matchId}
			{events.map((event, index) => (
				<div key={index}>
					{event.name}: {event.description}
				</div>
			))}
		</aside>
	)
}

const MatchView = () => {
	return (
		<MatchStoreProvider>
			<Layout>
				<Board />
				<PlayerTurn />
				<Debugger />
			</Layout>
		</MatchStoreProvider>
	)
}

export { MatchView }
