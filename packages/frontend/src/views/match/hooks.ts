import constate from 'constate'
import React from 'react'

import { useSocket } from 'use-socketio'
import { Entities } from '@connect-four/core'

type Event = {
	name: string
	description: string | null
}

export const [MatchStoreProvider, useMatchStoreContext] = constate(
	function MatchStore() {
		const [state, setState] = React.useState<Entities.GameState>({
			nextTurn: 'red',
			rows: [],
		})

		const [events, setEvents] = React.useState<Event[]>([])

		useSocket('state', (state: Entities.GameState) => {
			setEvents([
				...events,
				{ name: 'state', description: 'updated game state' },
			])
			setState(state)
		})

		return { events, state }
	}
)
