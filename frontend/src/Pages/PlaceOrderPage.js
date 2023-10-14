import React, { useContext, useEffect } from 'react'
import { Store } from '../Store.js'
import CheckoutSteps from '../Components/CheckoutSteps';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
export default function PlaceOrderPage() {
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const{cart,userInfo}=state;
    const navigate= useNavigate();
    const round2=(num)=>Math.round(num*100+ Number.EPSILON)/100;
    cart.itemPrice=round2(
      cart.cartItems.reduce((a,c)=>a+c.quantity*c.price,0)
  );
  cart.shippingPrice=cart.itemPrice>100 ? round2(0):round2(100);
  cart.taxPrice=round2(0.15*cart.itemPrice);
  cart.totalPrice=cart.itemPrice+cart.shippingPrice+cart.taxPrice;
    useEffect(()=>{
        if(userInfo===null){
            navigate('/signin?redirect=/shipping')
        }
        if(cart.paymentmethod===''){
          navigate('/payment')
        }
    },[])
  return (
    <div>
       <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> 
       <Helmet><title>Preview Order</title></Helmet>
       <h3>Preview Order</h3>
     
    <div className='grid-container'>
      <div className='grid-item-column-without_border'>
      <div className='grid-container  margin-left-top-20 '>
    <div className='grid-item-row-50  text-align-left'>
    <h4 className='text-align-left margin-left-top-20'>Shipping Address</h4>
    <strong>Name: </strong>{cart.shippingAddress.fullName}<br></br>
    <strong >Address:</strong>{cart.shippingAddress.address},
    <br></br>
    {cart.shippingAddress.city},
    <br></br>
    {cart.shippingAddress.postalCode},
    <br></br>{cart.shippingAddress.country}
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Link to='/shipping' className='font-size-20 font-bold text-align-left'>Edit</Link>
    </div>
    <div className='grid-item-row-50 text-align-left'>
    <h4 className='text-align-left margin-left-top-20'>Payment</h4>
    <strong>Method:</strong>{cart.paymentmethod}
    <h4 className='text-align-left margin-left-top-20'>Order Summery</h4>
    <strong>Delivery:</strong>LKR {cart.shippingPrice}
    <br></br>
    <strong>Tax:</strong>LKR {cart.taxPrice}
    <br></br>
    <strong>Order Total:</strong>LKR {cart.totalPrice}
    <br></br>
    <br></br>
    <div className='btn'>
    <button className='color-light-pink font-size-20 link l,'>Place Order</button>
    </div>
   <br></br>
    </div>
    </div>
      </div>
      <div className='grid-item-column-without_border'>
       <h4 className=' margin-left-top-20 text-align-lef'>Items</h4>
       
      {cart.cartItems.map((item)=>(
        <div  className='grid-container-justify  margin-left-top-20 t' >
        <div className='grid-item-row-20 '>
          <img src={item.image} alt={item.name} className='img-small'></img>
        </div>
        <div className='grid-item-row-20  text-align-left'>
          <strong>{item.name}</strong>
          </div>
          <div className='grid-item-row-20 text-align-left'>
          <strong>{item.quantity}</strong>
          </div>
          <div className='grid-item-row-20  text-align-left'>
          <strong>{item.price}</strong>
          </div>
          </div>
      ))}
       </div>
    </div>
    
       
       </div>
  )
}
