import { v4 as uuid } from 'uuid'
import { Entities } from '@connect-four/core'

const matches = new Map<string, Entities.Match>()

const COLUMNS = 7
const ROWS = 6

export const createMatch = () => {
	const id = uuid()

	matches.set(id, {
		players: { blue: null, red: null },
		state: {
			columns: [...new Array(COLUMNS)].map(() =>
				[...new Array(ROWS)].map(() => ({
					owner: null,
				}))
			),
			nextTurn: 'red',
		},
	})

	return id
}

export const setMatchState = (matchId: string, state: Entities.GameState) => {
	console.debug(`updating ${matchId}`, state)

	const match = matches.get(matchId)

	if (!match) throw new Error(`matchId “${matchId}” does not exist`)

	matches.set(matchId, {
		...match,
		state,
	})
}

export const getMatchState = (matchId: string) => {
	console.debug(`updating ${matchId}`)

	const match = matches.get(matchId)

	if (!match) throw new Error(`matchId “${matchId}” does not exist`)

	return match.state
}
