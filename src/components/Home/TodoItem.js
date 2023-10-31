import React from 'react'
import styled, { css } from 'styled-components'; 




const Revise= styled.div`
display: flex;
align-items: center;
justify-content: center;
color: #dee2e6;
font-size: 24px;
cursor: pointer;
&:hover {
  color: #ff6b6b;
}
display: none;
`;


const TodoItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  max-width: 108px;
  height: 108px;
  padding: 22px;
  padding-radius: 20px;
  background-color: #D3D3D3;
      &:hover{
        ${Revise}{
           display: initial;
  }
}

`;


const Text= styled.div`
  font-size: 12px;


`;




function TodoItem() {
  return (
   <TodoItemBlock>
    <Text ></Text>
   
   </TodoItemBlock>
  );
}

export default TodoItem;