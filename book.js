const mongoose=require("mongoose");

//Creating a book schema
// @ts-ignore
const BookSchema= mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: String,
    publication: Number,
});

//Create a book modal
const BookModel=mongoose.model(BookSchema);
module.exports=BookModel;