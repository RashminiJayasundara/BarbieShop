import React, { useContext, useState,useReducer } from "react";
import {TiThMenu} from 'react-icons/ti'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {MdAccountCircle} from 'react-icons/md';
import {IoMdArrowDropdown} from 'react-icons/io';
import SearchBar from '../src/Components/SearchBar';
import {Link} from 'react-router-dom'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import { Helmet } from "react-helmet";
import HomePage from "./Pages/HomePage";
import CategoryPage from "./Pages/CategoryPage";
import ProductPage from "./Pages/ProductPage";
import { Store } from "./Store.js";
import CartPage from "./Pages/CartPage";
import SignInPage from "./Pages/SignInPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressPage from "./Pages/ShippingAddressPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ProfilePage from "./Pages/ProfilePage";
import PaymentMethodPage from "./Pages/PaymentPageMethod";
import PlaceOrderPage from "./Pages/PlaceOrderPage";


function App() {
  const[IsSideBarOpen,setIsSideBarOpen]=useState(false);
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const {cart}=state;
  const{Category_data,userInfo}=state;
  const data=Category_data;
  const [isDropDownOpen,setisDropDownOpen]=useState(false);
  const handleMouseEnter=()=>{
    setisDropDownOpen(true);
  };
const handleMouseLeave=()=>{
  setisDropDownOpen(false);
};
const signOutHandler=()=>{
  ctxDispatch({type:'USER_SIGN_OUT'});
  localStorage.removeItem('userDetails');
  localStorage.removeItem('CartItems');
  window.location.href='/signin';
};
  return (
    <div >
      <BrowserRouter>
      <ToastContainer position="bottom-center"></ToastContainer>
      <Helmet><title>Barbies' Shop</title></Helmet>
      <div>
      <header>
      <div className={IsSideBarOpen? 'navbar active-sidebar ' :'navbar margin-0-auto'}>
        <div className='flex position-absolute left-corner'>
        <div className='icon-container'>
            <TiThMenu className='custom-icon' onClick={()=>setIsSideBarOpen(!IsSideBarOpen)}></TiThMenu>
       </div>
       <Link to='/' className='brand-link'><div className='brand'>Barbies'</div></Link>
       <div className='barcomponent'>
       <SearchBar></SearchBar>
       </div>
        </div> 
     <div className={IsSideBarOpen?'barcomponent position-absolute right-corner active-sidebar-effect':'barcomponent position-absolute right-corner'}>
    <div className="position-relative display-inline ">
      {userInfo? (userInfo.isAdmin? (<strong className=" padding-right-10 padding-top-10">Admin</strong> ):(<></>)): (<></>)}
     <Link to='/cart' ><AiOutlineShoppingCart className='custom-icon padding-right-10' onClick={()=>setIsSideBarOpen(false)}></AiOutlineShoppingCart></Link> 
      {cart.cartItems!==0 && (<div className="white-circle font-bold">{cart.cartItems.reduce((a,c)=>a+c.quantity,0)}</div>)}
      </div> 
        <MdAccountCircle className='custom-icon '></MdAccountCircle>
        
        <IoMdArrowDropdown className='custom-icon padding-right-10' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={()=>setIsSideBarOpen(false)}></IoMdArrowDropdown>
       
     </div>
    </div>
      </header>
      {IsSideBarOpen && (
          <div className="side-bar">
            <h1 className="align-center">Categories</h1>
            <br></br>
            {data.categories.map(category=>(
              <div className="align-center">
              <div className="select-box" >
              <div className=" font-bold fornt-family-cursive font-size-20 "><Link to={`/category/${category.slug}`} className="link" onClick={()=>setIsSideBarOpen(false)}>{category.name}</Link></div>
              </div>
               
               
                <br></br>
                
             
              </div>
                           
      ))}
          </div>
      )}
      {isDropDownOpen && (
        <div className="dropdown-wraper z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="dropdown-content">
        {userInfo!==null ?
          (<div>
          <h4>Hi {userInfo.name}</h4>
          <Link to='/userProfile' className="link"><p>User Profile</p></Link>
          <Link to='/orderhistory' className="link"><p>Order History</p></Link>
          <Link to='#signout' onClick={signOutHandler} className="link"><p>Sign Out</p></Link>
          </div>)
          :(<Link to='/signin' className="link"><h4>Sign In</h4></Link>)}
          
          </div>
        </div>
      )}
      </div>
    

      <main className={IsSideBarOpen? 'align-center active-sidebar ':'align-center '}>
        
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path="/category/:slug" element={<CategoryPage></CategoryPage>}></Route>
          <Route path="/category/:Cat_slug/product/:Product_slug" element={<ProductPage></ProductPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
          <Route path='/shipping' element={<ShippingAddressPage></ShippingAddressPage>}></Route>
          <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>
          <Route path='/forgetpassword' element={<ForgetPasswordPage/>}></Route>
          <Route path='/userProfile' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/payment' element={<PaymentMethodPage></PaymentMethodPage>}></Route>
          <Route path='/placeorder' element={<PlaceOrderPage></PlaceOrderPage>}></Route>
          </Routes>
      </main>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
