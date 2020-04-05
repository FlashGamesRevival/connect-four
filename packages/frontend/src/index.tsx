import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MatchView } from './views/match/View'
import { SocketIOProvider } from 'use-socketio'

ReactDOM.render(
	<React.StrictMode>
		<SocketIOProvider url={window.location.origin}>
			<MatchView />
		</SocketIOProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
