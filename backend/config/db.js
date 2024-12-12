import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://boris143111:qwertyuiop@cluster0.ia8wc.mongodb.net/reactjs-food-delivery-app').then(()=>{
       console.log('DB connected') ;
    })
}