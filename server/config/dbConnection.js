const mongoose=require("mongoose")

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URL)
        console.log("Connection successfull");
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    dbConnection
}