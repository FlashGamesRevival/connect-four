import { Socket } from 'socket.io'
import { Messages } from '@connect-four/core'

const createEmitter = <T extends object>(type: Messages.Types) => (
	client: Socket,
	payload: T
) => client.emit(type, payload)

export const emitError = createEmitter<Messages.Error>(Messages.Types.ERROR)
export const emitJoinedMatch = createEmitter<Messages.JoinedMatch>(
	Messages.Types.JOINED_MATCH
)
export const emitState = createEmitter<Messages.State>(Messages.Types.STATE)
