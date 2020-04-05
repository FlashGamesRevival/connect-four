import styled from 'styled-components'
import { Entities } from '@connect-four/core'
import { Colors } from '../theme'

type DotType = Entities.Dot & { hoveredBy: Entities.Player['color'] | null }
const Dot = styled.div<DotType>`
	height: ${({ owner, hoveredBy }) => {
		if (owner) return '50px'
		else if (hoveredBy) return '30px'
		else return '20px'
	}};
	width: ${({ owner, hoveredBy }) => {
		if (owner) return '50px'
		else if (hoveredBy) return '30px'
		else return '20px'
	}};
	background-color: ${({ hoveredBy, owner }) => {
		console.log(hoveredBy, owner)
		if (owner) return Colors[owner]
		else if (hoveredBy)
			return Colors[`${hoveredBy}Light` as 'blueLight' | 'redLight']
		else return Colors['gray']
	}};
	border-radius: 50%;
`

export { Dot }
