import React, { useContext } from 'react'
import { Store } from '../Store.js';
import {Link, useNavigate} from 'react-router-dom';
import MessageBox from '../Components/MessageBox.js';
import {AiOutlinePlus,AiOutlineMinus,AiOutlineDelete} from 'react-icons/ai';
export default function CartPage() {
    const navigate=useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart,userInfo}=state;
    const updadteCartHandler=(item,quantity)=>{
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}});
    };
    const removeItemHandler=(item)=>{
        console.log(item)
        ctxDispatch({type:'CART_REMOVE_ITEM',payload:item});
        
    };
    const subitHandler=()=>{
        navigate('/signin?redirect=/shipping')
    };
  return (
    
    <div className='grid-container position-absolute margin-left-top-60'>
               <br></br>
       <br></br>
        {cart.cartItems.length===0?
         (<div>
            <MessageBox message='Cart is Empty ' variant='light-pink position-fixed'><Link to='/' className='font-bold'>Go Shopping</Link></MessageBox>
         </div>):(<div>
            {cart.cartItems.map(item=>(
            <div className='grid-item-column'>
                <div className='grid-container'>
                  
                <Link to={`/category/${item.category}/product/${item.slug}`} > <img src={item.image} alt={item.slug} className='img-small'></img></Link>
               <Link to={`/category/${item.category}/product/${item.slug}`} > <h4>{item.name}</h4></Link>
              <div className=' grid-container position-absolute margin-left-300  align-center'>
              <AiOutlinePlus className='row active-icon' onClick={()=>{if(item.quantity<item.stockCount){updadteCartHandler(item,item.quantity+1)} }}></AiOutlinePlus>
              <div className='row'>{item.quantity}</div>
              <AiOutlineMinus className='row active-icon' onClick={()=>{if(item.quantity>0){updadteCartHandler(item,item.quantity-1)}}}></AiOutlineMinus>
              </div>
                <div className='margin-top-30 margin-left-300  align-center padding-left-300'>
                <AiOutlineDelete className='active-icon' onClick={()=>removeItemHandler(item)} ></AiOutlineDelete>
                </div>
             
              </div>
            </div>
        ))}
         </div>)}
         <div className='align-right position-relative right-corner'>
        <br></br>
        <br></br>
        <h3>SubTotal  LKR {cart.cartItems.reduce((a,c)=>a+c.quantity*c.price,0)}</h3>
        <button className='color-light-pink font-size-20 img-link border-radius-10' onClick={subitHandler} disabled={cart.cartItems.reduce((a,c)=>a+c.quantity,0)===0}> Proceed to Checkout</button>
    </div>
    
         </div> 
  
  )
}
