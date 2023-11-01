import React from 'react'
import styled from 'styled-components';

const TodoHeadBlock=styled.div`
background-color: #f5d682;
border: 1px solid red;
display: flex;
flex-direction : column;
padding : 50px 20px 20px ;

`

const Heading = styled.h1`
 display: flex;
 line-height : 35px;
 margin-bottom : 25px;
 font-size: 26px;
 font-weight: 700;
 font-color: #000000;
`;


const SubHeading= styled.p`
   line-height: 35px;
   font-size: 26px;
   font-weight: 700;
   font-color : #000000;
`;




function TodoHead () {
  return (
    <TodoHeadBlock>
        <Heading> 000님의  </Heading>
        <SubHeading>기록하는 이력서 </SubHeading>
    </TodoHeadBlock>
  );
}

export default TodoHead;