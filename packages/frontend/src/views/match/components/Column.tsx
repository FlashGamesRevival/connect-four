import styled from 'styled-components'
import { Dot } from './Dot'

const Column = styled.div`
	display: flex;
	flex-direction: column;

	:hover {
		${Dot} {
			transform: scale(1.25);
		}
	}
`

export { Column }
