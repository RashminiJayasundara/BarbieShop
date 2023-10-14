import mongoose from "mongoose";
const categorySchema= new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true},
    image:{type:String,required:true},
    products:[
        {
            name:{type:String,required:true},
            slug:{type:String,required:true},
            image:{type:String,required:true},
            price:{type:Number,required:true},
            stockCount:{type:Number,required:true},
            numOfreviews:{type:Number,required:true},
            ratings:{type:Number,required:true},
            description:{type:String,required:true},
            brand:{type:String,required:true},
            category:{type:String,required:true},   
        }
    ],
},{
    timestamps:true
});
const category=mongoose.model('Category',categorySchema);
export default category;