import React, { useContext, useEffect, useState } from 'react'
import CheckoutSteps from '../Components/CheckoutSteps'
import { Helmet } from 'react-helmet'
import {  useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function ShippingAddressPage() {
    const navigate=useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const{userInfo,cart}=state;
    const [fullName,setFullName]=useState(cart.shippingAddress? cart.shippingAddress.fullName:'');
    const [address,setAddress]=useState(cart.shippingAddress? cart.shippingAddress.address:'');
    const[city,setCity]=useState(cart.shippingAddress? cart.shippingAddress.city:'');
    const[postalCode,setPostalCode]=useState(cart.shippingAddress? cart.shippingAddress.postalCode:'');
    const [country,setCountry]=useState(cart.shippingAddress? cart.shippingAddress.country:'');
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log('lili')
        ctxDispatch({type:'SAVE_SHIPPING_ADDRESS',payload:{fullName,address,city,postalCode,country}});
        localStorage.setItem('shippingDetails',JSON.stringify({fullName,address,city,postalCode,country}))
        navigate('/payment');
    }
    useEffect(()=>{
        if(userInfo===null){
            navigate('/signin?redirect=/shipping');
        }
    },[navigate,userInfo])
  return (
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckoutSteps step1={true} step2={true}></CheckoutSteps>
        <h2>Shipping Address</h2>
        <div className='form'>
        <form onSubmit={submitHandler}>
            <br></br>
            <br></br>
            <div className='form-item'> 
            <label for="fullName" className='align-left'>Full Name</label>
        <input type="name" id="fullName" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
            </div>
       
         <div className='form-item'> 
        <label for="address" className='align-left'>Address</label>
            <input  id="address" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
             </div>
             <div className='form-item'> 
        <label for="city" className='align-left'>City</label>
            <input  id="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
             </div>
             <div className='form-item'> 
        <label for="postalCode" className='align-left'>Postal Code</label>
            <input  id="postalCode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></input>
             </div>
             <div className='form-item'> 
        <label for="country" className='align-left'>Country</label>
            <input  id="country" value={country} onChange={(e)=>setCountry(e.target.value)}></input>
             </div>
            <button type='submit' className='color-light-pink font-size-20 link border-radius-10'>Continue</button>
       </form>

        </div>
    </div>
  )
}
