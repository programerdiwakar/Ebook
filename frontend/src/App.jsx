import Home from './pages/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import {  Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx'
import AllBooks from './pages/AllBooks.jsx'
import Profile from './pages/Profile.jsx'
import Cart from './pages/Cart.jsx'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails.jsx';

const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/all-books" element={<AllBooks/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route  path="/signUp" element={<SignUp/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/profile" element={<Profile />} />
          <Route  path="/view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
        <Footer />
      
    </div>
  )
}

export default App
