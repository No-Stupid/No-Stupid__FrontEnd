import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React,{ useReducer,useRef } from 'react';
import Login from './pages/signin/Login';
import Nav from "./components/Nav";

import Home from './pages/home/Home';



import Community from './pages/community/Community';
import Write from './pages/community/Write';
import Best from './pages/community/Best';
import CommunityCareer from './pages/community/Career';
import TestReview from './pages/community/TestReview';
import Post from './pages/community/CareerPost';
//import Splash from "./pages/splash/splash"
//import Navbar from './components/Navbar';
import Main from './pages/splash/main';
import SignUp from './pages/signup/SignUp';
import Mypage from './pages/Mypage/Mypage';
import ProFile from './pages/ProFile/ProFile';
import Academic from './pages/Academic/Academic';
import Career from './pages/Career/Career';
import Portfolio from './pages/Portfolio/Portfolio';
import Calendar from './pages/Calendar/Calendar'
import Todo from './pages/Todo/Todo'

import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import CorporateInfo from "pages/corporateInfo/CorporateInfo";


function App() {


  return (

    <BrowserRouter>
    <GlobalStyle/>
    <Routes>
      <Route path = "/" element={<Main />}/>
      <Route path ='/Login' element={<Login />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/Mypage' element={<Mypage />}/>
      <Route path='/ProFile' element={<ProFile />}/>
      <Route path='/Academic' element={<Academic />}/>
      <Route path='/Career' element={<Career />}/>
      <Route path='/Portfolio' element={<Portfolio />}/>
      <Route path = "/Calendar" element={<Calendar />}/>
      <Route path = "/Todo" element={<Todo />}/>
      
      <Route path='/ModifyInfo'>
        <Route path=":infoId" element={<CorporateInfo />} />
      </Route>
      <Route path="/writeInfo" element={<CorporateInfo />} />
      <Route path ='/Community' element={<Community/>} />
      <Route path ='/write' element={<Write/>} />
      <Route path ='/best' element={<Best/>} />
      <Route path ='/communitycareer' element={<CommunityCareer/>} />
      <Route path ='/testreview' element={<TestReview/>} />
      <Route path ='/post' element={<Post/>} />

    </Routes>
            <div className="container4">
                <Nav />
            </div>
    </BrowserRouter>



  );
}

export default App;
