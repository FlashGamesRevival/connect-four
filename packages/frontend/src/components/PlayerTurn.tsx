import React from 'react'
import { useMatchStoreContext } from '../views/match/hooks'

const PlayerTurn = () => {
	const { state } = useMatchStoreContext()

	return <div>{state.nextTurn}</div>
}

export { PlayerTurn }
