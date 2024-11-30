const mongoose = require("mongoose");

module.exports.connectMongoose = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB Database!");
    }
    catch(err){
        console.error("Mongo connection Error! " + err);
    }
}