import styled from 'styled-components'
import {Layout} from '../../components/common/Layout'

const SignInLayout = styled(Layout)`
 padding: 20px 16px 56px 16px;
 border: 1px solid red;
 display:flex;
 flex-direction: column;
 jusitfy-content: space-between;

input{
  width: 100%;
  height: 100%;
  font-size: 15px;
  padding: 5px;
  border-radius: 40px;
 
}
input::placeholder{
  font-color: "#B5B5B5";
  font-size: 15px;

}

`;
const LogoBox = styled.div`
  width: 50px;
  height:40px;
  
`;



const LoginArea = styled.div`
position: relative;
top: 120px;
border: 1px solid blue;
padding : 15px 20px;

`;
const LoginWrapper = styled.div` 
width: 100%;
height: 50px;
margin: 30px 0;
border: 1px solid green;

`;
const EmailInput= styled.input `
display: block;
width: 100%;
height: 100%;

&::placeholder {
  color: ##949494;
  font-size : 16px;
}
&:focus {
  color: black;
}
`;

//에러
const ErrorAlter = styled.span`
display:inline-block;
font-size: 12px;
font-weight: bold;
color :  #ff003e;
letter-spacing: -.5px;
vertical-align: middle;
`;



const PasswordWrapper= styled.div`
width: 100%;
height: 50px;
margin: 30px 0;
border: 1px solid green;
`;

const PasswordInput = styled.input`
display: block;
width: 100%;
height : 100%;
&::placeholder {
  color: ##949494;
  font-size : 16px;
}
&:focus {
  color: black;
}
`;
const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  background: grey;
  border-radius: 40px; 
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

const KakaoLoginButton= styled.button`





`;


export{
  SignInLayout,
  LogoBox,
  LoginArea,
  LoginWrapper,
  EmailInput,
  ErrorAlter,
  PasswordWrapper,
  PasswordInput,
  LoginButton,
  KakaoLoginButton
}