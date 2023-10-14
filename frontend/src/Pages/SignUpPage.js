import axios from 'axios';
import React ,{useState,useContext, useEffect}from 'react'
import { Helmet } from 'react-helmet'
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { Store } from '../Store.js';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
export default function SignUpPage() {
    const {search}=useLocation();
    const redirectUrl= new URLSearchParams(search).get('redirect');
    const redirect= redirectUrl? redirectUrl:'/';
    console.log(redirect)
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setconfirmPassword]=useState('');
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(passwordRegex.test(password)){
        if(password!==confirmpassword){
          
            toast.error(getError({message:'Password do not match'}))
        }else{
            if(emailRegex.test(email)){
        try{
    const {data}= await axios.put('/api/users/signup',{
        name:name,
        emailAddress:email,
        password:password
    });
    ctxDispatch({type:'USER_SIGNIN',payload:data});
    localStorage.setItem('userDetails',JSON.stringify(data));
    navigate(redirect || '/');
    }catch(err){
        toast.error(getError(err));
    }
}
    else{
        toast.error(getError({message:'Invalid Email'}))
    } 
        } 
    }
    else{
        toast.error(getError({message:'Password must be Contain numbers,letters and specifi characters'}))
    } 
    };
   
    
    useEffect(()=>{
        if(userInfo!==null){
            navigate(redirect);
        }
    },[navigate,userInfo,redirect])
  return (
    <div>
        <Helmet><title>Sign Up</title></Helmet>
        <br></br>
        <br></br>
        <h2>Sign Up</h2>
        <div className='form'>
        <form >
            <br></br>
            <br></br>
            <div className='form-item'> 
            <label for="name" className='align-left'>Name</label>
        <input  id="email" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='form-item'> 
            <label for="email" className='align-left'>Email</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
       
         <div className='form-item'> 
        <label for="password" className='align-left'>Password</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
             </div>
             
         <div className='form-item'> 
        <label for="confirmpassword" className='align-left'>Confirm Password</label>
            <input type="password" id="confirmpassword" value={confirmpassword} onChange={(e)=>setconfirmPassword(e.target.value)}></input>
             </div>
        
        <br></br>
        <br></br>
        <div >
            <button className='color-light-pink font-size-20 link border-radius-10' onClick={submitHandler}>Sign Up</button>
        </div>
        </form>
        </div>
    </div>
  )
}
