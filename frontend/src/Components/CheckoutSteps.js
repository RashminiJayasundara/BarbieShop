import React from 'react'
import { Link } from 'react-router-dom'
export default function CheckoutSteps(props) {
  return (
    <div >

        <div className='checkout-steps'>
            <div className={props.step1? 'active':''}>Sign In</div>
            <div className={props.step2? 'active ':''}><Link to='/shipping' className='active-link'>Shipping Address</Link></div>
            <div className={props.step3? 'active':''}><Link to='/payment' className='active-link' >Payment</Link></div>
            <div className={props.step4? 'active':''}><Link to='/placeorder' className='active-link'>Place Order</Link></div>
        </div>
    </div>
  )
}
