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
  height: 40px;
  font-size: 15px;
  padding: 5px;
  border-radius: 8px;
 
}
input::placeholder{
  font-color: "#B5B5B5";
  font-size: 15px;

}

`;
const LogoBox = styled.div`
position: relative;
top: 40px;
left: 30px;
`;



const LoginArea = styled.div`
position: relative;
top: 360px;
border: 1px solid blue;

`;
const LoginWrapper = styled.div` 

border: 1px solid green;

`;
const EmailInput= styled.input `
display: block;
width: 100%;
height : 16px;

&::placeholder {
  color: ##949494;
  font-size : 16px;
}
&:focus {
  color: black;
}
`;

const ErrorAlter = styled.span`
display:inline-block;
font-size: 12px;
color :  #ff003e;
letter-spacing: -.5px;
vertical-align: middle;
`;
const PasswordWrapper= styled.div`
display : block;
width : 100%;
`;

const PasswordInput = styled.input`
display: block;
width: 100%;
height : 16px;
&::placeholder {
  color: ##949494;
  font-size : 16px;
}
&:focus {
  color: black;
}
`;
const LoginButton = styled.button`


`;

const KakaoLoginButton = styled.a`
  background-color: yellow;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 40px;
  cursor: pointer;
  border-radius: 5px;
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