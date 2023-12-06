import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useRef } from 'react'
import '../../css/Career.css';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import { careerAtom } from "../Store/store";
import axios from 'axios';

export default function Career() {
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(window.location.search);

    const [career, setCareer] = useState({
        company: "",
        job: "",
        work: "",
        join: "",
        leave: "",
    });

    useEffect(() => {
        const careerId = urlSearchParams.get("id");

        if (careerId) {
            axios
                .get(`http://localhost:8080/api/mypage/careerlist`)
                .then((response) => {
                    const filteredCareerData = response.data.find(
                        (item) => item.id === parseInt(careerId, 10)
                    );

                    if (filteredCareerData) {
                        setCareer({
                            company: filteredCareerData.company || "",
                            job: filteredCareerData.role || "",
                            work: filteredCareerData.job || "",
                            join: filteredCareerData.joinCompanyDate || "",
                            leave: filteredCareerData.leaveCompanyDate || "",
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const isEditMode = Boolean(urlSearchParams.get("id"));
    const buttonText = isEditMode ? "수정" : "완료";

    const onSubmit = async () => {
        try {
            const userId = localStorage.getItem("id");
            const careerId = urlSearchParams.get("id");

            const requestData = {
                company: career.company,
                role: career.job,
                job: career.work,
                joinCompanyDate: career.join,
                leaveCompanyDate: career.leave,
            };

            let apiUrl;
            let axiosMethod;

            if (careerId) {
                apiUrl = `http://localhost:8080/api/career/edit/${careerId}`;
                axiosMethod = axios.put;
            } else {
                apiUrl = `http://localhost:8080/api/mypage/career/${userId}`;
                axiosMethod = axios.post;
            }

            const response = await axiosMethod(apiUrl, requestData);

            console.log(response.data);

            const successMessage = careerId
                ? "수정이 완료되었습니다."
                : "작성이 완료되었습니다.";
            alert(successMessage);

            navigate("/Mypage");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page">
            <div className="containerCa1" >  {/* 상단바 */}
            </div>

            <div className="containerCa2">  {/* 타이틀, 뒤로 가기 */}
                <div className="back">
                    <a class="navbar-brand" href="mypage">
                        <FaArrowLeft className="backCa" /></a></div>
                <div className="titleCa">경력 정보</div>  {/* 타이틀 */}
            </div>
            
            <div className="containerCa3">  {/* 타이틀 아래 */}
                <div className="starDiv">
                    <p className='starInput'>*은 필수 입니다</p>
                </div>

                <div className="ca1Input">
                    <p className='ca1Name'>회사 *</p>
                    <input
                        placeholder='회사명을 입력하세요'
                        value={career.company}
                        onChange={(e) => setCareer({ ...career, company: e.target.value })}
                    />
                </div>

                <div className="ca2Input">
                    <p className='ca2Name'>직무 능력 *</p>
                    <input
                        placeholder='직무 능력에 대해 입력하세요'
                        value={career.job}
                        onChange={(e) => setCareer({ ...career, job: e.target.value })}
                    />
                </div>

                <div className="ca3Input">
                    <p className='ca3Name'>담당 업무 * </p>
                    <input
                        placeholder='담당했던 업무에 대해 입력하세요'
                        value={career.work}
                        onChange={(e) => setCareer({ ...career, work: e.target.value })}
                    />
                </div>

                <div className="ca4Input">
                    <p className='ca4Name'>입사일 * </p>
                    <input
                        type="date"
                        value={career.join}
                        onChange={(e) => setCareer({ ...career, join: e.target.value })}
                    />
                </div>

                <div className="ca5Input">
                    <p className='ca5Name'>퇴사일 * </p>
                    <input
                        type="date"
                        value={career.leave}
                        onChange={(e) => setCareer({ ...career, leave: e.target.value })}
                    />
                </div>

                <div className="submitCa">
                    <button
                        onClick={onSubmit}
                    // disabled={notAllow}
                    >
                        <p className='caSubm'>{buttonText}</p>
                    </button>
                </div>

                <div className="deleteCa">  {/* 버튼 */}
                    <button
                        onClick={async () => {
                            try {
                                const careerId = urlSearchParams.get("id");
                                await axios.delete(`http://localhost:8080/api/career/delete/${careerId}`);
                                alert("삭제되었습니다.");
                                navigate("/Mypage");
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <p className='caSubm'>삭제</p>
                    </button>
                </div>

            </div>

        </div>

    )
}
