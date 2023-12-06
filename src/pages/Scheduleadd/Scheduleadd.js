import { useForm } from "react-hook-form";
import React, { useEffect, useState, useRef } from 'react'
import '../css/Scheduleadd.css';


export default function Scheduleadd() {
    const {register, watch, formState:{errors}, handleSubmit, getValues} = useForm();

    const onSubmit = (data) => {
        //congsole.log(data)

        //axios.post('/', data)
    }

    return (
        //<form onSubmit={handleSubmit(onSubmit)}>
            <div className="page">
                <div className="container1" >  {/* 상단바 */}

                </div>
            


                <div className="container2">  {/* 타이틀, 설정 */}
                        <div className="title">NoStupid</div>  {/* 타이틀 */}
                        <div className="set">set</div>  {/* 설정 */}
                </div>


                <div className="container3">  {/* 타이틀 아래 */}

                    <div className="bar">  {/* 막대표시 */}
                    </div>

                    <div className="nameInput">  {/* 입력내용 */}
                    <input 
                        className="name"
                        placeholder='회사명'
                    />
                    </div>

                    <div className="interviewInput"><p className='interviewFont'>예상 면접 질문</p>  {/* 입력내용 */}
                    <p></p>
                    <input 
                        className="interview"
                        placeholder='1. '
                    />
                    </div>

                    <div className="placeInput">  {/* 입력내용 */}     
                    <input 
                        className="place"
                        placeholder='장소'
                    />
                    </div>
                    
                    <div className="timeInput">  {/* 입력내용 */}   
                    <input 
                        className="time"
                        placeholder='시간'
                    />   
                    </div>
                    
                    <div className="dateInput">  {/* 입력내용 */} 
                    <input 
                        className="date"
                        placeholder='yyyy.mm.dd'
                    />          
                    </div>
                    
                    <div className="notionInput">  {/* 입력내용 */}
                    <input 
                        className="notion"
                        placeholder='노션링크'
                    /> 
                    </div>
                            
                    <div className="gitInput">  {/* 입력내용 */}
                    <input 
                        className="git"
                        placeholder='깃허브'
                    /> 
                    </div>
                            
                    <div className="columnInput">  {/* 입력내용 */}
                    <input 
                        className="column"
                        placeholder='회고란'
                    /> 
                    </div>

                    <div className="submit">  {/* 버튼 */}   
                    <button
                    //onClick={onClickConfirmButton}
                    //disabled={notAllow}
                    className='addButton'>
                    <p className='add'>ADD</p>
                  </button>
                    </div>
                        
                </div>
                    
                    
            </div>

    )
}
