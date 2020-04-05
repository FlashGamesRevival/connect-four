import React from 'react'
import { useMatchStoreContext } from '../hooks'
import styled from 'styled-components'

const PlayerStyle = styled.div`
	margin: 20px auto 0 auto;
`

const PlayerTurn = () => {
	const { state } = useMatchStoreContext()
	const displayText = `It's ${state.nextTurn}'s turn!`

	return <PlayerStyle>{displayText}</PlayerStyle>
}

export { PlayerTurn }
