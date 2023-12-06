
import React, { useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {ReactComponent as GoBackButton} from '../../assets/icon/GoBackButton.svg'

import {
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
  ErrorAlter,
  SignInWrapper

} from './style';


function SignUp() {
  const Navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors }, watch } = useForm();
  const [SignInError, setSignInError] = useState('');
  const PasswordRef = useRef(null);
  PasswordRef.current = watch('password');

  const storedId = localStorage.getItem('id');
  if (storedId) {
    Navigate('/home');
  }

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/member', {
        memberName: data.name,
        memberBirth: data.birth,
        memberPhone: data.phone,
        memberEmail: data.email,
        memberPwd: data.password,
      });

      console.log(response.data);

      Navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setSignInError('Error signing up. Please try again.');
    }
  };

  return (
    <SignUpLayout>
      <GoBackButton onClick={()=> Navigate('/login')}/>
      <SignUpTitle>회원가입</SignUpTitle>
      <form onSubmit={handleSubmit(handleSignUp)}>


        <NameWrapper>
          <NameInput type="text"
            placeholder="이름"
            {...register("name",
              {
                required: true,
                minLength: {
                  value: 1
                },
              })} />
          {
            errors.name?.type === 'required' && (<ErrorAlter>이름은 필수 정보입니다</ErrorAlter>)
          }
          {
            errors.name?.type === 'minLength' && (<ErrorAlter>최소 1글자 이상 입력해주세요</ErrorAlter>)
          }
        </NameWrapper>

        <BirthWrapper>
          <BirthInput
            type="date"
            {...register("birth", {
              required: true,
            })}
          />
          {errors.birth?.type === 'required' && <ErrorAlter>생년월일은 필수 정보입니다</ErrorAlter>}
        </BirthWrapper>

        <PhoneWrapper>
          <PhoneInput type="tel"
            control={control}
            placeholder="전화번호"
            {...register("phone",
              {
                required: true,
                pattern: /^(\d{3}-\d{4}-\d{4}|\d{10})$/,

              })} />
          {
            errors.phone?.type === 'pattern' && (<ErrorAlter>올바르게 입력해주세요</ErrorAlter>)
          }
        </PhoneWrapper>

        <EmailWrapper>
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

        </EmailWrapper>



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

        <PasswordCheckWrapper>

          <PasswordCheckInput
            type="password"
            {...register('passwordCheck', {
              required: true,
              validate: (value) => value === PasswordRef.current,
            })}
            placeholder='비밀번호 확인'
            minLength={6}
          />
          {
            errors.passwordCheck?.type === 'required' && (<ErrorAlter>비밀번호를 한 번 더 입력해주세요</ErrorAlter>)
          }
          {
            errors.passwordCheck?.type === 'validate' && (<ErrorAlter>비밀번호가 일치하지 않습니다</ErrorAlter>)
          }

        </PasswordCheckWrapper>
        {SignInError && <div>{SignInError}</div>}
        <SignUpButton type="submit" onClick={handleSubmit(handleSignUp)} >회원가입</SignUpButton>

        <SignInWrapper>회원이신가요? &nbsp; <Link to='/login' style={{ color:'red'}}>로그인</Link></SignInWrapper>
      </form>
    </SignUpLayout>
  )
}

export default SignUp;