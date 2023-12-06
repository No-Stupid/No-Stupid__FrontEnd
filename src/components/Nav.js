import '../css/Nav.css';
import { FaHome, FaCalendar, FaCheckCircle, FaUser, FaCommentDots } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenNavPaths = ['/', '/Login', '/SignUp', '/login', '/signup'];

  const isNavVisible = !hiddenNavPaths.includes(location.pathname);

  const goToRoute = (path) => {
    navigate(path);
  };

  return (
    <>
      {isNavVisible && (

        <div className='nav-container'>
          <div className="nav-item">
            <a className="navbar-brand" href="/home">
              <FaHome className='navBars' />
            </a>
          </div>

          <div className="nav-item">
            <a className="navbar-brand" href="/calendar">
              <FaCalendar className='navCal' />
            </a>
          </div>

          <div className="nav-item">
            <a className="navbar-brand" href="/community">
              <FaCommentDots className='navCal' />
            </a>
          </div>

          <div className="nav-item">
            <a className="navbar-brand" href="todo">
              <FaCheckCircle className='navCheck' />
            </a>
          </div>

          <div className="nav-item">
            <a className="navbar-brand" href="mypage">
              <FaUser className='navUser' />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
