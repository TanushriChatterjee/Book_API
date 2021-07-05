const Router=require("express").Router();
const AuthorModel=require("../../author");

/*
Route            /authtor
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/",async(req,res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors: getAllAuthors});    
  });
  
  /*
  Route            /authtor/id
  Description     Get specific authors
  Access          PUBLIC
  Parameter       isbn
  Methods         GET
  */
  Router.get("/:id",async(req,res)=>{
    const getSpecificAuthor=await AuthorModel.findOne({id:parseInt(req.params.id)});
    //const getSpecificAuthor=database.authors.filter((author)=>author.id===parseInt(req.params.id));
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
  Router.get("/book/:book",async(req,res)=>{
      const getSpecificAuthor=await AuthorModel.findOne({books:req.params.book});  
    //const getSpecificAuthor=database.authors.filter((author)=>author.books.includes(req.params.book));
      if( getSpecificAuthor.length===0)
      {
           return res.json({error:`No specific author found for the book of ${req.params.book}`});
      }
      return res.json({book:getSpecificAuthor});    
  });

  /*
Route            /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add",async(req,res)=>{
    const {newAuthor}=req.body;
    AuthorModel.create(newAuthor);
    //database.authors.push(newAuthor);
    return res.json({message: "author was added!"});
});

/*
Route            /author/update/name
Description      update author name using it's id
Access          PUBLIC
Parameter       author id
Methods         PUT
*/
Router.put("/update/name/:authorId",async(req,res)=>{
    const updatedAuthorName=await AuthorModel.findOneAndUpdate(
      {
        id:parseInt(req.params.authorId),
      },
      {
        name:req.body.newAuthorName,
      },
      {
        new:true
      }
      );
 // database.authors.forEach((author)=>{
 //     if(author.id===parseInt(req.params.authorId)){
 //         author.name=req.body.newAuthorName;
 //         return;
 //     }
 // });
 return res.json({authors: updatedAuthorName});
});

 /*
Route            /author/delete
Description      delete an author
Access          PUBLIC
Parameter       id
Methods         DELETE
*/
Router.delete("/delete/:authorId",async(req,res)=>{
    const updatedAuthorDatabase=await AuthorModel.findOneAndDelete({id:parseInt(req.params.authorId)});
 // let updatedAuthorDatabase=database.authors.filter((author)=>author.id!=parseInt(req.params.authorId));
 // database.authors=updatedAuthorDatabase;
 return res.json({authors:updatedAuthorDatabase});
});

module.exports=Router;
  