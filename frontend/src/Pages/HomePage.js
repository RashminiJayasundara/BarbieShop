import React, { useContext, useEffect,useReducer, useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Store } from '../Store.js';
import LoadingBox from '../Components/LoadingBox.js'
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
import {AiFillPlusCircle } from 'react-icons/ai';
import {BiSolidEditAlt} from 'react-icons/bi';
import AddCategoryBox from '../Components/AddCategoryBox.js';
import EditCategoryBox from '../Components/EditCategoryBox.js';
import ImageSlider from '../Components/ImageSlider.js';
export default function HomePage() {
  const reducer = (state,action)=>{
    
    switch(action.type){
        case 'FETCH_REQUEST':
          
            return {...state,loading:true};
        case 'FETCH_SUCCESS':
            return {...state,loading:false};
        case 'FETCH_FAIL':
          
            return {}
        default:
            return state;
    }
  }
    
 const [openBox,setOpenBox]=useState(false);
 const [openEditBox,setOpenEditBox]=useState(false);
 const [name,setName]=useState();
 const [slug,setSlug]=useState();
 const[image,setImage]=useState();
const {state,dispatch:ctxDispatch}=useContext(Store);
const{Category_data,userInfo}=state;
const data=Category_data;
const[{loading,error},dispatch]=useReducer(reducer,{
  loading:true,error:'',
});

useEffect(()=>{
  const fetchData = async () => {
    
    try {
      dispatch({type:'FETCH_REQUEST'})
      const result = await axios.get("/api/products");
      ctxDispatch({type:'ADD_CATEGORY_DATA',payload:result.data});
      dispatch({type:'FETCH_SUCCESS'})
      console.log('first')
      
      
    } catch (error) {
      toast.error(getError(error))
      dispatch({ type: 'FETCH_FAIL'});
    }
  };
  
  fetchData();
 
},[userInfo])

  return (
    <div>
      {loading?(
        <LoadingBox></LoadingBox>
      ):
    (
      <div>
        {openBox && <AddCategoryBox onClose={()=>setOpenBox(false)}></AddCategoryBox>}
        {openEditBox && <EditCategoryBox onClose={()=>setOpenEditBox(false)} Name={name} Slug={slug} ImageName={image}></EditCategoryBox>}
      <div className='flex-column' >   
      <ImageSlider></ImageSlider>
      <div className='grid-container'> 
      {data.categories.map(category=>(
         
          <div className='flex grid-item-flex25 img-link border-radius-10' id={category.slug} onClick={()=>{setName(category.name); setSlug(category.slug); setImage(category.image)}}>
           
             <Link to={`/category/${category.slug}`}>
              <img src={category.image} alt={category.name} className='image-normal'></img>
              </Link> 
              <Link to={`/category/${category.slug}`} className='link'>
              <strong>{category.name}</strong>
              </Link>
              
              {userInfo?userInfo.isAdmin?(<BiSolidEditAlt className='admin-icon' onClick={()=>setOpenEditBox(true)}></BiSolidEditAlt>):(<></>):(<></>)}
          </div>

      ))}
      </div>
      
      
      </div>
      {userInfo?(userInfo.isAdmin?(<AiFillPlusCircle className='admin-icon' onClick={()=>setOpenBox(true)}></AiFillPlusCircle>):(<></>)):(<></>)}
      </div>
    )}

    </div>

  )
}
