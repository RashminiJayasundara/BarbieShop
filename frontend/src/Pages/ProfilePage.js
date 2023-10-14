import React, { useContext,useState,useReducer } from 'react'
import { Helmet } from 'react-helmet'
import { Store } from '../Store.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
import LoadingBox from '../Components/LoadingBox.js';
function reducer(state,action){
    switch(action.type){
        case 'UPDATE_REQUEST':
            return {...state,loadingUpdate:true};
        case 'UPDATE_SUCCESS':
            return {...state,loadingUpdate:false};
        case 'UPDATE_FAIL':
            return{...state,loadingUpdate:false};
        default:
            return state;
    }
}
export default function ProfilePage() {
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
    const [name,setName]=useState(userInfo.name);
    const [email,setEmail]=useState(userInfo.email);
    const [password,setPassword]=useState('');
    const [confirmpassword,setconfirmPassword]=useState('');
    const [{loadingUpdate},dispatch]= useReducer(reducer,{loadingUpdate:false});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const submitHandler=async (e)=>{
        e.preventDefault();
        if(passwordRegex.test(password)){
        if(password===confirmpassword){ 
            if(emailRegex.test(email)){
                try{
                    dispatch({type:'UPDATE_REQUEST'});
                    const {data}=await axios.put('/api/users/profile',{
                        name,
                        email,
                        password
                    },{headers:{authorization:`Bearer ${userInfo.token}`}});
                dispatch({type:'UPDATE_SUCCESS'});
                ctxDispatch({type:'USER_SIGNIN',payload:data});
                localStorage.setItem('userDetails',JSON.stringify(data));
                toast.success('Updated Successfully');
                }
                catch(err){
                    console.log('first')
                    dispatch({type:'UPDATE_FAIL'});
                    toast.error(getError(err));
                }
            }
            else{
                toast.error(getError({message:'Invalid Email'}))
            }
     
    }
    else{
        toast.error('Password do not match') 
    }
}
else{
    toast.error(getError({message:'Password must be Contain numbers,letters and specifi characters'}))
}
    }
    return (
    <div>
    <Helmet><title>User Profile</title></Helmet>
    <br></br>
    <br></br>
    <h2>User Profile</h2>
    {loadingUpdate?(<LoadingBox></LoadingBox>):
    (
        <div className='form'>
        <form >
            <br></br>
            <br></br>
            <div className='form-item'> 
            <label for="name" className='align-left'>Name</label>
        <input  id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
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
        <div className='form-item '>
            <button className='color-light-pink font-size-20 link border-radius-10' onClick={submitHandler}>Save Changes</button>
        </div>
        </form>
        </div>
    )}
   
</div>
  )
}
