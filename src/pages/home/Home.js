import React from 'react'
import { useNavigate } from 'react-router-dom';

import TodoHead from '../../components/Home/TodoHead'
import TodoList from '../../components/Home/TodoList'
import AddButton from '../../components/Home/TodoCreate';
import Navbar from '../../components/common/navigation'

import {HomeLayout} from './style'

import {ReactComponent as ForwardIcon} from '../../assets/icon/ForwardIcon.svg'



const Home= ()=> {
  const Navigate = useNavigate();

  return (
    <>
    <HomeLayout>
    { /*헤더 부분*/}
    
        <TodoHead/> 
        
        

      

<Navbar/>
    </HomeLayout>
    </>
  )
}

export default Home