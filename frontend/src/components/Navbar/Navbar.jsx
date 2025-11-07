import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: 'All Books',
            link: '/all-books'
        },
        {
            title: 'Cart',
            link: '/cart'
        },
        {
            title: 'Profile',
            link: '/profile'
        },
    ];
    const [MobileNav, setMobileNav] = useState("hidden");
    return (
        <>
            <nav className='bg-zinc-800 px-8 py-2 text-white relative z-50 flex justify-between items-center'>

                <Link to='/' className='flex items-center '>
                    <img src="./images/logo.png" alt="" className='h-16 pt-2 ' />
                    <h1 className='text-2xl font-semibold'>BookNest</h1>
                </Link>
                <div className='nav-links-booknest block md:flex  items-center gap-2'>
                    <div className=' hidden md:flex gap-4'>
                        {links.map((items, i) => (
                            <Link to={items.link} key={i} className='hover:text-blue-500 transition-all duration-300'>{items.title}</Link>
                        ))}
                    </div>

                    <div className=' hidden md:flex gap-4'>
                        <Link to='/signIn' className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignIn</Link>
                        <Link to='/signUp' className=' px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
                    </div>
                    <button className='text-white text-2xl hover:text-zinc-400' onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link
                        to={items.link}
                        className={` ${MobileNav} text-white text-4xl mb-10 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                    >
                        {items.title}{" "}
                    </Link>
                ))}
                <Link
                    to='/signIn' 
                    className={`${MobileNav} px-4 py-2 mb-10 border text-3xl font-semibold text-white border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                    onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                >
                    SignIn
                </Link>
                <Link to='/signUp' className={`${MobileNav} px-4 py-2 mb-10 text-3xl font-semibold text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-3001`}
                    onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                >
                    SignUp
                </Link>
            </div>
        </>

    )
}

export default Navbar
