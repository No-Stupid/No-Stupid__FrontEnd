import useStore from "../zustand/Store";
import React, { useEffect, useState, useRef  } from 'react'
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import '../css/Signup.css';


const User ={
  name: '홍길동',
  birth:'2000.01.01',
  num:'010-1234-5678',
  email: 'test@ex.com',
  pw:'test1234!',
  rpw:'test1234!'
}

function Signup() {
  // 정보 확인
  const [name, setName]= useState("");
  const [birth,setBirth]= useState("");
  const [num,setNum]= useState("");
  const [email, setEmail]= useState("");
  const [pw,setPw]= useState("");
  const [rpw,setRpw]= useState("");


  // 유효성 검사
  const [emailVaild, setEmailVaild] = useState(false);
  const [pwVaild, setPwVaild] = useState(false);
  const [rpwVaild, setRpwVaild] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const fetchData = useStore((state) => state.fetch);


  const { watch } = useForm();
  console.log(watch('rpw'))
  const password = useRef();
  password.current=watch("password");
    
useEffect(() => {
  if ( emailVaild && rpwVaild ) { // 버튼을 풀어 줌
      setNotAllow(false);
      return;
  }
  setNotAllow(true); //기본 값은 버튼 비활성화
},[ emailVaild, rpwVaild]);


const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =  /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(regex.test(email)){
        setEmailVaild(true);
    }else{
        setEmailVaild(false);
    }
}
const handlePw = (e) => {
    setPw(e.target.value);
    const regex1 =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if(regex1.test(pw)){
        setPwVaild(true);
    }else{
        setPwVaild(false);
    }
}

const handleRpw = (e) => {
  const currentPwConfirm = e.target.value;
  setRpw(currentPwConfirm);
  if( pw !== currentPwConfirm ){
      setRpwVaild(false);
  }else{
      setRpwVaild(true);
  }
}

const onClickConfirmButton = async() => {
  if(email == User.email){
      alert('이미 가입된 회원 정보입니다.')
  }else{
    await fetchData(name, birth, num, email, pw)
    .then(() => alert("가입이 완료되었습니다."))
    .then(() => Navigate("/login"));
  }
};


  return (
        <div className="page">
          <div className="container">
                <div className="back"></div>

                <div className="title">
                        <p className='titleWrap'>Signup</p>
                </div>

                <div className="content">
                    <div className='nameInput'>
                        <input className='name' 
                        placeholder='이름'
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>

                    <div className='birthInput'>
                        <input className='birth' 
                        placeholder='생년월일'
                        value={birth} 
                        onChange={(e)=>setBirth(e.target.value)}/>
                    </div>

                    <div className='numInput'>
                        <input className='num' 
                        placeholder='전화번호'
                        value={num} 
                        onChange={(e)=>setNum(e.target.value)}/>
                    </div>

                    <div className='mailInput'>
                        <input 
                        type='text'
                        className='mail' 
                        value={email}
                        onChange={handleEmail}
                        placeholder='E-mail'  
                        />
                    </div>

                    <div className='errorMessage1'>
                        { !emailVaild && email.length > 0 && 
                            (<p>이메일 형식이 올바르지 않습니다.</p>)}
                    </div>

                    <div className='pwInput'>
                        <input 
                        type='password'
                        className='pw'
                        value={pw} 
                        onChange={handlePw}
                        placeholder='Password'/> 
                    </div>

                    <div className='errorMessage2'>
                        {!pwVaild && 0 < pw.length && pw.length< 8 &&
                            (<p>비밀번호는 8자리 이상 설정해야 합니다.</p>)}
                    </div>

                    <div className='rpwInput'>
                        <input 
                        type='password'
                        className='rpw' 
                        placeholder='reconfirm password' 
                        value={rpw} 
                        onChange={handleRpw}
                        />
                    </div>

                    <div className='errorMessage3'>
                        { !rpwVaild && 0 < rpw.length &&
                        (<p>비밀번호가 일치하지 않습니다.</p>)}
                    </div>
                </div>

     
                <div className='submit'>
                  <button
                    onClick={onClickConfirmButton}
                    disabled={notAllow}
                    className='nextButton'>
                    <p className='next'>SIGN UP</p>
                  </button>
                </div>
              </div>
            </div>
  );

  }
export default Signup;