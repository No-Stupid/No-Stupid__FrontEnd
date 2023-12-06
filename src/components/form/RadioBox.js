import React from 'react';
import {Input, InputContainer, InputLayout, InputTitle} from "components/form/InputBox";

import {DeadLineBox, InputDiv} from "pages/corporateInfo/CorporateInfo";

const RadioBox = (props) => {

  return (
    <InputContainer>
      <InputTitle>
        {props.title}
      </InputTitle>

      <DeadLineBox>
        <InputLayout>
          <InputDiv>
            월
            <Input />
          </InputDiv>
        </InputLayout>
        <InputLayout>
          <InputDiv>
            일
            <Input />
          </InputDiv>
        </InputLayout>
      </DeadLineBox>
    </InputContainer>
  );
};

export default RadioBox;
