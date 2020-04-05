import { Entities } from './entities'

export namespace Messages {
	export enum Types {
		CHOOSE_COLUMN = 'CHOOSE_COLUMN',
		ERROR = 'ERROR',
		JOIN_MATCH = 'JOIN_MATCH',
		JOINED_MATCH = 'JOINED_MATCH',
		STATE = 'STATE',
	}

	export type ChooseColumn = {
		column: number
	}

	export type Error = {
		message: string
	}

	export type JoinMatch = {
		matchId: string | null
	}

	export type JoinedMatch = {
		matchId: string
		player: Entities.Player
	}

	export type State = {
		state: Entities.GameState
	}
}
