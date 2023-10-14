import React, { useState } from 'react'
import {TiThMenu} from 'react-icons/ti'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {MdAccountCircle} from 'react-icons/md';
import {IoMdArrowDropdown} from 'react-icons/io';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'
export default function NavBar() {
  const[IsSideBarOpen,setIsSideBarOpen]=useState(false);
  return (
    <div className='navbar'>
        <div className='flex position-absolute left-corner'>
        <div className='icon-container'>
            <TiThMenu className='custom-icon' onClick={setIsSideBarOpen(!IsSideBarOpen)}></TiThMenu>
       </div>
      
       <Link to='/' className='brand-link'><div className='brand'>Barbies'</div></Link>
       <div className='barcomponent'>
       <SearchBar></SearchBar>
       </div>
        </div>
      
     <div className='barcomponent position-absolute right-corner'>
        <AiOutlineShoppingCart className='custom-icon padding-right-10'></AiOutlineShoppingCart>
        <MdAccountCircle className='custom-icon '></MdAccountCircle>
        <IoMdArrowDropdown className='custom-icon padding-right-10'></IoMdArrowDropdown>
       
     </div>
    </div>
  )
}
