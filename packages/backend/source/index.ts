import http from 'http'
import socketIo, { Socket } from 'socket.io'
import { Messages } from '@connect-four/core'
import { createMatch, getMatchState, setMatchState, hasMatch } from './matches'
import { insertIntoColumn } from './logic'
import { emitState, emitError, emitJoinedMatch } from './emit'

const server = http.createServer()

const io = socketIo(server)

const kick = (client: Socket) => {
	emitError(client, { message: 'Unknown Match' })
	client.disconnect()
	console.warn('kicked client')
}

io.on('connection', (client) => {
	console.log('connect')

	let matchId: null | string = null

	client.on(Messages.Types.JOIN_MATCH, (event: Messages.JoinMatch) => {
		console.debug(Messages.Types.JOIN_MATCH, event)

		if (event.matchId !== null)
			if (!hasMatch(event.matchId)) {
				emitError(client, { message: 'Invalid Match Id' })
				client.disconnect()
				return
			}

		matchId = event.matchId ?? createMatch()

		emitJoinedMatch(client, {
			matchId,
			player: {
				color: Math.random() > 0.5 ? 'red' : 'blue',
			},
		})
		emitState(client, { state: getMatchState(matchId) })
	})

	client.on(Messages.Types.CHOOSE_COLUMN, (event: Messages.ChooseColumn) => {
		if (matchId === null) return kick(client)

		console.debug(Messages.Types.CHOOSE_COLUMN, event)

		const nextMatchState = insertIntoColumn(getMatchState(matchId), event)

		if (nextMatchState === null) {
			emitError(client, { message: 'Invalid Move' })
		} else {
			setMatchState(matchId, nextMatchState)
			emitState(client, { state: getMatchState(matchId) })
		}
	})

	client.on('disconnect', () => {
		console.log('disconnect')
	})
})

server.listen(3001)
