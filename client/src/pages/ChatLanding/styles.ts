import styled from 'styled-components'
import { Subtitle, Window } from '@/utils/styles/globals'

export const ChatLandingPage = styled(Window)`
  justify-content: center;
  align-items: center;
`

export const ChatLandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  max-width: 480px;
  padding: 20px;
`

export const ChatLandingContainerLegend = styled(Subtitle)`
  margin-bottom: 20px;
  text-align: center;
`
