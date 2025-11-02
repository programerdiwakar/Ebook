import React from 'react'

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: 'About Us',
            link: '/about-us'
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
    return (
        <div className='bg-zinc-800 px-8 py-2 text-white flex justify-between items-center'>

            <div className='flex items-center '>
                <img src="./images/logo.png" alt="" className='h-16 pt-2 ' />
                <h1 className='text-2xl font-semibold'>BookNest</h1>
            </div>

            <div className='nav-links-booknest  flex  items-center gap-2'>
                <div className='flex gap-4'>
                    {links.map((items, i) => (
                        <div key={i} className='hover:text-blue-500 transition-all duration-300'>{items.title}</div>
                    ))}
                </div>
                <div className='flex gap-4'>
                    <button className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignIn</button>
                    <button className=' px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</button>
                </div>

            </div>
        </div>
    )
}

export default Navbar
