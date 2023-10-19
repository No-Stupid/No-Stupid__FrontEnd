import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React,{useState} from 'react';
import {ReactComponent as LogoBox} from '../../assets/icon/no_stupid.svg'

import {SignInLayout,LoginArea,
  LoginWrapper,EmailInput,PasswordInput,LoginButton,PasswordWrapper,ErrorAlter,KakaoLoginButton} from './style';
import { KAKAO_AUTH_URL } from '../../api/KakaoLogin';






function Login(){
  //const Navigate= useNavigate();
 const {register, handleSubmit ,formState:{errors}}=useForm();

const [result,setResult]=useState('');



const onSubmit =(data)=>{
    setResult(JSON.stringify(data));
}

  return (
    <SignInLayout>
    
    <LogoBox/>
    <LoginArea>
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoginWrapper>
     <EmailInput 
        type="email"
     {...register("email",{
      required:true,
      pattern : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
     })} placeholder='E-mail'/>
     {
      errors.email?.type ==='required' && (<ErrorAlter>반드시 이메일을 입력하여주세요</ErrorAlter>)
     }
     {
      errors.email?.type ==='pattern' && (<ErrorAlter>올바르게 입력해주세요</ErrorAlter>)
     }
</LoginWrapper>

<PasswordWrapper>
     <PasswordInput type ="password" 
     {...register("password",{
      required : true,
      minLength: {
        value: 6
       
      },
     })} placeholder="password"/> 
     {
      errors.password?.type==='required' && (<ErrorAlter>비밀번호를 입력해주세요</ErrorAlter>)
     }
     {
      errors.password?.type==='minLength' && (<ErrorAlter>최소 6자 이상 입력해주세요</ErrorAlter>)}
    </PasswordWrapper>
     <LoginButton type="submit">LOGIN</LoginButton>
      
    </form>
 <KakaoLoginButton href={ KAKAO_AUTH_URL }>카카오로 로그인</KakaoLoginButton>

    </LoginArea>
   
    </SignInLayout>


  
  )
};

export default Login;
