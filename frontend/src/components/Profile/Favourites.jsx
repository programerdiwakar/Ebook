import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../BookCard/BookCard'

const Favourites = () => {
  const[FavouriteBooks,setFavouriteBooks]=useState();
  useEffect(() => {
    const fitch = async () => {
      const response = await axios.get("https://ebook-68rc.onrender.com/api/v1/favourites/get-favourite-books",{headers});
      setFavouriteBooks(response.data.data);
    }
    fitch();
    
  }, [FavouriteBooks]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  return (
  <>
    { FavouriteBooks && FavouriteBooks.length === 0 && (<div className='md:text-5xl text-3xl font-semibold text-zinc-500 h-screen flex justify-center items-center'>
        No Favourit Books
        <img src="./images/bookmark.png" alt="" className='md:h-[20vh] h-[7vh] my-8' />
      </div>)}

      <div className='grid grid-row-1 md:grid-cols-4 gap-4 '>
      
        {FavouriteBooks && FavouriteBooks.map((items, i) => (

        <div key={i}>
          <BookCard data={items} favourite={true} />
        </div>
      ))}
      </div>
    </>
  )
    
}

export default Favourites
