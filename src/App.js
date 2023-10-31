import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React,{ useReducer,useRef } from 'react';
import Login from './pages/signin/Login';

import Home from './pages/home/Home';



import Community from './pages/community/Community';
//import Splash from "./pages/splash/splash"
import Main from './pages/splash/main';
import SignUp from './pages/signup/SignUp';
import Calendar from './pages/Calendar/Calendar'
//import Navbar from './components/Navbar';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';


function App() {  
 

  return (
  
    <BrowserRouter>
    <GlobalStyle/>
    <Routes>
      <Route path='/Home' element={<Home/>}/> 
  
    
      <Route path ='/Login' element={<Login />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path ='/Community' element={<Community/>} />
      <Route path = "/Main" element={<Main />}/>
      <Route path = "/Calendar" element={<Calendar />}/>
     
      
    

    </Routes>
    </BrowserRouter>

   
   
  );
}

export default App;
