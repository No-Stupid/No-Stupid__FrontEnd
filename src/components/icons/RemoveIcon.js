import React from 'react';
import styled from 'styled-components';
import {ReactComponent as RemoveIcon} from '../../assets/icon/trashcan.svg';


//삭제하는 함수
const RemoveButton = ({item, handleDelete,index})=>{
  return (
    <Wrapper onClick={handleDelete}>
      <Text>{item}</Text>
      <StyledTrashcanIcon></StyledTrashcanIcon>
      </Wrapper>
  );
};

const Wrapper= styled.button`

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








