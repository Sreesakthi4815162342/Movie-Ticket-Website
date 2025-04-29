const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','seller','admin'],
        default:'user'
    },
    theater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'theaters',
        require:function(){
            return this.role === 'seller'
        }
    }
},{timestamps:true})

const userModel=new mongoose.model("users",userSchema)

module.exports={
    userModel
}