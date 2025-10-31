import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Footer from './Components/Footer.jsx'
import Navbar from './Components/Navbar.jsx'
import Register from './Components/Users/Register.jsx'
import Login from './Components/Users/Login.jsx'
import ShowProduct from './Components/Products/ShowProduct.jsx'
import Profile from './Components/Users/Profile.jsx'
import ProductDetails from './Components/Products/ProductDetails.jsx'
import Carts from './Components/Carts.jsx'
import ProductAdmin from './Components/Products/ProductAdmin.jsx'
import EditProduct from './Components/Products/EditProduct.jsx'
import AddProduct from './Components/Products/AddProduct.jsx'
import RelatedProducts from './Components/Products/RelatedProducts.jsx'
import ProductAdminDetails from './Components/Products/ProductAdminDetails.jsx'
import Address from './Components/Address.jsx'
import Checkout from './Components/Checkout.jsx'
import AllAddresses from './Components/AllAddress.jsx'
import EditAddress from './Components/EditAddress.jsx'
import ForgotPassword from './Components/Users/ForgotPassword.jsx'
import ChangePassword from './Components/Users/ChangePassword.jsx'
import { ToastContainer, Zoom } from 'react-toastify'
import Orders from './Components/Products/Orders.jsx'
import ChangeUserPassword from './Components/Users/ChangeUserPassword.jsx'
import UserOrders from './Components/Users/UserOrders.jsx'
import PaymentSuccess from './Components/PaymentSuccess.jsx'
import AdminLogin from './Components/AdminLogin.jsx'

import ProtectedRouteUser from "./Components/ProtectedRouteUser.jsx";
import ProtectedRouteAdmin from "./Components/ProtectedRouteAdmin.jsx";
import ContactUs from './Components/ContactUs.jsx'
import Review from './Components/Review.jsx'
import AdminContacts from './Components/AdminContacts.jsx'
import AdminDashboard from './Components/AdminDashboard.jsx'
import AboutUs from './Components/AboutUs.jsx'
import Home from './Components/Home.jsx'
import PrivacyAndPolicy from './Components/PrivacyAndPolicy.jsx'
import TermsAndConditions from './Components/TermsAndConditions.jsx'
import Wishlist from './Components/Wishlist.jsx'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover
theme="colored"
transition={Zoom}
/>
    <Routes>
      {/* User Panel */}
    <Route path="/Navbar" element={<Navbar />} />
    <Route path="/Footer" element={<Footer />} /> 
    <Route path="/Profile" element={<ProtectedRouteUser><Profile/></ProtectedRouteUser>}/>
    <Route path="/Contact" element={<ProtectedRouteUser><ContactUs/></ProtectedRouteUser>}/>
    <Route path="/Review" element={<ProtectedRouteUser><Review/></ProtectedRouteUser>}/>
    <Route path="/Register" element={<Register />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Wishlist" element={<ProtectedRouteUser><Wishlist/></ProtectedRouteUser>} />
    <Route path="/" element={<ProtectedRouteUser><Home/></ProtectedRouteUser>} />
    <Route path="/PrivacyAndPolicy" element={<PrivacyAndPolicy />} />
    <Route path="/TermsAndCondition" element={<TermsAndConditions />} />
    <Route path="/AboutUs" element={<ProtectedRouteUser><AboutUs /></ProtectedRouteUser>} />
    <Route path="/ForgetPassword" element={<ForgotPassword />} />
    <Route path="/ChangePassword" element={<ChangePassword />} />
    <Route path="/ChangeUserPassword" element={<ChangeUserPassword />} />
    <Route path="/Products" element={<ProtectedRouteUser><ShowProduct/></ProtectedRouteUser>} />
    <Route path="/ProductDetails/:id" element={<ProtectedRouteUser><ProductDetails/></ProtectedRouteUser>}/> 
    <Route path="/RelatedProducts" element={<ProtectedRouteUser><RelatedProducts/></ProtectedRouteUser>} />
    <Route path="/Carts" element={<ProtectedRouteUser><Carts/></ProtectedRouteUser>} />
    <Route path="/Address" element={<ProtectedRouteUser><Address/></ProtectedRouteUser>} />
    <Route path="/AddressDetails" element={<ProtectedRouteUser><AllAddresses/></ProtectedRouteUser>} />
    <Route path="/EditAddress/:id" element={<ProtectedRouteUser><EditAddress/></ProtectedRouteUser>} />
    <Route path="/Checkout" element={<ProtectedRouteUser><Checkout/></ProtectedRouteUser>} />
    <Route path="/Success" element={<ProtectedRouteUser><PaymentSuccess/></ProtectedRouteUser>} />
    <Route path="/MyOrders" element={<ProtectedRouteUser><UserOrders/></ProtectedRouteUser>} />
    
    {/* Admin Panel */}
    <Route path="/AdminLogin" element={<AdminLogin/>} />
    <Route path="/AdminDashboard" element={<ProtectedRouteAdmin><AdminDashboard/></ProtectedRouteAdmin>} />
    <Route path="/AdminContacts" element={<ProtectedRouteAdmin><AdminContacts/></ProtectedRouteAdmin>} />
    <Route path="/AdminProducts" element={<ProtectedRouteAdmin><ProductAdmin/></ProtectedRouteAdmin>}/>
    <Route path="/AdminOrders" element={<ProtectedRouteAdmin><Orders/></ProtectedRouteAdmin>} /> 
    <Route path="/AddProducts" element={<ProtectedRouteAdmin><AddProduct/></ProtectedRouteAdmin>} />
    <Route path="/EditProduct/:id" element={<ProtectedRouteAdmin><EditProduct/></ProtectedRouteAdmin>} />
    <Route path="/AdminProductDetails/:id" element={<ProtectedRouteAdmin><ProductAdminDetails/></ProtectedRouteAdmin>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App