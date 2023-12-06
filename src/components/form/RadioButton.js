import React from 'react';
import styled from "styled-components";

const RadioButton = (props) => {
  return (
    <RadioButtonContainer onClick={props.setIsOn}>
    <RadioLayout>
      {props.isOn  && <Radio />}
    </RadioLayout>
      <Title>
        {props.title}
      </Title>
    </RadioButtonContainer>
  );
};

const RadioButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: white;
`

const Title = styled.div`

`

const RadioLayout = styled.div`
  border-radius: 18px;
  width: 18px;
  height: 18px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Radio = styled.div`
  border-radius: 10px;
  width: 10px;
  height: 10px;
  background-color: black;
`

export default RadioButton;
