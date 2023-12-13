import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import '../../css/Portfolio.css';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { portfolioAtom } from "../Store/store";
import axios from 'axios';

export default function Portfolio() {
    const { register, watch, formState: { errors }, handleSubmit, getValues } = useForm();
    const [portfolio, setPortfolio] = useAtom(portfolioAtom);
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const portfolioId = urlSearchParams.get('id');
                const response = await axios.get(`http://localhost:8080/api/mypage/portfoliolist`);
                const filteredPortfolio = response.data.find(item => item.id === parseInt(portfolioId, 10));

                if (filteredPortfolio) {
                    setPortfolio(filteredPortfolio);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [setPortfolio]);

    const isEditMode = Boolean(urlSearchParams.get('id'));
    const buttonText = isEditMode ? '수정' : '완료';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolio((prevPortfolio) => ({ ...prevPortfolio, [name]: value }));
    };

    const onSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/mypage/portfolio/${localStorage.getItem('id')}`, {
                platform: portfolio.platform,
                link: portfolio.link,
            });

            console.log(response.data);

            navigate('/Mypage');
        } catch (error) {
            console.error(error);
        }
    };

    const onDelete = async () => {
        try {
            const portfolioId = urlSearchParams.get('id');
            await axios.delete(`http://localhost:8080/api/portfolio/delete/${portfolioId}`);
            alert("삭제되었습니다.");
            navigate('/Mypage');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page">
            <div className="containerCa1"></div>
            <div className="containerCa2">
                <div>
                    <button style={{ background: '#fff' }} onClick={() => navigate("/mypage")}>
                        <FaArrowLeft />
                    </button>
                </div>
                <div className="titleCa">포트폴리오 정보</div>
            </div>
            <div className="containerCa3">
                <div className="starDiv">
                    <p style={{ marginLeft: '20px' }} className='starInput'>*은 필수 입니다</p>
                </div>
                <div className="po1Input">
                    <p className='po1Name'>사용 플랫폼</p>
                    <input
                        placeholder='사용한 플랫폼에 대해 입력하세요'
                        name="platform"
                        value={portfolio.platform}
                        onChange={handleChange}
                    />
                </div>
                <div className="po2Input">
                    <p className='po2Name'>링크 </p>
                    <input
                        placeholder='링크를 입력하세요'
                        name="link"
                        value={portfolio.link}
                        onChange={handleChange}
                    />
                </div>
                <div className="submitPo">
                    <button onClick={onSubmit}>
                        <p className='poSubm'>{buttonText}</p>
                    </button>
                </div>
                <div className="deletePo">
                    <button onClick={onDelete}>
                        <p className='poSubm'>삭제</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
