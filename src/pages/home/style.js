import styled from 'styled-components'
import { Layout } from '../../components/common/Layout'

const HomeLayout = styled(Layout)`
 padding : 0 20px 80px;
 display: flex;
 flex-direction : column;
 width: 375px;
 margin: 0 auto;
`

const TodoContainer = styled.div`
 padding-bottom: 4rem;
  border: 1px solid blue;
 
`
const TodoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  

`
const TotalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  line-height : 24px;

`
const ListButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;

`

const AddButtonBox = styled.div`


`
export {
  HomeLayout,
  TodoContainer,
  TodoBox,
  TotalTitle,
  ListButton,
  AddButtonBox

}