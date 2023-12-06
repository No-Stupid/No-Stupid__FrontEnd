import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Profile.css';
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedBirth = localStorage.getItem('birth');
        const storedPhone = localStorage.getItem('phone');
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('pw');

        setName(storedName || '');
        setBirth(storedBirth || '');
        setPhone(storedPhone || '');
        setEmail(storedEmail || '');
        setPassword(storedPassword || '');
    }, []);

    const onSubmit = async (data) => {
        try {
            const userId = localStorage.getItem('id');

            const response = await axios.put(`http://localhost:8080/api/member/edit/${userId}`, {
                memberName: email,
                memberBirth: birth,
                memberPhone: name,
                memberEmail: phone,
                memberPwd: password
            });

            console.log(response.data);
            localStorage.setItem('name', name);
            localStorage.setItem('birth', birth);
            localStorage.setItem('phone', phone);
            localStorage.setItem('email', email);
            localStorage.setItem('pw', password);
            alert("수정이 완료되었습니다.");
            navigate('/mypage');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="page">
            <div className="container1Pro">
                <div className="backPro">
                    <a className="navbar-brand" href="mypage">
                        <FaArrowLeft className="FaArrowLeftPro" />
                    </a>
                </div>
                <div className="titlePro">프로필 편집</div>
            </div>

            <div className="container2Pro">
                <div className="pictureInputPro">
                    <FaUserPlus className="FaUserPro" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="nameInputPro">
                        <p className='namePro'>이름</p>
                        <input
                            placeholder="이름"
                            {...register('name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="oneInputPro">
                        <p className='oneNamePro'>비밀번호</p>
                        <input
                            placeholder="비밀번호"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="birthInputPro">
                        <p className='birthPro'>생년월일 </p>
                        <input
                            type="date"
                            {...register('birth')}
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>

                    <div className="numInputPro">
                        <p className='numPro'>전화번호 </p>
                        <input
                            placeholder="저장된 전화번호"
                            {...register('phone')}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="emailInputPro">
                        <p className='emailPro'>이메일 </p>
                        <input
                            placeholder="저장된 이메일"
                            {...register('email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="submitButtonPro">
                        <button type="submit">
                            <p className='submPro'>수정</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
