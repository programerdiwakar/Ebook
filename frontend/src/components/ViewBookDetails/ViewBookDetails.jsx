import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr";
import { GoHeartFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const ViewBookDetails = () => {
  const { id } = useParams(); // useParams help to access dynamic parameters from the current URL path
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/books/get-book-by-id/${id}`)
      console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {Data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 '>
          <div className='lg:w-3/6  w-full '>
            <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12'>
              <img src={Data?.url} alt="" className='h-[50] md:h-[60vh] lg:h-[70vh] rounded' />
              {isLoggedIn && role === 'user' && (
                <div className='flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                  <button className='text-4xl lg:text-3xl p-3 text-red-500' ><GoHeartFill /></button>
                  <button className='text-4xl lg:text-3xl p-3 text-yellow-500 mt-0 lg:mt-4'><FaShoppingCart /></button>
                </div>
              )}

            </div>
          </div>
          <div className='p-4 lg:w-3/6'>
            <h1 className='text-4xl text-zinc-300 font-semibold'>{Data?.title}</h1>
            <p className='text-zinc-400 mt-1'> by {Data?.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'> by {Data?.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'>
              <GrLanguage className='me-3' />  {Data?.language}
            </p>

            <p className='text-zinc-100 mt-4 text-3xl'> Price:₹ {Data?.price}</p>

          </div>
        </div>
      )}
      {!Data && <div className='px-12 py-8 bg-zinc-900 flex gap-8 items-center justify-center h-screen'><Loader /> </div>}
    </>
  )
}

export default ViewBookDetails