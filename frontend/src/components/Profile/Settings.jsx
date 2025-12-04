import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import {useNavigate} from "react-router-dom"

const Settings = () => {
 const navigate=useNavigate();
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({ address: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value })
  };

  const submitAddress = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api/v1/users/update-address",
      Value,{ headers }
    )
      alert(response.data.message);
      navigate('/profile');
    }
    catch {
      alert("Address is empty");
      
    }
    
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/get-user-info",
        { headers }
      )
      setProfileData(response.data);
      setValue(response.data.address);
    }
    fetch();
  }, []);
  return (
    <>
      {!ProfileData && (
        <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
      )}
      {ProfileData && (
        <div className='h-auto p-0 md:p-4 text-zinc-100 m-2 md:m-0 '>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.email}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semiboid'
              rows="5"
              name="address"
              placeholder='Address'
              value={Value.value}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all decoration-amber-300 '
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Settings
