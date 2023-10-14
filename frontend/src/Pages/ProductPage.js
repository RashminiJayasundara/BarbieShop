import React, { useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Ratings from '../Components/Ratings.js';
import { Store } from '../Store.js';


export default function ProductPage() {
    const params=useParams();
    const {Cat_slug,Product_slug}=params;
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart,Category_data,userInfo}=state;
    const Category=Category_data.categories.find(x=>x.slug===Cat_slug);
    const Product=Category.products.find(x=>x.slug===Product_slug);
   const navigate=useNavigate();
    const AddToCartHandler=()=>{
        const exisItem= cart.cartItems.find(x=>(x._id===Product._id));
        const quantity=exisItem? exisItem.quantity+1:1;
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...Product,quantity}});
        console.log(cart)
    };
    const BuyNowHandler=()=>{
        if(userInfo!==null){
            navigate('/shipping')
        }
        else{
            navigate('/signin?redirect=/shipping')
        }
    }
  return (
    <div className='flex flex-direction-column position-absolute'>
       
        <br></br>
        <br></br>
        
        <div className=' position-absolute margin-left-top-60'>
        <img src={Product.image} alt={Product.slug} className='image-extra-normal link'></img>
        <div className='align-left margin-left-top-20 font-bold  '>
        <div className='border-bottom fornt-family-cursive font-size-20'>
        <div>{Product.name}</div>
        </div>
       <div className='border-bottom'>
       <div >LKR {Product.price}</div>
       </div>
       <div className='font-size-10'>
       <div >LKR {Product.description}</div>
       </div>
        </div>
        </div>
        <div className=' margin-left-top-right-100  grid-container'>
            <br></br>
            <br></br>
        <div className='font-bold font-size-20 grid-item-column '>Price- {Product.price}</div>
        <div className={Product.stockCount>0? 'green-box  font-bold grid-item-column':'red-box align-center font-bold grid-item-column'}>{Product.stockCount>0? 'In Stock':'Unavailable'}</div>
        <div className='grid-item-column'>
        <Ratings ratings={Product.ratings} numreviews={Product.numOfreviews} ></Ratings>
        </div>

        
        <div className='grid-item-column'>
            <button className='grid-item-row color-light-pink font-size-20 link border-radius-10' onClick={AddToCartHandler} disabled={Product.stockCount===0}>Add To Card</button>
            <button className='grid-item-row color-dark-pink font-bold font-size-20 link border-radius-10' onClick={BuyNowHandler} disabled={Product.stockCount===0}>Buy Now</button>
        </div>
        </div>
        </div>
  )
}
