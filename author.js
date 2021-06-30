const mongoose=require("mongoose");

//Creating a author schema
// @ts-ignore
const AuthorSchema= mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//Create a author modal
const AuthorModel=mongoose.model(AuthorSchema);
module.exports=AuthorModel;