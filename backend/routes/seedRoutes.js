import express from 'express';
import category from '../models/categoryModel.js';
import data from '../data.js';
import user from '../models/userModel.js';
const seedRoutes=express.Router();
seedRoutes.get('/',async(req,res)=>{
    await category.deleteMany({});
    const createCategory=await category.insertMany(data.categories);
    await user.deleteMany({});
    const createUser=await user.insertMany(data.users);
    res.send({createCategory,createUser});
})
export default seedRoutes;