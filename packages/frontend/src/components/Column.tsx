import styled from 'styled-components'
import { Dot } from './Dot'

const Column = styled.div`
	display: flex;
	flex-direction: column;

	:hover {
		background-color: gray;

		${Dot} {
			transform: scale(1.2);
		}
	}
`

export { Column }
