import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';

const Header = () => {
  const [isShowing, setIsShowing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const showNavItems = () => {
    if (user) {
      return (
        <>
          <li className='nav-item home-icon'>
            <Link to='dashboard' className='nav-item-link'>
              <i className='fa-solid fa-house-user'></i>
            </Link>
            {/* <Link
              to='settings'
              className='nav-item-link'
              style={{ marginRight: '1rem' }}
            >
              <i className='fa-solid fa-gear'></i>
            </Link> */}
          </li>
          <li className='nav-item logout-btn' onClick={onLogout}>
            <i className='fa-solid fa-arrow-right-from-bracket'></i>
            <span style={{ display: 'inline-block', paddingLeft: '.4rem' }}>
              Logout
            </span>
          </li>
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  const showResponsiveMenu = () => {
    if (isShowing) {
      if (user) {
        return (
          <div className='responsive-links'>
            <ul className={`nav-list${isShowing ? ' responsive' : ''}`}>
              <li className='nav-item' onClick={(e) => setIsShowing(false)}>
                <Link to='/' className='nav-item-link'>
                  <i className='fa-solid fa-house'></i>
                  <span
                    style={{ display: 'inline-block', paddingLeft: '1rem' }}
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li className='nav-item' onClick={(e) => setIsShowing(false)}>
                <Link to='/dashboard' className='nav-item-link'>
                  <i className='fa-solid fa-house-user'></i>
                  <span
                    style={{ display: 'inline-block', paddingLeft: '1rem' }}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              {/* <li className='nav-item' onClick={(e) => setIsShowing(false)}>
                <Link to='/settings' className='nav-item-link'>
                  <i className='fa-solid fa-gear'></i>
                  <span
                    style={{ display: 'inline-block', paddingLeft: '1rem' }}
                  >
                    Settings
                  </span>
                </Link>
              </li> */}
              <li
                style={{
                  listStyle: 'none',
                }}
                onClick={(e) => {
                  setIsShowing(false);
                  onLogout();
                }}
              >
                <i className='fa-solid fa-arrow-right-from-bracket'></i>
                <span
                  style={{ display: 'inline-block', paddingLeft: '1rem' }}
                  className='nav-item-logout'
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        );
      } else {
        return (
          <div className='responsive-links'>
            <ul className={`nav-list${isShowing ? ' responsive' : ''}`}>
              <li className='nav-item' onClick={(e) => setIsShowing(false)}>
                <Link to='login' className='nav-item-link'>
                  <i className='fa-solid fa-circle-user'></i>
                  <span
                    style={{ display: 'inline-block', paddingLeft: '1rem' }}
                  >
                    Login
                  </span>
                </Link>
              </li>
              <li className='nav-item' onClick={(e) => setIsShowing(false)}>
                <Link to='register' className='nav-item-link'>
                  <i className='fa-solid fa-user-plus'></i>
                  <span
                    style={{ display: 'inline-block', paddingLeft: '1rem' }}
                  >
                    Register
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        );
      }
    }
  };

  return (
    <>
      <header className='header'>
        <div className='logo'>
          <Link
            to='/'
            className='nav-item-link-logo'
            onClick={(e) => setIsShowing(false)}
          >
            Affirmations
          </Link>
        </div>

        <ul className={`nav-list${isShowing ? ' responsive' : ''}`}>
          {showNavItems()}
          <li
            className='nav-item-menu-icon'
            onClick={(e) => setIsShowing(!isShowing)}
          >
            {!isShowing ? (
              <i className='fa-solid fa-bars'></i>
            ) : (
              <i className='fa-solid fa-x'></i>
            )}
          </li>
        </ul>
      </header>
      {showResponsiveMenu()}
    </>
  );
};
export default Header;
