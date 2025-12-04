import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fitch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/users/get-user-info", {
        headers: headers
      })
      setProfile(response.data)

    }
    fitch();
  }, [])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white h-full'>
      {!profile && <div className='w-full h-screen flex justify-center items-center '>
        <Loader />{" "}
      </div>}
      {profile &&
        <>
          <div className='w-full md:w-1/6 md:h-screen h-auto'>
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className='w-full md:w-5/6 h-auto  '>
            <Outlet />
          </div>
        </>

      }

    </div>
  )
}

export default Profile
