import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"


const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);

    return (
        <>
            {role === 'user' && (
                <div className='w-full flex items-center justify-between mt-4 lg:hidden mb-2'>
                    <Link
                        to="/profile"
                        className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded tarnsition-all'
                    >Favourites</Link>
                    <Link
                        to="/profile/orderHistory"
                        className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded tarnsition-all'
                    >Order History</Link>
                    <Link
                        to="/profile/settings"
                        className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded tarnsition-all'
                    >Setting</Link>

                </div>
            )}
            {role === 'admin' && (
                <div className='w-full flex items-center justify-between mt-4 lg:hidden mb-2'>
                    <Link
                        to="/profile"
                        className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded tarnsition-all'
                    >All Order</Link>
                    <Link
                        to="/profile/add-book"
                        className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded tarnsition-all'
                    >Add Book</Link>

                </div>
            )}
        </>
    )
}

export default MobileNav
