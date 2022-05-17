import { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <Link to='/' className='nav-item-link-logo'>
            Affirmations
          </Link>
        </div>
        <ul className={`nav-list${isShowing ? ' responsive' : ''}`}>
          <li className='nav-item'>
            <Link to='login' className='nav-item-link'>
              <i className='fa-solid fa-circle-user'></i>
              <span style={{ display: 'inline-block', paddingLeft: '1rem' }}>
                Login
              </span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='register' className='nav-item-link'>
              <i className='fa-solid fa-user-plus'></i>
              <span style={{ display: 'inline-block', paddingLeft: '1rem' }}>
                Register
              </span>
            </Link>
          </li>
          <li
            className='nav-item-menu-icon'
            onClick={(e) => setIsShowing(!isShowing)}
          >
            {!isShowing ? (
              <i className='fa-solid fa-bars'></i>
            ) : (
              <i class='fa-solid fa-x'></i>
            )}
          </li>
        </ul>
      </header>
      {isShowing && (
        <div className='responsive-links'>
          <ul className={`nav-list${isShowing ? ' responsive' : ''}`}>
            <li className='nav-item'>
              <Link to='login' className='nav-item-link'>
                <i className='fa-solid fa-circle-user'></i>
                <span style={{ display: 'inline-block' }}>Login</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='register' className='nav-item-link'>
                <i className='fa-solid fa-user-plus'></i>
                <span style={{ display: 'inline-block' }}>Register</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default Header;
