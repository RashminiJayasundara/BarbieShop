import React, { useEffect, useState } from 'react'

export default function ImageSlider() {
    const [currentSlide,setcurrentSlide]=useState(0);
    const slides=[
        '/image/3.jpg',
        '/image/1.jpg',
        '/image/2.jpeg',
        '/image/4.jpg'
    ];
    
    useEffect(()=>{
        const interval=setInterval(()=>{
            console.log(currentSlide)
            setcurrentSlide(pre=>(pre+1)%slides.length);
            console.log(currentSlide)
        },1000);
        return()=>clearInterval(interval);
    },[])
  return (
    <div>
       <br></br>
        <br></br>
        <br></br>
    <div className='slider-container'>
       
        {slides.map((slide,index)=>(
            <div key={index} className={`slide ${index===currentSlide ?'active1':index===currentSlide+1? 'active':''} `}>
                <img src={slide} alt={`Slide ${index}`} className='slide-item'></img>
            </div>
        ))}
     </div>  
    </div>
  )
}
