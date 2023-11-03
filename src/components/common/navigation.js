//하단 네비게이션 부분 
import React from 'react'
import {NavLink,useLocation, useNavigate} from 'react-router-dom'

import styled from 'styled-components'

import HomeIcon from '../icons/HomeIcon'
import HomeNotIcon from '../icons/HomeNotIcon'
import CalendarIcon from '../icons/CalendarIcon'
import CalendarNotIcon from '../icons/CalendarNotIcon'
import CvIcon from '../icons/CvIcon'
import CvNotIcon from '../icons/CvNotIcon'
import MyPageIcon from '../icons/MyPageIcon'
import MyPageNotIcon from '../icons/MyPageNotIcon'

//네비바 디자인 

const Conainer= styled.div`
position: fixed;
bottom: 0;
left: 0;
right: 0;
margin: auto;
max-width: 430px;
width: 100%;

`;

const NavBox = styled.div`  
  display: flex;
  justify-content: space-between;
`;




const Navigation = () => {
    const {pathname} = useLocation();
    const navigate= useNavigate();
  
  

  return (
    <Conainer>
      <NavBox>
        <nav>
        <NavLink to = "Home">
           {pathname === '/home' ? <HomeIcon/> : <HomeNotIcon/>}
           </NavLink>
        </nav>

        <nav>
        <NavLink to = "/CorporateInfo">
            {pathname === '/CorporateInfo' ? <CvIcon/> : <CvNotIcon/>}
           </NavLink>
        </nav>

        <nav>
        <NavLink to = "/Calener">
           {pathname === '/Calender' ? <CalendarIcon/> : <CalendarNotIcon/>}
           </NavLink>
        </nav>

        <nav>
        <NavLink to = "/MyPage">
            {pathname === '/MyPage' ? <MyPageIcon/> : <MyPageNotIcon/>}
           </NavLink>
        </nav>
      </NavBox>
    </Conainer>
  )
}

export default Navigation



