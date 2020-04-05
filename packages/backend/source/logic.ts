import { Entities, Messages } from '@connect-four/core'

export const insertIntoColumn = (
	state: Entities.GameState,
	event: Messages.ChooseColumn
): Entities.GameState => {
	let insertIndex: number | null = null

	const column = state.columns[event.column]

	for (let dotIndex = column.length - 1; dotIndex >= 0; dotIndex--)
		if (column[dotIndex].owner === null) {
			insertIndex = dotIndex
			break
		}

	if (insertIndex === null) throw new Error('invalid move')

	console.debug('inserting into index', insertIndex)

	return {
		...state,
		columns: state.columns.map((column, columnIndex) =>
			columnIndex === event.column
				? column.map((dot, dotIndex) =>
						dotIndex === insertIndex
							? {
									...dot,
									owner: 'red',
							  }
							: dot
				  )
				: column
		),
	}
}
