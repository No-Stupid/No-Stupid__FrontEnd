import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/signin/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Community from './pages/community/Community';
import Splash from "./pages/splash/splash"

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
      <Route path ='/Singup' element={<Signup />}/>
      <Route path ='/Community' element={<Community/>} />
      <Route path = "/Splash" element={<Splash />}/>
     
      
    

    </Routes>
    </BrowserRouter>
   
   
  );
}

export default App;
