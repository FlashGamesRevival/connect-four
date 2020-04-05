import { useMatchStoreContext } from '../views/match/hooks'
import React from 'react'

import { Dot } from './Dot'
import { DotWrapper } from './DotWrapper'
import { Column } from './Column'

const Board = () => {
	const { sendChooseColumn, state } = useMatchStoreContext()

	return (
		<main>
			{state.columns.map((column, columnIndex) => (
				<Column
					key={columnIndex}
					onClick={() => sendChooseColumn({ column: columnIndex })}
				>
					{column.map((dot, dotIndex) => (
						<DotWrapper key={dotIndex}>
							<Dot {...dot} hoveredBy={null} />
						</DotWrapper>
					))}
				</Column>
			))}
		</main>
	)
}

export { Board }
