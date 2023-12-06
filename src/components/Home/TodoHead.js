import React from 'react'
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
  padding : 15px 5px;
`

const Heading = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  font-color: #000000;
`;

function TodoHead() {
  const storedName = localStorage.getItem('name');

  return (
    <TodoHeadBlock>
      <Heading>{storedName}님의 이력서</Heading>
    </TodoHeadBlock>
  );
}

export default TodoHead;