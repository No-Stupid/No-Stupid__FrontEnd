import React from 'react';
import styled from "styled-components";

const InputBox = (props) => {
  return (
    <InputContainer>
      <h3>
        {props.title}
      </h3>
      <InputLayout>
        <Input value={props.value} onChange={props.setValue}/>
      </InputLayout>
    </InputContainer>
  );
};


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const InputTitle = styled.h3`
`

export const InputLayout = styled.div`
  width: 100%;
  padding: 4px 4px;
  border: 1px solid #555;
  border-radius: 20px;
`

export const Input = styled.input`
  width: 100%;
  border: none;
  :focus {
    outline: none;
  }
`
export default InputBox;
