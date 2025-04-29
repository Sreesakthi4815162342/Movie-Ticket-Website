const { theaterModel } = require("../model/theaterModel")
const { userModel } = require("../model/userModel")
const { generateSeatMap } = require("../utilities/generateSeatmap")
const uploadToCloudinary = require("../utilities/imageUpload")
const bcrypt=require("bcrypt")

const getTheaters=async(req,res)=>{
    try {
        const theaters=await theaterModel.find()
        res.status(200).json(theaters)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getTheater=async(req,res)=>{
    try {
        const {id}=req.params
        const theater=await theaterModel.findById(id)
        if(!theater){
            res.status(404).json("theater not found")
        }
        res.status(200).json(theater)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const createTheater=async(req,res)=>{
    try {
        const {name,location,facilities,totalSeats,rows,columns,owner,email,password}=req.body
        if(!name||!location||!facilities||!totalSeats||!rows||!columns||!owner||!email||!password){
            return res.status(404).json("all fields are required")
        }
        const existTheater=await theaterModel.findOne({name})
        if(existTheater){
            return res.status(400).json("Theater already exist")
        }
        if(!req.file){
            return res.status(400).json("Image not found")
        }
        const cloudinaryRes=await uploadToCloudinary(req.file.path)
        const seatMap=generateSeatMap(rows,columns);
        const newTheater=new theaterModel({name,location,facilities,image:cloudinaryRes,totalSeats,rows,columns,seatMap,owner})
        const savedTheater=await newTheater.save()
        const hashedPassword=await bcrypt.hash(password,10);
        const newSeller=new userModel({name:owner,email,password:hashedPassword,role:"seller",theater:savedTheater._id})
        await newSeller.save();
        res.status(201).json("Theater created Successfully")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const updateTheater=async(req,res)=>{
    try {
        const {id}=req.params
        const existtheater=await theaterModel.findById(id)
        if(!existtheater){
            res.status(404).json("theater not found")
        }
        let imageUrl;
        if(req.file){
            const cloudinaryRes=await uploadToCloudinary(req.file.path)
            imageUrl=cloudinaryRes
        }
        const updatedData={...req.body};
        if(imageUrl){
            updatedData.image=imageUrl
        }
        const theater=await theaterModel.findByIdAndUpdate(id,updatedData,{new:true})
        res.status(200).json(theater)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const deleteTheater=async(req,res)=>{
    try {
        const {id}=req.params
        const existtheater=await theaterModel.findById(id)
        if(!existtheater){
            res.status(404).json("theater not found")
        }
        const theater=await theaterModel.findByIdAndDelete(id)
        res.status(200).json("Theater deleted Successfully")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getTotalTheaters = async (req, res) => {
    try {
      const count = await theaterModel.countDocuments();
      res.status(200).json({ totalTheaters: count });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  };

module.exports={
    getTheaters,
    getTheater,
    createTheater,
    updateTheater,
    deleteTheater,
    getTotalTheaters
}