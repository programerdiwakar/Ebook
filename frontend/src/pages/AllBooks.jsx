import React from 'react'
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import { useState,useEffect } from 'react';

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/books/get-all-books")
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
      {!Data && (
        <div className='flex items-center justify-center mt-12'>
          <Loader/>
        </div>
      )}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 '>
        {Data && Data.map((items, i) => (
          <div key={i}>
            <BookCard data={items}/>{" "}
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default AllBooks;
