import React from 'react'
import { Link } from 'react-router-dom'
import { RiLogoutBoxRLine } from "react-icons/ri";

const Sidebar = (data) => {
  console.log(data.data.username)
  return (
    <div className='text-white bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
      <div className='flex items-center flex-col justify-center'>
        {" "}
      <img src={data.data.avatar} alt="" className='h-[12vh]' />
      <p className='text-zinc-100 mt-3 text-xl font-semibold'>{data.data.username}</p>
      <p className='mt-1 text-normal text-zinc-300'>{data.data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>

      <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link
          to="/profile"
          className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded tarnsition-all'
        >Favourites</Link>
        <Link
          to="/profile/orderHistory"
          className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded tarnsition-all'
        >Order History</Link>
        <Link
          to="/profile/settings"
          className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded tarnsition-all'
        >Setting</Link>
      </div>
      <button className='bg-zinc-900 w-4/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center  justify-center p-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'>
          Log Out<RiLogoutBoxRLine className='ms-4' />
        </button>
      </div>
  )
}

export default Sidebar
