import React from 'react';
import {HomeLayout} from "pages/home/style";
import styled from "styled-components";
import {Button, infoAtom} from "pages/home/Home";
import GoBackIcon from "components/icons/GobackIcon";
import Underscore from "components/Underscore";
import InputBox, {InputContainer, InputLayout,  InputTitle} from "components/form/InputBox";
import TextAreaBox from "components/form/TextAreaBox";
import RadioButton from "components/form/RadioButton";
import {useNavigate, useLocation} from "react-router-dom";
import {useAtom} from "jotai";

const infoInitData = {
  name: '',
  job: '',
  qualification: '',
  deadline: {month: 0, day: 0},
  homepage: '',
  salary: 0,
  ideal: '',
  apply: false,
  document: false,
  interview: false,
  questions: '',
  retrospect: '',
  pass: false
}

const CorporateInfo = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const {pathname} = location
  const splitPathname = pathname.split('/')
  const isModify = splitPathname[1] === 'modifyInfo'
  const modifyIndex = splitPathname[2]
  const [companies, setCompanies] = useAtom(infoAtom)
  const [info, setInfo] = React.useState(isModify ? companies[modifyIndex] : infoInitData);

  return (
    <HomeLayout>
      <Container>
        <Button onClick={() => navigate(-1)}>
          <GoBackIcon size={20}/>
        </Button>
        <Title>기업 정보</Title>
        <Underscore />
        <Main>
          <InputBox title={'기업명'} value={info.name} setValue={e => setInfo({...info, name: e.target.value})}/>
          <InputBox title={'직무'} value={info.job} setValue={e => setInfo({...info, job: e.target.value})}/>
          <InputBox title={'자격요건'} value={info.qualification} setValue={e => setInfo({...info, qualification: e.target.value})}/>
          <InputContainer>
            <InputTitle>
              지원 여부
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton isOn={!info.apply} title={'지원 예정'} setIsOn={() => setInfo({...info, apply: false})}/>
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={info.apply} title={'지원 완료'} setIsOn={() => setInfo({...info, apply: true})}/>
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <InputBox title={'기업 홈페이지'} value={info.homepage} setValue={e => setInfo({...info, homepage: e.target.value})}/>
          <InputBox title={'연봉'} value={info.salary} setValue={e => setInfo({...info, salary: e.target.value})}/>
          <TextAreaBox title={'기업 인재상'} value={info.ideal} setValue={e => setInfo({...info, ideal: e.target.value})}/>
          <InputContainer>
            <InputTitle>
              서류
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton isOn={info.document} title={'합격'} setIsOn={() => setInfo({...info, document: true})} />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={!info.document} title={'불합격'} setIsOn={() => setInfo({...info, document: false})}/>
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <InputContainer>
            <InputTitle>
              면접
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton isOn={info.interview} title={'합격'} setIsOn={() => setInfo({...info, interview: true})}/>
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={!info.interview} title={'불합격'} setIsOn={() => setInfo({...info, interview: false})}/>
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <TextAreaBox title={'면접 질문'} value={info.questions} setValue={e => setInfo({...info, questions: e.target.value})}/>
          <InputContainer>
            <InputTitle>
              합격 여부
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton isOn={info.pass} title={'합격'} setIsOn={() => setInfo({...info, pass: true})}/>
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={!info.pass} title={'불합격'} setIsOn={() => setInfo({...info, pass: false})}/>
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <TextAreaBox title={'회고란'} value={info.retrospect} setValue={e => setInfo({...info, retrospect: e.target.value})}/>
        </Main>
      </Container>

      <ButtonBox>
        <SubmitButton onClick={() => {
          if (isModify) {
            companies[modifyIndex] = info
            setCompanies([...companies])
          } else {
            setCompanies([...companies, info])
          }
          navigate(-1)
        }}>완료</SubmitButton>
      </ButtonBox>
    </HomeLayout>
  );
};

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`
const SubmitButton = styled.button.attrs(props => ({
  type: 'submit'
}))`
  width: 50%;
  padding: 10px 20px;
  border-radius: 12px;
`

const BoxRadio = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 6px 0;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`

export const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  padding: 20px;
`

const TextInput = styled.input`
  
`

export const DeadLineBox = styled.div`
  display: flex;
  gap: 8px;
`

const Title = styled.h1`
  font-size: 20px;
  padding: 14px 0;
`

export default CorporateInfo;
