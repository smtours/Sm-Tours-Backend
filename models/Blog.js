import mongoose from "mongoose";

const blogschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    picture:{
    type :String,
      required:true
    },
   
    description:{
        type:String,
        required:true
    }
})


const Blog=mongoose.model("blogs",blogschema)
export default Blog