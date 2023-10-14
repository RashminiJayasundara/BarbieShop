import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';
export default function PaymentMethodPage() {
  
   
   const {state,dispatch:ctxDispatch}=useContext(Store);
   const {cart:{shippingAddress, paymentmethod}}=state;
   const[paymentMethod,setpaymentMethod]=useState(paymentmethod? paymentmethod:'PayPal');
   const navigate=useNavigate();
   const submitHandler=(e)=>{
    e.preventDefault();
    ctxDispatch({type:'SAVE_PAYMENT_METHOD',payload:paymentMethod})
    localStorage.setItem('paymentMethod',paymentMethod);
    navigate('/placeorder');
   };
   useEffect(()=>{
    if(!shippingAddress){
        navigate('/shipping')
    }
   },[shippingAddress,navigate])
  return (
    
    <div>
        <Helmet>
            <title>Payment</title>
        </Helmet>
        <CheckoutSteps step1={true} step2={true} step3={true}></CheckoutSteps>
        <h2>Select Your Payment Method</h2>
        <form className='form'>
            <div className='form-item align-center'>
            <label for='paypal'>
            <input type='radio' id='paypal' value='PayPal'
            checked={paymentMethod==='PayPal'}
            onChange={(e)=>setpaymentMethod(e.target.value)}></input>
            PayPal
            </label>
            </div>
            <div className='form-item'>
            <label for='stripe'>
            <input type='radio' id='stripe' value='Stripe'
            checked={paymentMethod==='Stripe'}
            onChange={(e)=>setpaymentMethod(e.target.value)}></input>
            Stripe
            </label>
            </div>
            <br></br>
        <br></br>
        <div className='form-item '>
            <button className='color-light-pink font-size-20 link border-radius-10' onClick={submitHandler}>Continue</button>
        </div>
           
        </form>
    </div>
  )
}
