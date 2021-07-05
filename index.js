require("dotenv").config();
const express = require("express");

//Database
//const database=require("./database");
const mongoose=require("mongoose");

//Models
// const BookModel=require("./book");
// const AuthorModel=require("./author");
// const PublicationModel=require("./publication");

//Microservices
const Books=require("./API/Book");
const Authors=require("./API/Author");
const Publication=require("./API/Publication");

//Initialization
const booky=express();

////configuration
booky.use(express.json());

/*
Route            /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
// booky.get("/book",async(req,res)=>{
//   const getAllBooks = await BookModel.find();
//   return res.json({books: getAllBooks});  
// });

/*
Route            /
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
// booky.get("/is/:isbn",async(req,res)=>{
//     const getSpecificBook=await BookModel.findOne({ISBN:req.params.isbn});
//    // const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn);
//     if(!getSpecificBook)
//     {
//          return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});
//     }
//     return res.json({book:getSpecificBook});    
// });

/*
Route            /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
// */
// booky.get("/c/:category",async(req,res)=>{
//     const getSpecificBook = await BookModel.findOne({category:req.params.category});
//   //const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category));
//     if(!getSpecificBook)
//     {
//          return res.json({error:`No book found for the category of ${req.params.category}`});
//     }
//     return res.json({book:getSpecificBook});    
// });

/*
Route            /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       language
Methods         GET
*/
// booky.get("/l/:lang",async(req,res)=>{
//   const getSpecificBook=await BookModel.findOne({language:req.params.lang});
//   //const getSpecificBook=database.books.filter((book)=>book.language===req.params.lang);
//     if(getSpecificBook.length===0)
//     {
//          return res.json({error:`No book found for the language of ${req.params.lang}`});
//     }
//     return res.json({book:getSpecificBook});    
// });

// /*
// Route            /authtor
// Description     Get all authors
// Access          PUBLIC
// Parameter       NONE
// Methods         GET
// */
// booky.get("/author",async(req,res)=>{
//   const getAllAuthors = await AuthorModel.find();
//   return res.json({authors: getAllAuthors});    
// });

// /*
// Route            /authtor/id
// Description     Get specific authors
// Access          PUBLIC
// Parameter       isbn
// Methods         GET
// */
// booky.get("/author/:id",async(req,res)=>{
//   const getSpecificAuthor=await AuthorModel.findOne({id:parseInt(req.params.id)});
//   //const getSpecificAuthor=database.authors.filter((author)=>author.id===parseInt(req.params.id));
//     if( getSpecificAuthor.length===0)
//     {
//          return res.json({error:`No specific author found for the ID of ${req.params.id}`});
//     }
//     return res.json({book:getSpecificAuthor});    
// });

// /*
// Route            /authtor/book
// Description     Get specific authors based on books
// Access          PUBLIC
// Parameter       book
// Methods         GET
// */
// booky.get("/author/book/:book",async(req,res)=>{
//     const getSpecificAuthor=await AuthorModel.findOne({books:req.params.book});  
//   //const getSpecificAuthor=database.authors.filter((author)=>author.books.includes(req.params.book));
//     if( getSpecificAuthor.length===0)
//     {
//          return res.json({error:`No specific author found for the book of ${req.params.book}`});
//     }
//     return res.json({book:getSpecificAuthor});    
// });

/*
Route            /publication
Description     Get all publication
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
// booky.get("/publication",async(req,res)=>{
//     const getAllPublications = await PublicationModel.find();
//     return res.json({publications:getAllPublications});    
// });

// /*
// Route            /publication/id
// Description     Get specific publication
// Access          PUBLIC
// Parameter       id
// Methods         GET
// */
// booky.get("/publication/:id",async(req,res)=>{
//      const getSpecificPublication=await PublicationModel.findOne({id:parseInt(req.params.id)});   
//   // const getSpecificPublication=database.publications.filter((publication)=>publication.id===parseInt(req.params.id));
//     // if( getSpecificPublication.length===0)
//     // {
//     //      return res.json({error:`No specific publication found for the ID of ${req.params.id}`});
//     // }
//     return res.json({publications:getSpecificPublication});    
// });

// /*
// Route            /publication/book
// Description     Get specific publication based on books
// Access          PUBLIC
// Parameter       book
// Methods         GET
// */
// booky.get("/publication/book/:book",async(req,res)=>{
//      const getSpecificPublication=await PublicationModel.findOne({books:req.params.book});
//   // const getSpecificPublication=database.publications.filter((publication)=>publication.books.includes(req.params.book));
//     // if( getSpecificPublication.length===0)
//     // {
//     //      return res.json({error:`No specific publication found for the book of ${req.params.book}`});
//     // }
//     return res.json({book:getSpecificPublication});    
// });

/*
Route            /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
// booky.post("/book/add",async(req,res)=>{
//   const {newBook} = req.body;
//   BookModel.create(newBook);

//    //database.books.push(newBook);
//    return res.json({message: "book was added!" });
// });

// /*
// Route            /author/add
// Description     add new author
// Access          PUBLIC
// Parameter       NONE
// Methods         POST
// */
// booky.post("/author/add",async(req,res)=>{
//     const {newAuthor}=req.body;
//     AuthorModel.create(newAuthor);
//     //database.authors.push(newAuthor);
//     return res.json({message: "author was added!"});
// });

// /*
// Route            /publication/add
// Description     add new publication
// Access          PUBLIC
// Parameter       NONE
// Methods         POST
// */
// booky.post("/publication/add",(req,res)=>{
//     const {newPublication}=req.body;
//     PublicationModel.create(newPublication);
//    // database.publications.push(newPublication);
//     return res.json({message: "publication was added!!"});
// });

/*
Route            /book/update/title
Description      update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
// booky.put("/book/update/title/:isbn",async(req,res)=>{
//   const updatedBook=await BookModel.findOneAndUpdate(
//     {
//       ISBN:req.params.isbn,
//     },
//     {
//       title:req.body.bookTitle,
//     },
//     {
//       new:true,
//     }
//   );  
//   // database.books.forEach((book)=>{
//   //      if(book.ISBN===req.params.isbn){
//   //          book.title=req.body.newBookTitle;
//   //          return;
//   //      }
//   //   });
//     return res.json({books:updatedBook});
// });

/*
Route            /book/update/author
Description      update/add new author for a book 
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
// booky.put("/book/update/author/:isbn",async(req,res)=>{
//     //update book database
//     const updatedBook=await BookModel.findOneAndUpdate(
//       {
//         ISBN:req.params.isbn,
//       },
//       {
//         $addToSet:{
//           authors:req.body.newAuthor,
//         },
//       },  
//         {
//           new:true,
//         }, 
//     );
    
    // database.books.forEach((book)=>{
    //     if(book.ISBN===req.params.isbn){
    //         return book.author.push(parseInt(req.params.authorId));
    //     } 
    // });       
    //update author database
      //  const updatedAuthor=await AuthorModel.findOneAndUpdate(
      //    {
      //      id:req.body.newAuthor,
      //     },
      //     {
      //       $addToSet:{
      //         books:req.params.isbn,
      //       },
      //     },  
      //     {
      //       new:true,
      //     },
      //    );  
    // database.authors.forEach((author)=>{
    //     if(author.id===parseInt(req.params.authorId))
    //         return author.books.push(req.params.isbn);
    //     });
//         return res.json({
//           message:"New author was added",
//           books:updatedBook,
//           authors:updatedAuthor,
//         });  
//  });

// /*
// Route            /author/update/name
// Description      update author name using it's id
// Access          PUBLIC
// Parameter       author id
// Methods         PUT
// */
// booky.put("/author/update/name/:authorId",async(req,res)=>{
//        const updatedAuthorName=await AuthorModel.findOneAndUpdate(
//          {
//            id:parseInt(req.params.authorId),
//          },
//          {
//            name:req.body.newAuthorName,
//          },
//          {
//            new:true
//          }
//          );
//     // database.authors.forEach((author)=>{
//     //     if(author.id===parseInt(req.params.authorId)){
//     //         author.name=req.body.newAuthorName;
//     //         return;
//     //     }
//     // });
//     return res.json({authors: updatedAuthorName});
// });

// /*
// Route            /publication/update/name
// Description      update publication name using it's id
// Access          PUBLIC
// Parameter       publication id
// Methods         PUT
// */
// booky.put("/publication/update/name/:publicationId",async(req,res)=>{
//        const updatedPublicationName=await PublicationModel.findOneAndUpdate(
//          {
//            id:parseInt(req.params.publicationId),
//          },
//          {
//            name:req.body.newPublicationName,
//          },
//          {
//            new:true
//          }
//          );
//     // database.publications.forEach((publication)=>{
//     //     if(publication.id===parseInt(req.params.publicationId)){
//     //         publication.name=req.body.newPublicationName;
//     //         return;
//     //     }
//     // });
//     return res.json({publications:updatedPublicationName});
// });

// /*
// Route            /publication/update/book
// Description      update/add new book to a publication
// Access          PUBLIC
// Parameter       isbn
// Methods         PUT
// */
// booky.put("/publication/update/book/:isbn", async(req, res) => {
//     // update the publication database
//     const updatedPublicationBooks=await PublicationModel.findOneAndUpdate(
//       {
//         id:req.body.newPublication,
//       },
//       {
//         $addToSet:{
//           books:req.params.isbn,
//         },
//       },
//       {
//         new:true
//       }
//      );
//     // database.publications.forEach((publication) => {
//     //   if (publication.id === req.body.pubId) {
//     //     return publication.books.push(req.params.isbn);
//     //   }
//     // });
  
//     // update the book database
//        const updatedBookPublication=await BookModel.findOneAndUpdate(
//          {
//            ISBN:req.params.isbn,
//          },
//          {
//            $addToSet:{
//            publications:req.body.newPublication,
//            },
//          },
//          {
//            new:true
//          }
//         );
//     // database.books.forEach((book) => {
//     //   if (book.ISBN === req.params.isbn) {
//     //     book.publication = req.body.pubId;
//     //     return;
//     //   }
//     // });
  
//     return res.json({
//       books: updatedBookPublication,
//       publications: updatedPublicationBooks,
//       message: "Successfully updated publication",
//     });
//   });

/*
Route            /book/delete
Description      delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
// booky.delete("/book/delete/:isbn",async(req,res)=>{
//      const updatedBookDatabase=await BookModel.findOneAndDelete({ISBN:req.params.isbn});
//   // let updatedBookDatabase=database.books.filter((book)=>book.ISBN!=req.params.isbn);
//     // database.books=updatedBookDatabase;
//     return res.json({books:updatedBookDatabase});
// });

/*
Route            /book/delete/author
Description      delete an author from a book
Access          PUBLIC
Parameter       isbn, author id
Methods         DELETE
*/
// booky.delete("/book/delete/author/:isbn/:authorId", async(req, res) => {
//     // update the book database
//        const updatedBook=await BookModel.findOneAndUpdate(
//          {
//             ISBN:req.params.isbn,
//          },
//          {
//            $pull:{
//              authors:parseInt(req.params.authorId),
//            },
//          },
//          {
//            new:true,
//          }
//         );
//     // database.books.forEach((book) => {
//     //   if (book.ISBN === req.params.isbn) {
//     //     const newAuthorList = book.authors.filter(
//     //       (author) => author !== parseInt(req.params.authorId)
//     //     );
//     //     book.authors = newAuthorList;
//     //     return;
//     //   }
//     // });
  
//     // update the author database
//        const updatedAuthor=await AuthorModel.findOneAndUpdate(
//          {
//            id:parseInt(req.params.authorId),
//          },
//          {
//            $pull:{
//              books:req.params.isbn,
//            },
//          },
//          {
//            new:true
//          }
//         ); 
//     // database.authors.forEach((author) => {
//     //   if (author.id === parseInt(req.params.authorId)) {
//     //     const newBooksList = author.books.filter(
//     //       (book) => book !== req.params.isbn
//     //     );
  
//     //     author.books = newBooksList;
//     //     return;
//     //   }
//     // });
  
//     return res.json({
//       message: "author was deleted!!!!!!😪",
//       book: updatedBook,
//       author:  updatedAuthor,
//     });
//   });

//   /*
// Route            /author/delete
// Description      delete an author
// Access          PUBLIC
// Parameter       id
// Methods         DELETE
// */
// booky.delete("/author/delete/:authorId",async(req,res)=>{
//      const updatedAuthorDatabase=await AuthorModel.findOneAndDelete({id:parseInt(req.params.authorId)});
//   // let updatedAuthorDatabase=database.authors.filter((author)=>author.id!=parseInt(req.params.authorId));
//   // database.authors=updatedAuthorDatabase;
//   return res.json({authors:updatedAuthorDatabase});
// });

//  /*
// Route            /publication/delete
// Description      delete a publication
// Access          PUBLIC
// Parameter       id
// Methods         DELETE
// */
// booky.delete("/publication/delete/:pubId",async(req,res)=>{
//      const updatedPublicationDatabase=await PublicationModel.findOneAndDelete({id:parseInt(req.params.pubId)});
//   // let updatedPublicationDatabase=database.publications.filter((publication)=>publication.id!=parseInt(req.params.pubId));
//   // database.authors=updatedPublicationDatabase;
//   return res.json({publications:updatedPublicationDatabase});
// });

// /*
// Route           /publication/delete/book
// Description     delete a book from publication 
// Access          PUBLIC
// Parameters      isbn, publication id
// Method          DELETE
// */
// booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
//     // update publication database
    
//     database.publications.forEach((publication) => {
//       if (publication.id === parseInt(req.params.pubId)) {
//         const newBooksList = publication.books.filter(
//           (book) => book !== req.params.isbn
//         );
  
//         publication.books = newBooksList;
//         return;
//       }
//     });
  
//     // update book database
//     database.books.forEach((book) => {
//       if (book.ISBN === req.params.isbn) {
//         book.publication = 0; // no publication available
//         return;
//       }
//     });
  
//     return res.json({
//       books: database.books,
//       publications: database.publications,
//     });
//   });
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publication);
  
booky.listen(3000,()=>console.log("Hey Girl,the server is running!! 😎"));

mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(()=>console.log("connection established!!"));

