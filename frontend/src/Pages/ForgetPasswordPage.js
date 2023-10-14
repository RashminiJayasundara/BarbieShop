import axios from 'axios';
import React, {useState} from 'react'
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function ForgetPasswordPage() {
    const [email,setEmail]=useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const submitHandler=async (e)=>{
        e.preventDefault();
        if(!email){
            toast.error(getError({message:'Please Enter an Email'})) 
        }
        else{
            if(emailRegex.test(email)){
                try{
                    const {data}=await axios.post('/api/users/forgetpassword',{
                        to:email
                    });
                    console.log(data)
                    toast.success('Check your Inbox')
                }
               catch(err){
                toast.error(getError(err))
               }
            }else{
                toast.error(getError({message:'Invalid Email'})) 
            }
        }
    

    }
  return (
    <div>
    <br></br>
        <br></br>
        <h2>Forget Password</h2>
        <div className='form'>
        <form >
            <br></br>
            <br></br>
            <div className='form-item'> 
            <label for="email" className='align-left'>Email</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='form-item '>
            <button className='color-light-pink font-size-20 link' onClick={submitHandler}>Send OTP</button>
        </div>
</form>
</div>
    </div>
  )
}
