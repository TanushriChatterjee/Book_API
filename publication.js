const mongoose=require("mongoose");

//Creating a publication schema
// @ts-ignore
const PublicationSchema= mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//Create a publication modal
const PublicationModel=mongoose.model(PublicationSchema);
module.exports=PublicationModel;