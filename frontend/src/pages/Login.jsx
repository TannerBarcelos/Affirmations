import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    if (isSuccess) {
      toast.success('User Logged In Successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('You Must Enter a Password and Email to Continue');
    } else {
      const user = {
        email,
        password,
      };
      dispatch(login(user));
    }
  };
  return (
    <div className='auth-container'>
      <section className='heading'>
        <h1>Login</h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            {' '}
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            {' '}
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
        <p style={{ padding: '1.4rem 0', fontSize: '.9rem' }}>
          Not a member?
          <Link to={'/register'}>
            {' '}
            <span>Register</span>
          </Link>
        </p>
      </section>
    </div>
  );
};
export default Login;
