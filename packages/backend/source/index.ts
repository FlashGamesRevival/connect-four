import http from 'http'
import socketIo from 'socket.io'

const server = http.createServer()

const io = socketIo(server)

const fakeRow = () =>
	[...new Array(8)].map(() => ({
		owner: Math.random() > 0.667 ? 'red' : Math.random() > 0.5 ? 'blue' : null,
	}))

const fakeRows = () => [...new Array(8)].map(fakeRow)

const emitState = (client: socketIo.Socket) => {
	console.debug('sending state')

	client.emit('state', {
		nextTurn: 'red',
		rows: fakeRows(),
	})
}

io.on('connection', (client) => {
	console.log('connect')

	const interval = setInterval(() => {
		emitState(client)
	}, 1000)

	client.on('event', (data) => {
		console.log('event', data)
	})
	client.on('disconnect', () => {
		console.log('disconnect')
		clearInterval(interval)
	})
})

server.listen(3001)
