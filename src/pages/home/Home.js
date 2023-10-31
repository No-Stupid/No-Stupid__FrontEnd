import React from 'react'
import { useNavigate } from 'react-router-dom';

import TodoHead from '../../components/Home/TodoHead'
import TodoList from '../../components/Home/TodoList'
import AddButton from '../../components/Home/TodoCreate';
import Navbar from '../../components/common/navigation'

import {HomeLayout, TodoContainer,TodoBox,TotalTitle,ListButton, AddButtonBox} from './style'

import {ReactComponent as ForwardIcon} from '../../assets/icon/ForwardIcon.svg'



const Home= ()=> {
  const Navigate = useNavigate();

  return (
    <>
    <HomeLayout>
    { /*헤더 부분*/}
    
        <TodoHead/> 
        
        

        { /*리스트 박스 부분*/}
        <main>
       <TodoContainer>
        <TodoBox>
          <TotalTitle>나의 총 이력서 </TotalTitle>
          <ListButton onClick={()=> Navigate('')}>
            <span>전체보기</span>
            <ForwardIcon/>
           
            </ListButton>
        </TodoBox>


        { /*리스트 부분*/}
        <div>
            <TodoList/>
            </div>
          </TodoContainer>
        </main>

        { /*추가버튼 구역*/}
        <AddButtonBox>
          <AddButton onClick={()=> Navigate('/')}/>
        </AddButtonBox>

        { /*네비바 구역*/}

<Navbar/>
    </HomeLayout>
    </>
  )
}

export default Home