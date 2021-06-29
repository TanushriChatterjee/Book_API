require("dotenv").config();
const express = require("express");
//Database
const database=require("./database");
const mongoose=require("mongoose");
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
booky.get("/",(req,res)=>{
         return res.json({books:database.books});    
});

/*
Route            /
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getSpecificBook.length===0)
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
booky.get("/c/:category",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category));
    if(getSpecificBook.length===0)
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
booky.get("/l/:lang",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.language===req.params.lang);
    if(getSpecificBook.length===0)
    {
         return res.json({error:`No book found for the language of ${req.params.lang}`});
    }
    return res.json({book:getSpecificBook});    
});

/*
Route            /authtor
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author",(req,res)=>{
    return res.json({authors:database.authors});    
});

/*
Route            /authtor/id
Description     Get specific authors
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/:id",(req,res)=>{
    const getSpecificAuthor=database.authors.filter((author)=>author.id===parseInt(req.params.id));
    if( getSpecificAuthor.length===0)
    {
         return res.json({error:`No specific author found for the ID of ${req.params.id}`});
    }
    return res.json({book:getSpecificAuthor});    
});

/*
Route            /authtor/book
Description     Get specific authors based on books
Access          PUBLIC
Parameter       book
Methods         GET
*/
booky.get("/author/book/:book",(req,res)=>{
    const getSpecificAuthor=database.authors.filter((author)=>author.books.includes(req.params.book));
    if( getSpecificAuthor.length===0)
    {
         return res.json({error:`No specific author found for the book of ${req.params.book}`});
    }
    return res.json({book:getSpecificAuthor});    
});

/*
Route            /publication
Description     Get all publication
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publication",(req,res)=>{
    return res.json({publications:database.publications});    
});

/*
Route            /publication/id
Description     Get specific publication
Access          PUBLIC
Parameter       id
Methods         GET
*/
booky.get("/publication/:id",(req,res)=>{
    const getSpecificPublication=database.publications.filter((publication)=>publication.id===parseInt(req.params.id));
    if( getSpecificPublication.length===0)
    {
         return res.json({error:`No specific publication found for the ID of ${req.params.id}`});
    }
    return res.json({book:getSpecificPublication});    
});

/*
Route            /publication/book
Description     Get specific publication based on books
Access          PUBLIC
Parameter       book
Methods         GET
*/
booky.get("/publication/book/:book",(req,res)=>{
    const getSpecificPublication=database.publications.filter((publication)=>publication.books.includes(req.params.book));
    if( getSpecificPublication.length===0)
    {
         return res.json({error:`No specific publication found for the book of ${req.params.book}`});
    }
    return res.json({book:getSpecificPublication});    
});

/*
Route            /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add",(req,res)=>{
   const {newBook}=req.body;
   database.books.push(newBook);
   return res.json({books:database.books});
});

/*
Route            /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
    database.authors.push(newAuthor);
    return res.json({authors:database.authors});
});

/*
Route            /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add",(req,res)=>{
    const {newPublication}=req.body;
    database.publications.push(newPublication);
    return res.json({publications:database.publications});
});

/*
Route            /book/update/title
Description      update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
    database.books.forEach((book)=>{
       if(book.ISBN===req.params.isbn){
           book.title=req.body.newBookTitle;
           return;
       }
    });
    return res.json({books:database.books});
});

/*
Route            /book/update/author
Description      update/add new author book a book
Access          PUBLIC
Parameter       isbn,author id
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        } 
    });       
    //update author database
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId))
            return author.books.push(req.params.isbn);
        });
        return res.json({books:database.books,authors:database.authors});  
 });

/*
Route            /author/update/name
Description      update author name using it's id
Access          PUBLIC
Parameter       author id
Methods         PUT
*/
booky.put("/author/update/name/:authorId",(req,res)=>{
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            author.name=req.body.newAuthorName;
            return;
        }
    });
    return res.json({authors:database.authors});
});

/*
Route            /publication/update/name
Description      update publication name using it's id
Access          PUBLIC
Parameter       publication id
Methods         PUT
*/
booky.put("/publication/update/name/:publicationId",(req,res)=>{
    database.publications.forEach((publication)=>{
        if(publication.id===parseInt(req.params.publicationId)){
            publication.name=req.body.newPublicationName;
            return;
        }
    });
    return res.json({publications:database.publications});
});

/*
Route            /publication/update/book
Description      update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
      if (publication.id === req.body.pubId) {
        return publication.books.push(req.params.isbn);
      }
    });
  
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = req.body.pubId;
        return;
      }
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
      message: "Successfully updated publication",
    });
  });

/*
Route            /book/delete
Description      delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
    let updatedBookDatabase=database.books.filter((book)=>book.ISBN!=req.params.isbn);
    database.books=updatedBookDatabase;
    return res.json({books:database.books});
});

/*
Route            /book/delete/author
Description      delete a author
Access          PUBLIC
Parameter       isbn, author id
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        const newAuthorList = book.authors.filter(
          (author) => author !== parseInt(req.params.authorId)
        );
        book.authors = newAuthorList;
        return;
      }
    });
  
    // update the author database
    database.authors.forEach((author) => {
      if (author.id === parseInt(req.params.authorId)) {
        const newBooksList = author.books.filter(
          (book) => book !== req.params.isbn
        );
  
        author.books = newBooksList;
        return;
      }
    });
  
    return res.json({
      message: "author was deleted!!!!!!😪",
      book: database.books,
      author: database.authors,
    });
  });

  /*
Route            /author/delete
Description      delete an author
Access          PUBLIC
Parameter       id
Methods         DELETE
*/
booky.delete("/author/delete/:authorId",(req,res)=>{
  let updatedAuthorDatabase=database.authors.filter((author)=>author.id!=parseInt(req.params.authorId));
  database.authors=updatedAuthorDatabase;
  return res.json({authors:database.authors});
});

 /*
Route            /publication/delete
Description      delete a publication
Access          PUBLIC
Parameter       id
Methods         DELETE
*/
booky.delete("/publication/delete/:pubId",(req,res)=>{
  let updatedPublicationDatabase=database.publications.filter((publication)=>publication.id!=parseInt(req.params.pubId));
  database.authors=updatedPublicationDatabase;
  return res.json({publications:database.publications});
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    // update publication database
    database.publications.forEach((publication) => {
      if (publication.id === parseInt(req.params.pubId)) {
        const newBooksList = publication.books.filter(
          (book) => book !== req.params.isbn
        );
  
        publication.books = newBooksList;
        return;
      }
    });
  
    // update book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = 0; // no publication available
        return;
      }
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
    });
  });
  
booky.listen(3000,()=>console.log("Hey Girl,the server is running 😎"));

mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(()=>console.log("connection established!!"));