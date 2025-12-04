import Home from './pages/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx'
import AllBooks from './pages/AllBooks.jsx'
import Profile from './pages/Profile.jsx'
import Cart from './pages/Cart.jsx'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';
import Favourites from './components/Profile/Favourites.jsx';
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx';
import Settings from './components/Profile/Settings.jsx';
import AllOrders from './pages/AllOrders.jsx';
import AddBook from './pages/AddBook.jsx';
import UpdateBook from './pages/UpdateBook.jsx';


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/update/:id" element={<UpdateBook />} />
        <Route path="/profile" element={<Profile />} >
          {role === 'user' ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} />}
          {role === 'admin' && <Route path='/profile/add-book' element={<AddBook />} />}
          <Route path='/profile/orderHistory' element={<UserOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
        </Route >
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
