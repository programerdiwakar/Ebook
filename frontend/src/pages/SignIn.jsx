import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions }  from '../store/auth';

const SignIn = () => {

  const navigate=useNavigate();
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("please fill all the fields");
      }
      const response = await axios.post("http://localhost:3000/api/v1/users/signin", Values);
      navigate('/profile')
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);


    }
    catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg w-full md:w-3/6 lg:w-2/6 px-8 py-5'>
        <p className='text-zinc-200 text-xl font-semibold'>Sign In</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="username" className='text-zinc-400'>Username</label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="password" className='text-zinc-400'>Password</label>
            <input
              type="password"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-700 text-zinc-200 p-2  font-semibold py-2 rounded' onClick={submit}>Signin</button>
          </div>
          <p className=' flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='text-zinc-200 flex items-center justify-center font-semibold'>
            Already have an account? &nbsp;
            <Link to='/signUp' className='hover:text-blue-500'>SignUp</Link>
          </p>

        </div>
      </div>
      
    </div>
  )
}

export default SignIn
