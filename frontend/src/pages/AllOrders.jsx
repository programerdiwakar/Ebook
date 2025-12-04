import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import SeeUserData from './SeeUserData';

const AllOrders = () => {
    const [AllOrders, setAllOrders] = useState();
    const [Options, setOptions] = useState(-1);
    const [Values, setValues] = useState({ status: '' });
    const [userDiv, setuserDiv] = useState("hidden"); 
    const [userDivData,setuserDivData ] = useState();
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/orders/get-all-orders",
                { headers }
            );
            setAllOrders(response.data.data);
        };
        fetch();
    }, [AllOrders]);

    const change = (e) => {
        const { value } = e.target;
        setValues({ status: value });
    };
    const submitChanges = async (i) => {
        const id = AllOrders[i]._id;
        const res = await axios.put(`http://localhost:3000/api/v1/orders/update-status/${id}`,
            Values,
            { headers }
        )
        alert(res.data.message);
    };

    
    return (
        <>
            {!AllOrders && (
                <div className='flex justify-center items-center h-screen'>
                    <Loader />
                </div>
            )}
            {AllOrders && AllOrders.length > 0 && (
                <div className='h-screen p-0 md:p-4 text-zinc-100 m-2 md:m-0'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-6 ml-4 md:ml-0'>
                        All Orders
                    </h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>
                                Sr.
                            </h1>
                        </div>
                        <div className='md:w-[22%] w-[40%]'>
                            <h1 className=''>
                                Books
                            </h1>
                        </div>
                        <div className='w-0 md:w-[45%] md:block hidden ]'>
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
                                <FaUser />
                            </h1>
                        </div>
                    </div>
                    {AllOrders && AllOrders.map((items, i) => (
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
                            <div className='md:w-[45%] w-0 hidden md:block'>
                                <h1 className=''>
                                    {items.book.desc.slice(0, 50)}....
                                </h1>
                            </div>
                            <div className='w-[17%] md:w-[10%]'>
                                <h1 className=''>
                                    ₹ {items.book.price}
                                </h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='font-semibold '>
                                    <button
                                        className='hover:scale-105 transition-all duration-300'
                                        onClick={() => {
                                            setOptions(i)
                                        }}
                                    >
                                        {items.status === "Order Placed" ? (
                                            <div className='text-yellow-500'>{items.status}</div>
                                        ) : items.status === "Canceled" ? (
                                            <div className='text-red-500'>{items.status}</div>
                                        ) : (<div className='text-green-500'>{items.status}</div>

                                        )}
                                    </button>

                                
                                <div className={`${Options === i ? "block":"hidden"} flex mt-4`}>
                                    <select name="status" id="" className='bg-gray-800'onChange={change} value={Values.status}>
                                        {[
                                            "Order Placed",
                                            "Out for delivery",
                                            "Delivered",
                                            "Canceled"
                                        ].map((items, i) => (
                                            <option value={items} key={i}>
                                                {items}
                                            </option>
                                        ))}
                                    </select>
                                        <button
                                            className='text-green-500 hover:text-pink-600 mx-2'
                                            onClick={() => {
                                                setOptions(-1);
                                                submitChanges(i);
                                            }}
                                        >
                                        <FaCheck />
                                    </button>
                                    </div>
                                </h1>
                            </div>
                            <div className='w-[10%] md:w-[5%]'>
                                <button
                                    className='text-xl hover:text-orange-500 checked'
                                    onClick={() => {
                                        setuserDiv("fixed");
                                        setuserDivData(items.user);
                                    }}
                                >
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div >
                    ))}
                </div>

            )}
            {userDivData && (
                <SeeUserData
                    userDivData={userDivData}
                    userDiv={userDiv}
                    setuserDiv={setuserDiv}
                />

            )}
        </>
    )
}

export default AllOrders
