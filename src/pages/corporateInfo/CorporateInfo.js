import React, {useEffect, useState} from 'react';
import {HomeLayout} from 'pages/home/style';
import styled from 'styled-components';
import GoBackIcon from 'components/icons/GobackIcon';
import Underscore from 'components/Underscore';
import InputBox, {InputContainer, InputLayout, InputTitle} from 'components/form/InputBox';
import TextAreaBox from 'components/form/TextAreaBox';
import RadioButton from 'components/form/RadioButton';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const infoInitData = {
  companyName: '',
  role: '',
  qualification: '',
  homePageUrl: '',
  salary: 0,
  companyTalent: '',
  applyCheck: false,
  documentCheck: null,
  interviewCheck: null,
  question: '',
  memo: '',
  pass: null,
  startDate: '',
  endDate: '',
  documentDate: '',
  passDate: '',
  interviewDate: '',
};

const CorporateInfo = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname, search } = location;
  const splitPathname = pathname.split('/');

  let modifyIndex = new URLSearchParams(search).get('id');
  // 캘린더에서 호출한경우 modifyIndex 변경
  if (props.modal && props.id) {
    modifyIndex = props.id
  }

  if (props.selectDates && props.selectDates.length > 0) {
    infoInitData.startDate = props.selectDates[0]
    infoInitData.endDate = props.selectDates[1]
  }

  const isModify = Boolean(modifyIndex);
  const companyId = parseInt(modifyIndex, 10);

  const [companies, setCompanies] = useState([]);
  const [info, setInfo] = useState(infoInitData);

  const isModalOpen = props.modal || false;
  const isEditing = props.isEditing || false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/applyList');
        setCompanies(response.data);
  
        if (isModify && companyId) {
          const modifiedInfo = response.data.find((item) => item.id === companyId);
          console.log(modifiedInfo);
          if (modifiedInfo) {
            setInfo(modifiedInfo);
  
            setInfo((prevInfo) => ({
              ...prevInfo,
              documentCheck: (modifiedInfo.documentCheck === 'true') ? true : (modifiedInfo.documentCheck === null ? null : false),
              interviewCheck: (modifiedInfo.interviewCheck === 'true') ? true : (modifiedInfo.interviewCheck === null ? null : false),
              pass: (modifiedInfo.pass === 'true') ? true : (modifiedInfo.pass === null ? null : false),
              applyCheck: modifiedInfo.applyCheck === 'true',
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [isModify]);      

  const handleSubmission = async () => {
    try {
      const postData = {
        companyName: info.companyName,
        role: info.role,
        qualification: info.qualification,
        homePageUrl: info.homePageUrl,
        salary: info.salary,
        applyCheck: info.applyCheck,
        question: info.question,
        documentCheck: info.documentCheck,
        interviewCheck: info.interviewCheck,
        companyTalent: info.companyTalent,
        member: info.member,
        memo: info.memo,
        pass: info.pass,
        startDate: info.startDate,
        endDate: info.endDate,
        documentDate: info.documentDate,
        interviewDate: info.interviewDate,
        passDate: info.passDate,
      };
  
      let userId = localStorage.getItem('id');

      if (isModify) {
        console.log(postData);
        await axios.put(`http://localhost:8080/api/applyInfo/edit/${modifyIndex}`, postData);
      } else {
        await axios.post(`http://localhost:8080/api/applyInfo?userId=${userId}`, postData);
      }

      if (isModalOpen) {
        props.closeModal()
        props.fetchData()
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };   

  return (
    <HomeLayout className={`${isModalOpen ? 'padding-zero' : ''}`}>
      <Container>
        {!isModalOpen && <div onClick={() => navigate(-1)}>
          <GoBackIcon size={20} />
        </div>
        }
        {isModalOpen && <button className={'close-btn'} onClick={props.closeModal}>
          x
        </button>}
        <Title>기업 정보</Title>
        <Underscore />
        <Main>
          <InputBox title={'기업명'} value={info.companyName} setValue={e => setInfo({ ...info, companyName: e.target.value })} />
          <InputBox title={'직무'} value={info.role} setValue={e => setInfo({ ...info, role: e.target.value })} />
          <InputBox title={'자격요건'} value={info.qualification} setValue={e => setInfo({ ...info, qualification: e.target.value })} />
          <InputContainer>
            <InputTitle>
              지원 여부
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton
                      isOn={info.applyCheck}
                      title={'지원완료'}
                      setIsOn={() => setInfo({ ...info, applyCheck: true })}
                    />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton
                      isOn={!info.applyCheck}
                      title={'지원예정'}
                      setIsOn={() => setInfo({ ...info, applyCheck: false })}
                    />
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <InputBox title={'기업 홈페이지'} value={info.homePageUrl} setValue={e => setInfo({ ...info, homePageUrl: e.target.value })} />
          <InputBox title={'연봉'} value={info.salary} setValue={e => setInfo({ ...info, salary: e.target.value })} />
          <TextAreaBox title={'기업 인재상'} value={info.companyTalent} setValue={e => setInfo({ ...info, companyTalent: e.target.value })} />
          <InputContainer>
            <InputTitle>
              서류
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton isOn={info.documentCheck == null} title={'미발표'} setIsOn={() => setInfo({ ...info, documentCheck: null })} />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={info.documentCheck == true} title={'합격'} setIsOn={() => setInfo({ ...info, documentCheck: true })} />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={info.documentCheck == false} title={'불합격'} setIsOn={() => setInfo({ ...info, documentCheck: false })} />
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <InputBox type={'date'} title={'서류 날짜'} value={info.documentDate} setValue={e => setInfo({ ...info, documentDate: e.target.value })} />
          <InputContainer>
            <InputTitle>
              면접
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                    <RadioButton isOn={info.interviewCheck == null} title={'미발표'} setIsOn={() => setInfo({ ...info, interviewCheck: null })} />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={info.interviewCheck == true} title={'합격'} setIsOn={() => setInfo({ ...info, interviewCheck: true })} />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton isOn={info.interviewCheck == false} title={'불합격'} setIsOn={() => setInfo({ ...info, interviewCheck: false })} />
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <InputBox type={'date'} title={'면접 날짜'} value={info.interviewDate} setValue={e => setInfo({ ...info, interviewDate: e.target.value })} />
          <TextAreaBox title={'면접 질문'} value={info.question} setValue={e => setInfo({ ...info, question: e.target.value })} />
          <InputContainer>
            <InputTitle>
              합격 여부
            </InputTitle>
            <DeadLineBox>
              <InputLayout>
                <BoxRadio>
                  <InputDiv>
                  <RadioButton
                      isOn={info.pass == null}
                      title={'미발표'}
                      setIsOn={() => setInfo({ ...info, pass: null })}
                  />
                </InputDiv>
                  <InputDiv>
                    <RadioButton
                      isOn={info.pass == true}
                      title={'합격'}
                      setIsOn={() => setInfo({ ...info, pass: true })}
                    />
                  </InputDiv>
                  <InputDiv>
                    <RadioButton
                      isOn={info.pass == false}
                      title={'불합격'}
                      setIsOn={() => setInfo({ ...info, pass: false })}
                    />
                  </InputDiv>
                </BoxRadio>
              </InputLayout>
            </DeadLineBox>
          </InputContainer>
          <InputBox type={'date'} title={'합격 날짜'} value={info.passDate} setValue={e => setInfo({ ...info, passDate: e.target.value })} />
          <InputBox type={'date'} title={'시작 날짜'} value={info.startDate} setValue={e => setInfo({ ...info, startDate: e.target.value })} />
          <InputBox type={'date'} title={'종료 날짜'} value={info.endDate} setValue={e => setInfo({ ...info, endDate: e.target.value })} />

          <TextAreaBox title={'회고란'} value={info.memo} setValue={e => setInfo({ ...info, memo: e.target.value })} />
        </Main>
      </Container>

      <ButtonBox>
        <SubmitButton onClick={handleSubmission}>{isModify ? '수정' : '완료'}</SubmitButton>
        {isEditing && <SubmitButton onClick={props.handleDelete}>{isModify ? '삭제' : '완료'}</SubmitButton>}
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
  width: 25%;
  padding: 10px 20px;
  border-radius: 12px;
  margin-right: 10px;
  margin-bottom: 50px;
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
