import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
export default function SearchBar() {
    const [searchContent,setsearchContent]=useState('');
    const submitHandler=()=>{
        
    }
  return (
    <div >
        <form>
            <div className='flex'> 
            <input className='inputbar'
            value={searchContent} 
            onChange={(e)=>setsearchContent(e.target.value)}
            placeholder='Search Products..'
            >
            </input>
            <div className=''>
            <AiOutlineSearch className='custom-icon' onClick={submitHandler}></AiOutlineSearch>
            </div>
            </div>
            
           
        </form>
    </div>
  )
}
