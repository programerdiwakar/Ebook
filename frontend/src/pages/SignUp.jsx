import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

  const navigate=useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("please fill all the fields");
      }
      const response = await axios.post("https://ebook-68rc.onrender.com/api/v1/users/signup", Values);
      alert(response.data.message);
      setValues({
        username: "",
        email: "",
        password: "",
        address: "",
      })
      navigate('/signIn');

    }
    catch (err) {
       alert(err.response.data.message);
    }
  }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg w-full md:w-3/6 lg:w-2/6 px-8 py-5'>
        <p className='text-zinc-200 text-xl font-semibold'>Sign Up</p>
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
            <label htmlFor="email" className='text-zinc-400'>Email</label>
            <input
              type="email"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='email'
              name='email'
              required
              value={Values.email}
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
          <div>
            <label htmlFor="address" className='text-zinc-400'>Address</label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-700 text-zinc-200 p-2  font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>SignUp</button>
          </div>
          <p className=' flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='text-zinc-200 flex items-center justify-center font-semibold'>
            Already have an account? &nbsp;
            <Link to='/signIn' className='hover:text-blue-500'>SignIn</Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default SignUp
