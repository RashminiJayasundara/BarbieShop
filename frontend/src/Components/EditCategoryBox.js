import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store.js';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
import { useNavigate } from 'react-router-dom';

export default function EditCategoryBox(props) {
 const {onClose,Name,Slug,ImageName}=props
  const {state}=useContext(Store);
  const navigate= useNavigate();
  const {userInfo}=state;
  const [name,setName]=useState(Name);
  const [slug,setSlug]=useState(Slug);
  const[image,setImage]=useState();
  const[imageName,setimageName]=useState(ImageName);
  const [selectedImage, setSelectedImage] = useState(null);
  const submitHandler=async(e)=>{
    e.preventDefault();
    
      if(name){
        if(slug){
          try{
            const {data}= await axios.post(`/api/admin/editcategory/${Slug}`,{
              name:name,
              slug:slug,
              imageName:imageName,
            },{
              headers:{authorization:`Bearer ${userInfo.token}`}
            });
            toast.success(data.message);
           navigate('/')
          }catch(err){
            toast.error(getError(err));
          }
        }
        else{
          toast.error('Pleace Enter a Slug for Category')
        }
      }
      else{
        toast.error('Pleace Enter a Name for Category')
      }
    
  };
  const handlesImageUpload=(e)=>{
    setImage(e.target.files[0]);
    const file=e.target.files[0]
      const reader= new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);

      };
      if(file){
        reader.readAsDataURL(file);
      }
  }
  const uploadImageHandler=async(e)=>{
    e.preventDefault();
    //e.target.files-- fileList{file,length}  we want file, so e.target.files[0]
    if(image){
      const ImageData= new FormData();
      ImageData.append('image',image);
      console.log(image)
      if(image.size<1000000){
        try{
          await axios.post('/api/admin/uploadImage',
          ImageData,{
            headers:{authorization:`Bearer ${userInfo.token}`}
          });
          setimageName('/image/'+image.name);
          toast.success('Successfuly Uploaded!');
          
        }
        catch(err){
          toast.error(getError(err));
        }
      }
     else{
      toast.error('Your Image Size is too large')
     }
    }else{
      toast.error('Pleace Choose an Image')
    }
    
   
  }
  useEffect(()=>{

  },[userInfo])
  return (
    <div className='form-top'>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='form'>
      <span  onClick={onClose} className='cursor-pointer'>&times;</span>
      <h3>Edit Category</h3>
      <form>
      <div className='form-item'> 
            <label for="name" className='align-left'>Category Name</label>
        <input  id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
       <div className='form-item'> 
            <label for="slug" className='align-left'>Category Slug</label>
        <input  id="slug" value={slug} onChange={(e)=>setSlug(e.target.value)}/>
            
            </div>
            <div className='form-item'> 
            <label for="image" className='align-left'>Category Image</label>
        <input  id="image" type='file' accept='image/*'onChange={handlesImageUpload}/>
        
            </div>
            {selectedImage && (<img src={selectedImage} alt="selected" style={{maxWidth:'200px'}}></img>)}
            <div className='btn'><button onClick={uploadImageHandler} className='color-dark-pink link border-radius-10 '>Upload Image</button></div>
            <br></br>
            <div className='btn' >
            <button className='color-light-pink font-size-20 link border-radius-10' onClick={submitHandler}>Save Changes</button>
        </div>
      </form>
      </div>
    </div>
  )
}
