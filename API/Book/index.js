//This is initializing Express Router
const Router=require("express").Router();
const BookModel=require("../../book");

/*
Route            /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
// @ts-ignore
Router.get("/",async(req,res)=>{
    // @ts-ignore
    const getAllBooks = await BookModel.find();
    return res.json({books: getAllBooks});  
  });

  /*
Route            /
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
Router.get("/is/:isbn",async(req,res)=>{
    // @ts-ignore
    const getSpecificBook=await BookModel.findOne({ISBN:req.params.isbn});
   // const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(!getSpecificBook)
    {
         return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book:getSpecificBook});    
});

/*
Route            /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
Router.get("/c/:category",async(req,res)=>{
    // @ts-ignore
    const getSpecificBook = await BookModel.findOne({category:req.params.category});
  //const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category));
    if(!getSpecificBook)
    {
         return res.json({error:`No book found for the category of ${req.params.category}`});
    }
    return res.json({book:getSpecificBook});    
});

/*
Route            /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       language
Methods         GET
*/
// @ts-ignore
Router.get("/l/:lang",async(req,res)=>{
    // @ts-ignore
    const getSpecificBook=await BookModel.findOne({language:req.params.lang});
    //const getSpecificBook=database.books.filter((book)=>book.language===req.params.lang);
      if(getSpecificBook.length===0)
      {
           return res.json({error:`No book found for the language of ${req.params.lang}`});
      }
      return res.json({book:getSpecificBook});    
  });

  /*
Route            /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
// @ts-ignore
Router.post("/add",async(req,res)=>{
   try {
    const {newBook} = req.body;
    // @ts-ignore
   await BookModel.create(newBook);
  
     //database.books.push(newBook);
     return res.json({message: "book was added!" });
   }catch(error){
          return res.json({error:error.message});
   }
  });

  /*
Route            /book/update/title
Description      update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
// @ts-ignore
Router.put("/update/title/:isbn",async(req,res)=>{
    // @ts-ignore
    const updatedBook=await BookModel.findOneAndUpdate(
      {
        ISBN:req.params.isbn,
      },
      {
        title:req.body.bookTitle,
      },
      {
        new:true,
      }
    );  
    // database.books.forEach((book)=>{
    //      if(book.ISBN===req.params.isbn){
    //          book.title=req.body.newBookTitle;
    //          return;
    //      }
    //   });
      return res.json({books:updatedBook});
  });
  
  /*
  Route            /book/update/author
  Description      update/add new author for a book 
  Access          PUBLIC
  Parameter       isbn
  Methods         PUT
  */
  // @ts-ignore
  Router.put("/update/author/:isbn",async(req,res)=>{
      //update book database
      // @ts-ignore
      const updatedBook=await BookModel.findOneAndUpdate(
        {
          ISBN:req.params.isbn,
        },
        {
          $addToSet:{
            authors:req.body.newAuthor,
          },
        },  
          {
            new:true,
          }, 
      );
      
      // database.books.forEach((book)=>{
      //     if(book.ISBN===req.params.isbn){
      //         return book.author.push(parseInt(req.params.authorId));
      //     } 
      // });       
      //update author database
         // @ts-ignore
         const updatedAuthor=await AuthorModel.findOneAndUpdate(
           {
             id:req.body.newAuthor,
            },
            {
              $addToSet:{
                books:req.params.isbn,
              },
            },  
            {
              new:true,
            },
           );  
      // database.authors.forEach((author)=>{
      //     if(author.id===parseInt(req.params.authorId))
      //         return author.books.push(req.params.isbn);
      //     });
          return res.json({
            message:"New author was added",
            books:updatedBook,
            authors:updatedAuthor,
          });  
   });

   /*
Route            /book/delete
Description      delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
// @ts-ignore
Router.delete("/delete/:isbn",async(req,res)=>{
    // @ts-ignore
    const updatedBookDatabase=await BookModel.findOneAndDelete({ISBN:req.params.isbn});
 // let updatedBookDatabase=database.books.filter((book)=>book.ISBN!=req.params.isbn);
   // database.books=updatedBookDatabase;
   return res.json({books:updatedBookDatabase});
});

/*
Route            /book/delete/author
Description      delete an author from a book
Access          PUBLIC
Parameter       isbn, author id
Methods         DELETE
*/
// @ts-ignore
Router.delete("/delete/author/:isbn/:authorId", async(req, res) => {
   // update the book database
      // @ts-ignore
      const updatedBook=await BookModel.findOneAndUpdate(
        {
           ISBN:req.params.isbn,
        },
        {
          $pull:{
            authors:parseInt(req.params.authorId),
          },
        },
        {
          new:true,
        }
       );
   // database.books.forEach((book) => {
   //   if (book.ISBN === req.params.isbn) {
   //     const newAuthorList = book.authors.filter(
   //       (author) => author !== parseInt(req.params.authorId)
   //     );
   //     book.authors = newAuthorList;
   //     return;
   //   }
   // });
 
   // update the author database
      // @ts-ignore
      const updatedAuthor=await AuthorModel.findOneAndUpdate(
        {
          id:parseInt(req.params.authorId),
        },
        {
          $pull:{
            books:req.params.isbn,
          },
        },
        {
          new:true
        }
       ); 
   // database.authors.forEach((author) => {
   //   if (author.id === parseInt(req.params.authorId)) {
   //     const newBooksList = author.books.filter(
   //       (book) => book !== req.params.isbn
   //     );
 
   //     author.books = newBooksList;
   //     return;
   //   }
   // });
 
   return res.json({
     message: "author was deleted!!!!!!😪",
     book: updatedBook,
     author:  updatedAuthor,
   });
 });

 module.exports=Router;
  