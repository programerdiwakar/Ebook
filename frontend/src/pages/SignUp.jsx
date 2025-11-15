import { Link } from 'react-router-dom'

const SignUp = () => {
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
            />
          </div>
          <div>
            <label htmlFor="address" className='text-zinc-400'>Address</label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              required
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-700 text-zinc-200 p-2  font-semibold py-2 rounded'>SignUp</button>
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
