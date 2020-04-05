export namespace Messages {
	export enum Types {
		CHOOSE_COLUMN = 'CHOOSE_COLUMN',
		STATE = 'STATE',
	}

	export type ChooseColumn = {
		column: number
	}
}
