import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    age: '',
  })

  const { name, email, password, password2, age } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (user) {
      navigate('/dashboard')
    }

    if (isSuccess) {
      toast.success('User Created!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const user = {
        name,
        email,
        password,
        age,
      }
      dispatch(register(user))
    }
  }

  return (
    <div className='auth-container'>
      <section className='heading'>
        <h1>Register</h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            {' '}
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            {' '}
            <input
              type='text'
              name='age'
              id='age'
              value={age}
              placeholder='Enter your age'
              onChange={onChange}
            />
          </div>
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
            {' '}
            <input
              type='password'
              name='password2'
              id='password2'
              value={password2}
              placeholder='Confirm password'
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
          Already a member?
          <Link to={'/login'}>
            {' '}
            <span>Login</span>
          </Link>
        </p>
      </section>
    </div>
  )
}
export default Register
