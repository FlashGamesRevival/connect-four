export namespace Entities {
	export type Player = {
		color: 'blue' | 'red'
	}

	export type Dot = {
		owner: Player['color'] | null
	}

	export type GameState = {
		nextTurn: Player['color']
		rows: Array<Array<Dot>>
	}
}
