import constate from 'constate'
import React from 'react'

import { useSocket } from 'use-socketio'
import { Entities, Messages } from '@connect-four/core'

type Event = {
	name: string
	description: string | null
}

export const [MatchStoreProvider, useMatchStoreContext] = constate(
	function MatchStore() {
		const [state, setState] = React.useState<Entities.GameState>({
			columns: [],
			nextTurn: 'red',
		})

		const [events, setEvents] = React.useState<Event[]>([])

		const { socket } = useSocket(
			Messages.Types.STATE,
			(state: Entities.GameState) => {
				setEvents([
					...events,
					{ name: Messages.Types.STATE, description: 'updated game state' },
				])
				setState(state)
			}
		)

		return {
			events,
			sendChooseColumn: (event: Messages.ChooseColumn) => {
				setEvents([
					...events,
					{ name: Messages.Types.CHOOSE_COLUMN, description: 'clicked column' },
				])
				socket.emit(Messages.Types.CHOOSE_COLUMN, event)
			},
			state,
		}
	}
)
