import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import '../../css/Academic.css';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { academicAtom } from "../Store/store";
import axios from 'axios';

export default function Academic() {
    const [academic, setAcademic] = useAtom(academicAtom);
    const navigate = useNavigate();
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [doubleMajor, setDoubleMajor] = useState('');
    const [admission, setAdmission] = useState('');
    const [graduate, setGraduate] = useState('');
    const [grades, setGrades] = useState('');
    const [prize, setPrize] = useState('');
    const [credit, setCredit] = useState('');

    const { register, handleSubmit } = useForm();
    const urlSearchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const memberId = localStorage.getItem('id');
        setAcademic({ ...academic, memberId });
    }, []);

    useEffect(() => {
        const academicId = urlSearchParams.get('id');

        if (academicId) {
            axios.get(`http://localhost:8080/api/mypage/edulist?id=${academicId}`)
                .then(response => {
                    const academicData = response.data.find(item => item.id === parseInt(academicId));

                    if (academicData) {
                        setSchool(academicData.school || '');
                        setDegree(academicData.degree || '');
                        setMajor(academicData.major || '');
                        setDoubleMajor(academicData.doubleMajor || '');
                        setAdmission(academicData.admissionDate || '');
                        setGraduate(academicData.graduateDate || '');
                        setGrades(academicData.grades || '');
                        setPrize(academicData.prize || '');
                        setCredit(academicData.credit || '');
                    } else {
                        console.error(`No data found for id: ${academicId}`);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [urlSearchParams]);

    const handleDeleteAcademic = async () => {
        try {
            const academicId = urlSearchParams.get('id');

            if (academicId) {
                await axios.delete(`http://localhost:8080/api/education/delete/${academicId}`);
                navigate("/mypage");
            } else {
                console.error('Academic ID not found.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isEditMode = Boolean(urlSearchParams.get('id'));
    const buttonText = isEditMode ? '수정' : '완료';

    const onSubmit = async () => {
        try {
            const academicId = urlSearchParams.get('id');
            const memberId = localStorage.getItem('id');

            const requestData = {
                member: memberId,
                school,
                degree,
                major,
                doubleMajor,
                admissionDate: admission,
                graduateDate: graduate,
                grades: credit,
                prize,
            };

            const apiUrl = academicId
                ? `http://localhost:8080/api/education/edit/${academicId}`
                : `http://localhost:8080/api/mypage/edu?memberId=${academic.memberId}`;

            const axiosMethod = academicId ? axios.put : axios.post;

            await axiosMethod(apiUrl, requestData);

            const successMessage = academicId ? "수정이 완료되었습니다." : "작성이 완료되었습니다.";
            alert(successMessage);

            navigate("/mypage");
        } catch (error) {
            console.error(error);
        }
    };

    const schoolBand = [
        "초등학교",
        "중학교",
        "고등학교",
        "대학교",
        "대학원"
    ];
    const [selectedSchoolBand, setSelectedSchoolBand] = useState([]);

    const majorBand = [
        "부전공",
        "복수전공",
        "이중전공",
    ];
    const [selectedMajorBand, setSelectedMajorBand] = useState([]);

    return (
        <div className="page_">
            <div className="container1_2">
                <div className="backIcon">
                    <a class="navbar-brand" href="mypage">
                        <FaArrowLeft className="backAca" />
                    </a>
                </div>  {/* 뒤로 가기 */}
                <div className="title_Aca">학력 정보</div>  {/* 타이틀 */}

                <div className="line__"></div>
            </div>

            <div className="container3__">
                {/* ... 나머지 코드 ... */}
                <div className="schoolInput_">
                    <p className='name1_'>학교 *</p>
                    <select
                        className="selectSchool"
                        value={academic.education}
                        onChange={(e) => {
                            setAcademic({ ...academic, education: e.target.value });
                            setSelectedSchoolBand(e.target.value);
                        }}
                    >
                        <option selected disabled>선택</option>
                        {schoolBand.map(schoolType => <option key={schoolType}>{schoolType}</option>)}
                    </select>
                    <input
                        className="school"
                        placeholder='학교명을 입력하세요'
                        value={school}
                        onChange={e => setSchool(e.target.value)}
                    />
                </div>

                <div className="in__Input">
                    <p className='name2_'>입학일 *</p>
                    <input
                        type="date"
                        className="in"
                        placeholder='입학일'
                        value={admission}
                        onChange={e => setAdmission(e.target.value)}
                    />
                </div>

                <div className="out__Input">
                    <p className='name3_'>졸업일[예정일] *</p>
                    <input
                        type="date"
                        className="out"
                        placeholder='졸업일'
                        value={graduate}
                        onChange={(e) => setGraduate(e.target.value)}
                    />
                </div>

                {selectedSchoolBand === "대학원" || selectedSchoolBand === "대학교" ?
                    <div>
                        <div className="majorInputAca">
                            <p className='majorAca'>전공 </p>
                            <input
                                placeholder='전공'
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                        </div>

                        <div className="double_Input">
                            <p className='name5'>부/복수/이중 전공 </p>
                            <select
                                className="selectMajor"
                                onChange={(e) => setSelectedMajorBand(e.target.value)}
                            >
                                <option selected disabled>선택</option>
                                {majorBand.map(majorType => <option key={majorType}>{majorType}</option>)}
                            </select>
                            <input
                                className="double"
                                placeholder='부/복수 전공명'
                                value={doubleMajor}
                                onChange={(e) => setDoubleMajor(e.target.value)}
                            />
                        </div>

                        <div className="degree__Input">
                            <p className='degreeName'>학위 </p>
                            <input
                                className="degree"
                                placeholder='학위'
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </div>

                        <div className="credit_Input">
                            <p className='name7'>학점 </p>
                            <input
                                className="credit"
                                placeholder='학점'
                                value={credit}
                                onChange={(e) => setCredit(e.target.value)}
                            />
                        </div>

                        <div className="credit_Input">
                            <p className='name7'>수상 경력 </p>
                            <input
                                className="credit"
                                placeholder='수상 경력'
                                value={prize}
                                onChange={(e) => setPrize(e.target.value)}
                            />
                        </div>
                    </div> : null}


                <div className="submitAca">  {/* 버튼 */}
                    <button
                        onClick={handleSubmit(onSubmit)}
                    >
                        <p className='subm'>{buttonText}</p>
                    </button>
                </div>
                <div className="deleteAca">  {/* 버튼 */}
                    <button onClick={handleDeleteAcademic}>
                        <p className='subm'>삭제</p>
                    </button>
                </div>

            </div>


            <div className="container4"> {/* 하단 아이콘 */}
            </div>

        </div>

    )
}
