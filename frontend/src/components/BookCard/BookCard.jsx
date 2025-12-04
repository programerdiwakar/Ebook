import axios from "axios";
import { Link } from "react-router-dom";


const BookCard = ({ data, favourite }) => {
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://ebook-68rc.onrender.com/api/v1/favourites/remove-book-from-favourites", {}, { headers }
    );
    alert(response.data.message);
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[22vh]" />
          </div>
          <h2 className="mt-4 text-xl front-semibold text-amber-50">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold"> by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl"> ₹ {data.price}</p>
          
        </div>
      </Link>
      {favourite && (
        <button
        className=" bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
        onClick={handleRemoveBook}
      >
        Remove from favourite
      </button>
      )}
      
    </div>
  )
}

export default BookCard;
