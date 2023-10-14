import React,{useContext,useState} from 'react'
import AddProductBox from '../Components/AddProductBox.js';
import {Link, useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Ratings from '../Components/Ratings.js';
import { Store } from '../Store.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import {BiSolidEditAlt} from 'react-icons/bi';
import EditProductBox from '../Components/EditProductBox.js';
export default function CategoryPage() {
    const params= useParams();
    const {slug}=params;
  const {state}=useContext(Store);
  const [openEditBox,setOpenEditBox]=useState(false);
  const{Category_data,userInfo}=state;
  const data=Category_data;
  const [openBox,setOpenBox]=useState(false);
  const [name,setName]=useState();
  const [Pro_slug,setSlug]=useState();
  const[image,setImage]=useState();
  const[price,setPrice]=useState();
  const[StockCount,setstockCount]=useState();
  const[description,setdescription]=useState();
  const[category,setcategory]=useState();
  const[brand,setbrand]=useState();
  return (

    <div>
      <Helmet><title>{slug}</title></Helmet>
       <br></br>
       <br></br> 
       <div>
       <h2>{data.categories.find(x=>(x.slug===slug)).name}</h2>
       {openBox && <AddProductBox onClose={()=>setOpenBox(false)} cat_slug={slug}></AddProductBox>} 
       {openEditBox && <EditProductBox onClose={()=>setOpenEditBox(false)} Name={name} Slug={Pro_slug} ImageName={image} cat_slug={slug} Price={price} StockCount={StockCount} Description={description}  Brand={brand} Category={category}></EditProductBox>}
        <div className='grid-container'>
        {
        data.categories.find(x=>(x.slug===slug)).products.map(product=>(
        
         <div className=' flex grid-item-flex20 img-link  flex-direction-column' id={product.id} onClick={()=>{setName(product.name); setSlug(product.slug); setImage(product.image); setPrice(product.ptice); setstockCount(product.StockCount); setdescription(product.description); setcategory(product.category); setbrand(product.brand)}}>
           <Link to={`/category/${slug}/product/${product.slug}`}>
         <img src={product.image} alt={product.name} className='image-normal'></img>
         </Link>
         <div className='align-left'>
         <div className='font-bold fornt-family-cursive font-size-20 '><Link to={`/category/${slug}/product/${product.slug}`} className='link'>{product.name}</Link></div>
         <div>{product.price}</div>
         <Ratings ratings={product.ratings} numreviews={product.numOfreviews}></Ratings>
         {userInfo?userInfo.isAdmin?(<BiSolidEditAlt className='admin-icon' onClick={()=>setOpenEditBox(true)}></BiSolidEditAlt>):(<></>):(<></>)}
           </div>
      </div>
      
        )) 
        }
         {userInfo?(userInfo.isAdmin?(<AiFillPlusCircle className='admin-icon' onClick={()=>setOpenBox(true)}></AiFillPlusCircle>):(<></>)):(<></>)}
        </div>
       </div>
        
        </div>
    
   
  )
}
