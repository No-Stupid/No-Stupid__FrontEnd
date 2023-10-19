import styled from 'styled-components';
import {Layout} from '../../components/common/Layout'


//body{
 // position: relative;
//}

const SingUpLayout= styled(Layout)` 
position: relative;
  padding: 1%;
  width: 375px;
  height: 812px;
  background: #FFFFFF;
  margin: 0 auto;
`;


const TitleWrap = styled.div`
  position: absolute;
  left: 26px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  /* or 68px */
  letter-spacing: 0.01em;
  color: #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;



const Next= styled.p`

  /* NEXT */


  /* button */
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  color: #FFFFFF;

  cursor: pointer;

  
`;


const NextButton= styled.button`
  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 726px;
  
  outline: none;
border: none;
  background: rgba(250, 83, 44, 0.85);
  border-radius: 12px;

  &:disabled {
    background-color: #F79E89;
    color: white;

`;





const ErrorMessage3 = styled.span`
  position: absolute;
  width: 100%;
  height: 20px;
  left: 31px;
  top: 646px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20%;
  /* or 20px */
  letter-spacing: 0.01em;

  color: #F60000;
`;


const ErrorMessage2= styled.span`
  position: absolute;
  width: 100%px;
  height: 20px;
  left: 31px;
  top: 552px;
  
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20%;
  /* or 20px */
  letter-spacing: 0.01em;
  
  color: #F60000;
  
`;

const ErrorMessage1= styled.span`
  position: absolute;
  width: 100%;
  height: 20px;
  left: 31px;
  top: 457px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20%;
  /* or 20px */
  letter-spacing: 0.01em;

  color: #F60000;

`;

const RpwInput= styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 327px;
  height: 48px;
  left: 24px;
  top: 591px;

  border: 1px solid rgba(39, 39, 39, 0.5);
  border-radius: 12px;

`;



const NameInput= styeld.div`
  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 156px;

  box-sizing: border-box;
  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 156px;
  border: 1px solid rgba(39, 39, 39, 0.5);
  border-radius: 12px;
`;


const Names = styled.input`

  outline: none;
border: none;
  margin-left: 3%;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 250%;
  /* or 27px */
  letter-spacing: 0.01em;
  color: rgba(0, 0, 0, 0.9);

`;

const birthInput= styled.div`
  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 238px;

  box-sizing: border-box;

  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 238px;

  border: 1px solid rgba(39, 39, 39, 0.5);
  border-radius: 12px;

  

`;

const Birth= styled.input`
  outline: none;
border: none;
  margin-left: 3%;
  
  /* body 1 */
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 250%;
  /* or 27px */
  letter-spacing: 0.01em;
  
  color: rgba(0, 0, 0, 0.9);


`;

const NumInput= styled.div`
  position: absolute;
  width: 114px;
  height: 27px;
  left: 42px;
  top: 330px;
  
  box-sizing: border-box;
  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 320px;
  border: 1px solid rgba(39, 39, 39, 0.5);
  border-radius: 12px;
  


`;
const Num= styled.input`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 250%;
  /* or 27px */
  letter-spacing: 0.01em;
  
  color: rgba(0, 0, 0, 0.9);

  outline: none;
border: none;
  margin-left: 3%;

`;

const MailInput= styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 327px;
  height: 48px;
  left: 26px;
  top: 402px;
  border: 1px solid rgba(39, 39, 39, 0.5);
  border-radius: 12px;
`;



const Mail= styled.input`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 250%;
  /* or 27px */
  letter-spacing: 0.01em;
  color: rgba(0, 0, 0, 0.9);

  outline: none;
border: none;
  margin-left: 3%;
`;


const PwInput= styled.div`
      
  box-sizing: border-box;

  position: absolute;
  width: 327px;
  height: 48px;
  left: 22px;
  top: 495px;
  
  border: 1px solid rgba(39, 39, 39, 0.5);
  border-radius: 12px;
  


`;



const Pw= styled.input`
  outline: none;
border: none;
  margin-left: 3%;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 250%;
  /* or 27px */
  letter-spacing: 0.01em;

  color: rgba(39, 39, 39, 0.5);


`;




export{
  SingUpLayout,
  TitleWrap,
  Next,
  NextButton,
  ErrorMessage3,
  ErrorMessage2,
  ErrorMessage1,
  RpwInput,
  Rpw,
  NameInput,
  Names,
  birthInput,
  Birth,
  NumInput,
  Num,
  MailInput,
  Mail,
  PwInput,
  Pw,

}