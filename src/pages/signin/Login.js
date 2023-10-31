import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ReactComponent as LogoBox } from '../../assets/icon/no_stupid.svg'

import {
  SignInLayout,
  LoginArea,
  LoginWrapper,
  EmailInput,
  PasswordInput,
  LoginButton,
  PasswordWrapper,
  ErrorAlter,
  KakaoLoginButton
} from './style';


function Login() {
  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');


  const handleLogin = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // 로그인 성공 했을때
        sessionStorage.setItem('loggedIn', 'true');
        Navigate('/Home');
      } else {
        setLoginError('로그인을 실패했습니다');
      }
    } catch(error){
    
      setLoginError('오류가 발생하였습니다');
    }
  };

  return (
    <SignInLayout>
      <LogoBox />
      <LoginArea>
        <form onSubmit={handleSubmit(handleLogin)}>
          <LoginWrapper>
            <EmailInput
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              })}
              placeholder='E-mail'
            />
            {
              errors.email?.type === 'required' && (<ErrorAlter>반드시 이메일을 입력하여주세요</ErrorAlter>)
            }
            {
              errors.email?.type === 'pattern' && (<ErrorAlter>올바르게 입력해주세요</ErrorAlter>)
            }
          </LoginWrapper>

          <PasswordWrapper>
            <PasswordInput type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6
                },
              })}
              placeholder="password" />
            {
              errors.password?.type === 'required' && (<ErrorAlter>비밀번호를 입력해주세요</ErrorAlter>)
            }
            {
              errors.password?.type === 'minLength' && (<ErrorAlter>최소 6자 이상 입력해주세요</ErrorAlter>)
            }
          </PasswordWrapper>
          {loginError && <div>{loginError}</div>}
          <LoginButton type="submit" onClick={handleLogin}>LOGIN</LoginButton>
        </form>
        
           </LoginArea>
    </SignInLayout>
  );
}

export default Login;