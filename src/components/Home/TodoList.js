import React from 'react'
import styled from 'styled-components';
import TodoItem from './TodoItem';


const Container= styled.div`
flex: 1;
padding : 15px 20px;
padding-bottom: 45rem;
overflow-y: auto;
background : grey;


`;




const TodoList = () => {



  
  return (
    <Container>
     <TodoItem text="프로젝트 생성하기"  />
      <TodoItem text="컴포넌트 스타일링 하기"  />
      <TodoItem text="Context 만들기"  />
      <TodoItem text="기능 구현하기"  />
      
    </Container>
  )
}

export default TodoList