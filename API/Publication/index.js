const Router=require("express").Router();
const BookModel=require("../../book");
const PublicationModel=require("../../publication");

/*
Route            /publication
Description     Get all publication
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/",async(req,res)=>{
    const getAllPublications = await PublicationModel.find();
    return res.json({publications:getAllPublications});    
});

/*
Route            /publication/id
Description     Get specific publication
Access          PUBLIC
Parameter       id
Methods         GET
*/
Router.get("/:id",async(req,res)=>{
     const getSpecificPublication=await PublicationModel.findOne({id:parseInt(req.params.id)});   
  // const getSpecificPublication=database.publications.filter((publication)=>publication.id===parseInt(req.params.id));
    // if( getSpecificPublication.length===0)
    // {
    //      return res.json({error:`No specific publication found for the ID of ${req.params.id}`});
    // }
    return res.json({publications:getSpecificPublication});    
});

/*
Route            /publication/book
Description     Get specific publication based on books
Access          PUBLIC
Parameter       book
Methods         GET
*/
Router.get("/:book",async(req,res)=>{
     const getSpecificPublication=await PublicationModel.findOne({books:req.params.book});
  // const getSpecificPublication=database.publications.filter((publication)=>publication.books.includes(req.params.book));
    // if( getSpecificPublication.length===0)
    // {
    //      return res.json({error:`No specific publication found for the book of ${req.params.book}`});
    // }
    return res.json({book:getSpecificPublication});    
});

/*
Route            /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add",(req,res)=>{
    const {newPublication}=req.body;
    PublicationModel.create(newPublication);
   // database.publications.push(newPublication);
    return res.json({message: "publication was added!!"});
});

/*
Route            /publication/update/name
Description      update publication name using it's id
Access          PUBLIC
Parameter       publication id
Methods         PUT
*/
Router.put("/update/name/:publicationId",async(req,res)=>{
    const updatedPublicationName=await PublicationModel.findOneAndUpdate(
      {
        id:parseInt(req.params.publicationId),
      },
      {
        name:req.body.newPublicationName,
      },
      {
        new:true
      }
      );
 // database.publications.forEach((publication)=>{
 //     if(publication.id===parseInt(req.params.publicationId)){
 //         publication.name=req.body.newPublicationName;
 //         return;
 //     }
 // });
 return res.json({publications:updatedPublicationName});
});

/*
Route            /publication/update/book
Description      update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
Router.put("/update/book/:isbn", async(req, res) => {
 // update the publication database
 const updatedPublicationBooks=await PublicationModel.findOneAndUpdate(
   {
     id:req.body.newPublication,
   },
   {
     $addToSet:{
       books:req.params.isbn,
     },
   },
   {
     new:true
   }
  );
 // database.publications.forEach((publication) => {
 //   if (publication.id === req.body.pubId) {
 //     return publication.books.push(req.params.isbn);
 //   }
 // });

 // update the book database
    const updatedBookPublication=await BookModel.findOneAndUpdate(
      {
        ISBN:req.params.isbn,
      },
      {
        $addToSet:{
        publications:req.body.newPublication,
        },
      },
      {
        new:true
      }
     );
 // database.books.forEach((book) => {
 //   if (book.ISBN === req.params.isbn) {
 //     book.publication = req.body.pubId;
 //     return;
 //   }
 // });

 return res.json({
   books: updatedBookPublication,
   publications: updatedPublicationBooks,
   message: "Successfully updated publication",
 });
});

 /*
Route            /publication/delete
Description      delete a publication
Access          PUBLIC
Parameter       id
Methods         DELETE
*/
Router.delete("/delete/:pubId",async(req,res)=>{
    const updatedPublicationDatabase=await PublicationModel.findOneAndDelete({id:parseInt(req.params.pubId)});
 // let updatedPublicationDatabase=database.publications.filter((publication)=>publication.id!=parseInt(req.params.pubId));
 // database.authors=updatedPublicationDatabase;
 return res.json({publications:updatedPublicationDatabase});
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
//Router.delete("/delete/book/:isbn/:pubId", (req, res) => {
   // update publication database
   
//    database.publications.forEach((publication) => {
//      if (publication.id === parseInt(req.params.pubId)) {
//        const newBooksList = publication.books.filter(
//          (book) => book !== req.params.isbn
//        );
 
//        publication.books = newBooksList;
//        return;
//      }
//    });
 
//    // update book database
// //    database.books.forEach((book) => {
// //      if (book.ISBN === req.params.isbn) {
// //        book.publication = 0; // no publication available
// //        return;
// //      }
// //    });
 
//    return res.json({
//      books: database.books,
//      publications: database.publications,
//    });
//  });

module.exports=Router;