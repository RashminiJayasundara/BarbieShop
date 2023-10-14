
import express from 'express';
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import category from '../models/categoryModel.js';
const adminRouter=express.Router();

adminRouter.post('/uploadImage',isAuth,expressAsyncHandler((async(req,res)=>{
    try {
        
        if (!req.file) {
          throw new Error('No file received');
        }
        res.send('Upload Successful');
      } catch (error) {
        res.status(500).send({message:error.message});
      }
})));
adminRouter.post('/addcategory',isAuth,expressAsyncHandler(async (req,res)=>{
 const newCategory= new category({
  name:req.body.name,
  slug:req.body.slug,
  image:req.body.imageName,
  products:[]
 });
  const cate= await newCategory.save();
  res.send({
    name:cate.name,
    slug:cate.slug,
    image:cate.image,
    products:cate.products
  })
}));
adminRouter.post(`/addproduct/:category`,isAuth,expressAsyncHandler(async (req,res)=>{
  
  const exist_category= await category.findOne({slug:req.params.category});
  const newProduct= {
    name:req.body.name,
    slug:req.body.slug,
    image:req.body.imageName,
    price:req.body.price,
    stockCount:req.body.stockCount,
    numOfreviews:0,
    ratings:0,
    description:req.body.description,
    brand:req.body.brand,
    category:req.body.category,                
  };

  exist_category.products.push(newProduct);
  console.log(exist_category)
  await exist_category.save();
  res.send({message:'Successfully added'})

}));
adminRouter.post('/editcategory/:Slug',isAuth,expressAsyncHandler(async (req,res)=>{
  try{
 const existCategory=await category.findOne({slug:req.params.Slug});
 if(existCategory){
  existCategory.name= req.body.name || existCategory.name;
  existCategory.slug=req.body.slug || existCategory.slug;
  existCategory.image= req.body.imageName || existCategory.image;
  await existCategory.save();
  res.send({message:'Successfuly Updated!'})
 }
 else{
  res.send({message:'Category Not Found'})
 }
  } catch(err){
    res.send(err.message)
  }
}));
adminRouter.post('/editproduct/:cat_slug/:slug',isAuth,expressAsyncHandler(async(req,res)=>{
  
  const existCategory=await category.findOne({slug:req.params.cat_slug});
  if(existCategory){
    const existProduct= existCategory.products.map(x=>x.slug===req.params.slug);
    if(existProduct){
      existProduct.name=req.body.name || existProduct.name;
      existProduct.slug=req.body.slug || existProduct.slug;
    existProduct.image=req.body.imageName || existProduct.image  ;
    existProduct.price=req.body.price || existProduct.price;
    existProduct.stockCount=req.body.stockCount || existCategory.stockCount;
    existProduct.description=req.body.description || existProduct.description;
    existProduct.brand=req.body.brand || existProduct.brand;
    existProduct.category=req.body.category || existProduct.category; 
    };
    console.log(await category.findOne({"products.slug":req.params.slug}))
    await category.updateOne({"products.slug":req.params.slug},{$set:
      {"products.$.name":existProduct.name,
      "products.$.slug":existProduct.slug,
      "products.$.image": existProduct.image,
      "products.$.price":existProduct.price,
      "products.$.stockCount":existProduct.stockCount,
      "products.$.description":existProduct.description,
      "products.$.brand":existProduct.brand,
      "products.$.category":existProduct.category}});
    //console.log(existProduct)
    
    res.send({message:'Successfuly Updated!'})
  }
  else{
    res.send({message:'Product Not Found'})
  }
}))
export default adminRouter;