
import React, {useState, useRef  } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

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
  SignUpContainer,
  ErrorAlter

}from './style';

import {ReactComponent as GoBackButton} from '../../assets/icon/GoBackButton.svg'
import axios from '../../api/axios';


function SignUp(){
  const Navigate = useNavigate();
  const REGISTER_URL= './signup';
  
  const {register,control, handleSubmit, formState: {errors},watch}=useForm();
  const [SignInError, setSignInError] = useState('');

  const PasswordRef= useRef(null);
  PasswordRef.current= watch('password');

  const onSubmit = (data)=>{
    console.log(data);

    if(data.password !== data.passwordCheck){
      return alert("비밀번호가 일치하지 않습니다")
  }

  Navigate('/login');
  };


  //회원가입 버튼 눌렀을때
  const handleSingIn = async (data) => {
    try {
      const response = await axios.post(REGISTER_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Navigate('/home');
  
      // Handle the response as needed
    } catch (error) {
      setSignInError('회원가입에 실패했습니다');
    }
  };


  return(
    <SignUpLayout>
      <GoBackButton onClick={()=> Navigate('/login')}/>
      <SignUpTitle>회원가입</SignUpTitle>
      <form onSubmit={handleSubmit(handleSingIn)}>

       <SignUpContainer>
        <NameWrapper>
        <NameInput type="text" 
        placeholder="이름" 
        {...register("name",
         {required: true,
          minLength:{
            value:1
          },
         })}/>
         {
          errors.name?.type ==='required' && (<ErrorAlter>이름은 필수 정보입니다</ErrorAlter>)
         }
         {
          errors.name?.type === 'minLength' && (<ErrorAlter>최소 1글자 이상 입력해주세요</ErrorAlter>)
         }
         </NameWrapper>


         
         <BirthWrapper>
        <BirthInput 
         type="text"
         placeholder="생년월일"
          {...register("birth",
           {required: true,
            minLength: {
              value: 8
            },
           })}/>
           {
            errors.birth?.type ==='required' && (<ErrorAlter>생년월일은 필수 정보입니다</ErrorAlter>)
    }
    
      {
        errors.birth?.type === 'minLength' && (<ErrorAlter>0000-00-00 형식으로 입력해주세요</ErrorAlter>)
      }
    </BirthWrapper>
        

     
        <PhoneWrapper>
        <PhoneInput type="tel" 
          control={control}
             placeholder="전화번호" 
        {...register("phone", 
        {required: true,
          pattern: /^(\d{3}-\d{4}-\d{4}|\d{10})$/,
        
})}/>
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

            <PasswordCheckInput type="password"
            {...register('passWordCheck', {
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

        </SignUpContainer>
    <SignUpButton type="submit" onclick={handleSubmit(handleSingIn)}>회원가입</SignUpButton>
      </form>
    </SignUpLayout>
  )
}

export default SignUp;