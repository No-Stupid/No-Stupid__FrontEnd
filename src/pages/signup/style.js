import styled from 'styled-components';
import {Layout} from '../../components/common/Layout';

const SignUpLayout = styled(Layout)`
 padding: 20px 16px 56px 16px;
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

margin-top: 40px;
 font-family: 'Montserrat';
 font-style: normal;
 font-weight: 600;
 font-size: 25px;
 /* or 68px */
 letter-spacing: 0.01em;
 color: #000000;
 text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
margin-top: 30px;

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

 const PasswordCheckWrapper= styled.div`  
 
 width: 100%;
 height: 50px;
 margin: 30px 0;




 
 `;

 const PasswordCheckInput= styled.input`
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

 const SignUpButton= styled.button` 
 width: 100%;
 height: 45px;
 background: grey;
 border-radius: 40px; 
 cursor: pointer;
 font-size: 16px;
 font-weight: 600;
 margin-top:300px;
 

 `;

 const SignUpContainer= styled.div`
 
 margin-top: 60px;


 
 `;

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
  SignUpContainer,
  ErrorAlter





 }