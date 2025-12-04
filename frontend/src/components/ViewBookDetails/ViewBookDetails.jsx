import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr";
import { GoHeartFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


const ViewBookDetails = () => {
  const { id } = useParams(); // useParams help to access dynamic parameters from the current URL path
  const navigate = useNavigate()
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://ebook-68rc.onrender.com/api/v1/books/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }

  const handleFavourites = async () => {
    try {
      const response = await axios.put("https://ebook-68rc.onrender.com/api/v1/favourites/add-book-to-favourites", {}, { headers })
    alert(response.data.message)
    }
    catch (err) {
      alert(err.response.data.message);
    }
    
  }

  const handleCart = async () => {
    try {
      const response = await axios.put("https://ebook-68rc.onrender.com/api/v1/cart/add-to-cart", {}, { headers });
      alert(response.data.message)
    }
    catch (error) {
      alert(error.response.data.message);
      
    }
  };

  const deleteBook = async () => {
    const res = await axios.delete('https://ebook-68rc.onrender.com/api/v1/books/delete-book',
      { headers }
    )
    alert(res.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {Data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 '>
          <div className='lg:w-3/6  w-full '>
            <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12'>
              <img src={Data?.url} alt="" className='h-[50] md:h-[60vh] lg:h-[70vh] rounded' />
              {isLoggedIn && role === 'user' && (
                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                  <button className='text-3xl p-1 text-red-500 flex items-center justify-center'onClick={handleFavourites} >
                    <GoHeartFill />{" "}
                    <span className='ms-2 block lg:hidden '>Favourites</span>
                  </button>
                  <button className='text-3xl mt-8 md:mt-0 p-3 text-yellow-500 lg:mt-4 flex items-center justify-center' onClick={handleCart}>
                    <FaShoppingCart />
                    <span className='ms-2 block lg:hidden '>Add to cart</span>
                  </button>
                </div>
              )}

              {isLoggedIn && role === 'admin' && (
                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                  <Link to={`/update/${id}`} className='text-3xl p-3 text-white flex items-center justify-center' >
                    <BiSolidEdit />
                    <span className='ms-2 block lg:hidden '>Edit</span>
                  </Link>
                  <button className='text-3xl mt-8 md:mt-0 p-3 text-yellow-500  lg:mt-4 flex items-center justify-center' onClick={deleteBook}>
                    <MdDeleteOutline />
                    <span className='ms-2 block lg:hidden '>Delete</span>
                  </button>
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