import http from 'http'
import socketIo from 'socket.io'
import { Messages } from '@connect-four/core'
import { createMatch, getMatchState, setMatchState } from './matches'
import { insertIntoColumn } from './logic'

const server = http.createServer()

const io = socketIo(server)

io.on('connection', (client) => {
	console.log('connect')

	const matchId = createMatch()

	client.emit(Messages.Types.STATE, getMatchState(matchId))

	client.on(Messages.Types.CHOOSE_COLUMN, (event: Messages.ChooseColumn) => {
		console.debug(Messages.Types.CHOOSE_COLUMN, event)
		setMatchState(matchId, insertIntoColumn(getMatchState(matchId), event))

		client.emit(Messages.Types.STATE, getMatchState(matchId))
	})

	client.on('disconnect', () => {
		console.log('disconnect')
	})
})

server.listen(3001)
