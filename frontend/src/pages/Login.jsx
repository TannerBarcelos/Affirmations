import { useState, useEffect } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // Submit API call to register
  };
  return (
    <>
      <section className='heading'>
        <h1>Login</h1>
      </section>
      <section className='register-form'>
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
      </section>
    </>
  );
};
export default Login;
