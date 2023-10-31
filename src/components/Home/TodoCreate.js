import React from 'react'
import styled from 'styled-components';

const StyledBtn= styled.button``;

const PlusCircleIcon = styled.div``;



//버튼 속성
const AddButton =({
  shape: 'normal',


})


//렌더링 하는 부분
const TodoCreate = () => {
  return (
    <>
    </>
  )
}

export default TodoCreate


//버튼 누르면 이력서 입력 페이지로 이동 그리고 이동하면서 버튼은 사라짐 









//컴포넌트 정의 : 즉 객체니까 여기에 속성들을 넣어줘야함 
const TodoAddButton =()=>({
  shape = 'normal', //모양 
 // disabled, // 버튼 비활성화 
  size = 'md', // 사이즈 SM, MD, LG
  color = 'primary',
  onClick, // 버튼 눌렀을때 
}) => {
  const dotShape = shape === 'dot' ? true : false


  //렌더링 부분 
  return dotShape ? (
      <StyledBtn shape={dotShape} size={size } onClick={onClick} color="none">
          <PlusCircleIcon shape="dot" />
      </StyledBtn>
  ) : (
      <StyledBtn shape={dotShape} size={size}  onClick={onClick} color={color}>
          <PlusCircleIcon shape="normal" />
      </StyledBtn>
  )
}
