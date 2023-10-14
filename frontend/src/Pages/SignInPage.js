import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {toast} from 'react-toastify';
import { getError } from '../utils.js';
import axios from 'axios';
import { Store } from '../Store.js';

export default function SignInPage() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const {search}=useLocation();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
    const redirectURL=new URLSearchParams(search).get('redirect');
    const redirect= redirectURL?redirectURL:'/';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleFailure=(result)=>{
        console.log('aawaa')
        toast.error(getError(result));
    };
    const handleLogin=(googleData)=>{
        console.log(googleData)
    };
    const submitHandler=async (e)=>{
        e.preventDefault();
        if(emailRegex.test(email)){
        try{
            const {data}=await axios.post('/api/users/signin',{
                email,
                password
            });
            ctxDispatch({type:'USER_SIGNIN',payload:data});
            localStorage.setItem('userDetails',JSON.stringify(data));
            navigate(redirect || '/');
        }
        catch(error){
            toast.error(getError(error))
        }
    }
    else{
        toast.error(getError({message:'Invalid Email'}))
    }
    };
    useEffect(()=>{
        if(userInfo!==null){
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])
  return (
    <div>
        <br></br>
        <br></br>
        <h2>Sign In</h2>
        <div className='form'>
        <form >
            <br></br>
            <br></br>
            <div className='form-item'> 
            <label for="email" className='align-left'>Email</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
       
         <div className='form-item'> 
        <label for="password" className='align-left'>Password</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
             </div>
        <div >
           <Link to='/forgetpassword?redirect=/shipping'>Forget Password? </Link> 
        </div> 
        <br></br>
        <br></br>
        <div >
            <button className='color-light-pink font-size-20 link border-radius-10' onClick={submitHandler}>Sign In</button>
        </div>
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText=''
        onSuccess={handleLogin}
        onFailure={handleFailure}></GoogleLogin>
        <div className='margin-top-200'>
            New Customer? {" "}<Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
        </div>
        </form>
        </div>

       
       
        
    </div>
  )
}
