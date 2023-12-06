import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ReactComponent as LogoBox } from 'assets/icon/no_stupid.svg';

import axios from 'axios';

import {
  SignInLayout,
  LoginArea,
  LoginWrapper,
  EmailInput,
  PasswordInput,
  LoginButton,
  PasswordWrapper,
  ErrorAlter,
  SignUpWrapper,
  AnimatedSpan
 
} from './style';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');

  const storedId = localStorage.getItem('id');
  if (storedId) {
    navigate('/home');
  }

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/member/login', {
        memberEmail: data.email,
        memberPwd: data.password,
      });

      const user = response.data;

      if (user !== null) {
        alert("로그인이 완료되었습니다.")

        localStorage.setItem('id', user.id);
        localStorage.setItem('name', user.memberName);
        localStorage.setItem('pw', user.memberPwd);
        localStorage.setItem('birth', user.memberBirth);
        localStorage.setItem('phone', user.memberPhone);
        localStorage.setItem('email', user.memberEmail);

        navigate('/home');
      }
    } catch (error) {
      setLoginError('이메일과 비밀번호를 다시 확인해주세요.');
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
          <LoginButton type="submit">LOGIN</LoginButton>
        </form>

        <br />
        <SignUpWrapper>처음이신가요? &nbsp;  <Link to='/signup' >
      
       <AnimatedSpan delay={0.1}>회</AnimatedSpan>
    <AnimatedSpan delay={0.2}>원</AnimatedSpan>
    <AnimatedSpan delay={0.3}>가</AnimatedSpan>
    <AnimatedSpan delay={0.4}>입</AnimatedSpan>
      
          
          </Link></SignUpWrapper>
      </LoginArea>
    </SignInLayout>
  );
}

export default Login;
