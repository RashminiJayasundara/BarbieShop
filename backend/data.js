import bcrypt from 'bcryptjs';
const data={
    categories:[
        {name:"Barbies' Dresses",
        slug:"BarbiesDresses",
        image:'/image/clothes.jpg',
        products:[
            {
             
             name:'Pink Color Wedding Frock',
             slug:'Pink-Color-Wedding-Frock-moose',
             image:'/image/4.jpg',
             price:5000,
             stockCount:0,
             numOfreviews:200,
             ratings:4.3,
             description:'High Quality Silk Wedding Frock.',
             brand:'moose',
             category:"BarbiesDresses",
        },
        {
          
            name:'Pink Color Saree',
            slug:'Pink-Color-Saree-daraz',
            image:'/image/5.jpg',
            price:6000,
            stockCount:24,
            numOfreviews:20,
            ratings:4.9,
            description:'High Quality Cotton Saree.',
            brand:'daraz',
            category:"BarbiesDresses",

       },
        {
            
            name:'Pink Color Frock',
            slug:'Pink-Color-cute-Frock-kamani-product',
            image:'/image/7.jpg',
            price:2000,
            stockCount:12,
            numOfreviews:10,
            ratings:2.1,
            description:'High Quality Cotton Frock.',
            brand:'kamani-product',
            category:"BarbiesDresses",

       },    {
        
        name:'Pink Color Pant',
        slug:'Pink-Color-pant-adidas',
        image:'/image/6.jpeg',
        price:500,
        stockCount:203,
        numOfreviews:210,
        ratings:3.7,
        description:'High Quality denim pant.',
        brand:'adidas',
        category:"BarbiesDresses",

   }
      
        ]
    },
    {
        name:"Barbies' Hats",
        slug:"BarbiesHats",
        image:'/image/hats.jpeg',
        products:[]
    },{
        name:"Barbies' Shoes",
        slug:"BarbieShoes",
        image:'/image/shoes.jpg',
        products:[]
    },{
        name:"Barbies' Watches",
        slug:"BarbiesWatches",
        image:'/image/watches.jpeg',
        products:[]
    },{
        name:"Barbies' Beauty Items",
        slug:"BarbiesBeautyItems",
        image:'image/BuetyItems.jpeg',
        products:[]
    },{
        name:"Barbies' Bags",
        slug:"BarbiesBags",
        image:'image/bags.jpg',
        products:[]
    }
    ],
    users:[
        {
            
            name:'Rashmini',
            emailAddress:'rashminijayasundara@gmail.com',
           password:bcrypt.hashSync('123456'),
           isAdmin:false
        },
        {
            
            name:'Sirimal',
            emailAddress:'sirimal@gmail.com',
           password:bcrypt.hashSync('345678'),
           isAdmin:true,
        },

        
    ]
}
export default data;