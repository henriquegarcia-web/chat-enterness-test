import styled from 'styled-components'
import Fonts from '@/utils/styles/fonts'

interface ILogo {
  size?: number
}

export const Logo = styled.h1<ILogo>`
  display: flex;
  align-items: center;
  column-gap: 5px;

  font-size: ${({ size }) => (size ? `${size}px` : Fonts.logoDefault)};
  font-weight: 200;

  b {
    font-weight: 500;
  }

  svg {
    margin-bottom: 2px;
    font-size: ${({ size }) =>
      size ? `calc(${size}px + 6px)` : `calc(${Fonts.logoDefault} + 6px)`};
  }
`
