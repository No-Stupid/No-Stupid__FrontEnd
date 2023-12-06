import '../css/Nav.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from '../pages/Todo/Todo';
import Mypage from '../pages/Mypage/Mypage';
import Academic from '../pages/Academic';
import Career from '../pages/Career/Career';
import Portfolio from '../pages/Portfolio/Portfolio';
import Profile from '../pages/ProFile/ProFile';
import App from '../App';


function Routing() {
    return(
        <div>
            <BrowserRouter>
            <Routes>
                {/* <Route path='/' element={<App/>} /> */}
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/academic' element={<Academic />} />
                <Route path='/career' element={<Career />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/todo' element={<Todo />} />
            </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Routing;