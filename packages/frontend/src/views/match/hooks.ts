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

		const [matchId, setMatchId] = React.useState<string | null>(
			window.location.hash.substring(1) || null
		)

		const [events, setEvents] = React.useState<Event[]>([])

		const { socket } = useSocket(
			Messages.Types.STATE,
			(event: Messages.State) => {
				setEvents([
					...events,
					{ name: Messages.Types.STATE, description: 'updated game state' },
				])
				setState(event.state)
			}
		)

		useSocket(Messages.Types.JOINED_MATCH, (event: Messages.JoinedMatch) => {
			setEvents([
				...events,
				{
					name: Messages.Types.JOINED_MATCH,
					description: `joined match ${event.matchId}`,
				},
			])
			setMatchId(event.matchId)
		})

		useSocket(Messages.Types.ERROR, (event: Messages.Error) => {
			setEvents([
				...events,
				{ name: Messages.Types.ERROR, description: event.message },
			])
		})

		React.useEffect(() => {
			socket.emit(Messages.Types.JOIN_MATCH, { matchId } as Messages.JoinMatch)
		}, [])

		React.useEffect(() => {
			window.location.hash = `#${matchId}`
		}, [matchId])

		return {
			events,
			matchId,
			setMatchId,
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
