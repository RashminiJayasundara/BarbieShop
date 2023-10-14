import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import category from '../models/categoryModel.js';
const categoryRouter=express.Router();
categoryRouter.get('/',expressAsyncHandler (async (req, res) => {
   const categories= await category.find() ;
    res.send(categories);
}));
export default categoryRouter;