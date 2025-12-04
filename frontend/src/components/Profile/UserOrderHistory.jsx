import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    const fitch = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/orders/get-order-history",
        { headers }
      );
      setOrderHistory(res.data.data);

    }
    fitch()
  }, [])
  return (
    <>
      {!OrderHistory && <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              No Order History
            </h1>
            {/* <img src="" alt="img" /> */}
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className='h-screen p-0 md:p-4 text-zinc-100 m-2 md:m-0'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-6 ml-4 md:ml-0'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>
                Sr.
              </h1>
            </div>
            <div className='md:w-[22%] w-[40%]'>
              <h1 className='text-center'>
                Books
              </h1>
            </div>
            <div className='w-0 md:w-[45%] md:block hidden'>
              <h1 className=''>
                Description
              </h1>
            </div>
            <div className='w-[17%] md:w-[10%]'>
              <h1 className=''>
                Price
              </h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1 className=''>
                Status
              </h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1 className=''>
                Mode
              </h1>
            </div>
          </div>

          {OrderHistory.map((items, i) => (
            <div className='mt-1 bg-zinc-800 md:w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer w-auto'>

              <div className='w-[3%] '>
                <h1 className='text-center'>
                  {i + 1}
                </h1>
              </div>
              <div className='md:w-[22%] w-[40%]'>
                <Link
                  className='hover:text-blue-300'
                  to={`/view-book-details/${items.book._id}`}
                >
                  {items.book.title}
                </Link>
              </div>
              <div className='w-0 md:w-[45%] md:block hidden'>
                <h1 className=''>
                  {items.book.desc.slice(0, 50)}....
                </h1>
              </div>
              <div className='w-[17%] md:w-[10%]'>
                <h1 className=''>
                  {items.book.price}
                </h1>
              </div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status === "Order Placed" ? (
                    <div className='text-yellow-500'>{items.status}</div>)
                    : items.status === "Canceled" ? (
                      <div className='text-red-500'>{items.status}</div>
                    ) : (
                      items.status
                    )}
                </h1>
              </div>
              <div className='w-[10%] md:w-[5%]'>
                <h1 className='text-sm text-zinc-400'>
                  COD
                </h1>
              </div>

            </div >

          ))}
        </div>
      )}
    </>
  )
}

export default UserOrderHistory
