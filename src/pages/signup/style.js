import styled from 'styled-components';
import {Layout} from '../../components/common/Layout';

const SignUpLayout = styled(Layout)`
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


 const SignUpTitle= styled.h1`
 `;

 const ErrorAlter= styled.span`
 display:inline-block;
 font-size: 12px;
 font-weight: bold;
 color :  #ff003e;
 letter-spacing: -.5px;
 vertical-align: middle;`;

 const NameWrapper= styled.div`
 width: 100%;
height: 50px;
margin: 30px 0;
border: 1px solid green;
`;

 const NameInput= styled.input`
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

 const BirthWrapper= styled.div` 
 width: 100%;
 height: 50px;
 margin: 30px 0;
 border: 1px solid green;
 `;

 const BirthInput= styled.input`
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

 const PhoneWrapper= styled.div` 
 width: 100%;
 height: 50px;
 margin: 30px 0;
 border: 1px solid green;
 
 `;

 const PhoneInput= styled.input`
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


 const EmailWrapper= styled.div` 
 width: 100%;
height: 50px;
margin: 30px 0;
border: 1px solid green;
 `;

 const EmailInput= styled.input`
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


 const PasswordWrapper= styled.div`  
 width: 100%;
height: 50px;
margin: 30px 0;
border: 1px solid green;
`;

 const PasswordInput= styled.input`
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

 const PasswordCheckWrapper= styled.div`  `;

 const PasswordCheckInput= styled.input``;

 const SignUpButton= styled.button` `;


 export{
  SignUpLayout,
  SignUpTitle,
  NameWrapper,
  NameInput,
  BirthWrapper,
  BirthInput,
  PhoneWrapper,
  PhoneInput,
  EmailWrapper,
  EmailInput,
  PasswordWrapper,
  PasswordInput,
  PasswordCheckWrapper,
  PasswordCheckInput,
  SignUpButton,
  ErrorAlter





 }