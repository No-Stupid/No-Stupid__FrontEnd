import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import '../../css/Mypage.css';
import { FaPlus, FaPenAlt, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Mypage() {
    const navigate = useNavigate();
    const storedName = localStorage.getItem('name');
    const [academicList, setAcademicList] = useState([]);
    const [careerList, setCareerList] = useState([]);
    const [portfolioList, setPortfolioList] = useState([]);

    const storedId = localStorage.getItem('id');
    if (!storedId) {
        navigate('/login');
    }

    useEffect(() => {
        const memberId = localStorage.getItem('id');

        axios.get(`http://localhost:8080/api/mypage/edulist?memberId=${memberId}`)
            .then(response => {
                const filteredAcademicList = response.data.filter(item => item.member === parseInt(memberId, 10));
                setAcademicList(filteredAcademicList);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/api/mypage/careerlist`)
            .then(response => {
                const filteredCareerList = response.data.filter(item => item.member === parseInt(memberId, 10));
                setCareerList(filteredCareerList);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/api/mypage/portfoliolist`)
            .then(response => {
                const filteredPortfolioList = response.data.filter(item => item.member === parseInt(memberId, 10));
                setPortfolioList(filteredPortfolioList);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        alert('로그아웃이 완료되었습니다.')
        navigate('/login');
    };

    return (
        <div className="page_">
            <div className="">
                <div className="title_">마이페이지</div>
            </div>
            <div className="container3_">
                <div className="profile_input">
                    <Link className="navbar-brand" to="/profile">
                        <FaPenAlt className="link-icon" />
                    </Link>
                    <p className="name1">{storedName}님</p>
                </div>
                
                <div className="profile_input">
                    <Link className="navbar-brand" to="/academic">
                        <FaPlus className="link-icon" />
                    </Link>
                    <p className='name2'>학력</p>
                    <div className="icon">
                        {academicList.map(item => (
                            <Link key={item.id} to={`/academic?id=${item.id}`}>
                                <FaUserGraduate />
                                <div>{item.school}</div>
                                <div>{item.admissionDate}~{item.graduateDate}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="line3"></div>

                <div className="profile_input">
                    <Link class="navbar-brand" to="/career">
                        <FaPlus className="link-icon" />
                    </Link>
                    <p className='name3'>경력</p>
                    <div className="icon">
                        {careerList.map(item => (
                            <Link key={item.id} to={`/career?id=${item.id}`} className="career-link">
                                <FaUserTie />
                                <div>{item.company}</div>
                                <div>{item.joinCompanyDate}~{item.leaveCompanyDate}</div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="profile_input">
                    <Link class="navbar-brand" to="/portfolio">
                        <FaPlus className="link-icon" />
                    </Link>
                    <p className='name6'>포트폴리오 </p>
                    <div className="icon">
                        {portfolioList.map(item => (
                            <Link key={item.id} to={`/portfolio?id=${item.id}`} className="portfolio-link">
                                <div>{item.platform}</div>
                                <div>{item.link}</div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div onClick={handleLogout} style={{ textAlign: 'center' }}>로그아웃</div>

            </div>

        </div>

    )
}
