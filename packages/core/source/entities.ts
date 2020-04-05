export namespace Entities {
	export type Player = {
		color: 'blue' | 'red'
	}

	export type Match = {
		players: {
			blue: string | null
			red: string | null
		}
		state: Entities.GameState
	}

	export type Dot = {
		owner: Player['color'] | null
	}

	export type GameState = {
		columns: Array<Array<Dot>>
		nextTurn: Player['color']
	}
}
