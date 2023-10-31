import React from 'react'
import styled from 'styled-components';

const TodoHeadBlock=styled.div`
background-color: #f5d682;
border: 1px solid red;
display: flex;
flex-direction : column;
padding : 15px 5px 5px ;

`

const Heading = styled.h1`
 display: flex;
 line-height : 35px;
 margin-bottom : 8px;
 font-size: 20px;
 font-weight: 700;
 font-color: #000000;
`;




function TodoHead () {
  return (
    <TodoHeadBlock>
        <Heading> 희진님의 이력서 </Heading>
    </TodoHeadBlock>
  );
}

export default TodoHead;