import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import seedRoutes from "./routes/seedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connect to Database');
}).catch(err=>{
    console.log(err.message)
})
const app = express();
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        
        cb(null,path.join(__dirname,'../frontend/public/image'));//cb-callback
    },
    filename:function(req,file,cb){
       cb(null,file.originalname);// for unique name cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload= multer({storage:storage});
app.use(express.json());
app.use('/api/seed',seedRoutes);
app.use('/api/products',categoryRouter )
app.use('/api/users',userRoutes)
app.use(upload.single('image')); 

app.use('/api/admin',adminRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("backend connected");
});
