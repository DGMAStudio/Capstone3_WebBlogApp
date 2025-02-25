import bodyParser from "body-parser"
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var date = new Date();
var year = date.getFullYear();
var i = 1;

var posts = [
    {
        id:0,
        title:"JavaScript",
        content:"JavaScript often abbreviated as JS, is a programming language and core technology of the Web, alongside HTML and CSS. 99% of websites use JavaScript on the client side for webpage behavior. Web browsers have a dedicated JavaScript engine that executes the client code. These engines are also utilized in some servers and a variety of apps. The most popular runtime system for non-browser usage is Node.js. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[11] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.Although Java and JavaScript are similar in name and syntax, the two languages are distinct and differ greatly in design.",
        author:"Wikipedia",
    },
];

//render home page with all the posts \/
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        posts:posts
    });
    console.log(posts);
})


app.get("/create",(req,res)=>{
    res.render("create.ejs",{
        
    })
})

app.post("/",(req,res)=>{
        var newPostTitle = req.body["title"];
        var newPostContent = req.body["content"];
        var newPostAuthor = req.body["author"];
        var newPost = {
            id:i++,
            title:newPostTitle,
            content:newPostContent,
            author:newPostAuthor
        }
        posts.push(newPost);
    console.log(posts);
    res.redirect("/");
})

app.post("/edit",(req,res)=>{
        var getLabel = req.body['publish-edit'];
        var editId = getLabel.slice(15);
        console.log(editId);
        var editPostTitle = req.body["title"];
        console.log(editPostTitle);
        var editPostContent = req.body["content"];
        console.log(editPostContent);
        var editPostAuthor = req.body["author"];
        console.log(editPostAuthor);
        
        posts[editId].title = editPostTitle;
        posts[editId].content = editPostContent;
        posts[editId].author = editPostAuthor;
        console.log(posts);
        res.redirect("/");
})

//DELETE A POST
app.post("/delete",(req,res)=>{
    var getDeleteButton = req.body['delete-button'];
    var idToDelete = getDeleteButton.slice(8);
    const x = posts.splice(idToDelete,1);
    console.log(posts);
    res.redirect("/");
})

//EDIT A POST
app.post("/create",(req,res)=>{
    //GET ID TO EDIT
    var getEditButton = req.body['edit-button'];
    var idToEdit = getEditButton.slice(6);
    console.log(idToEdit);
    //SEND INFO OF POST TO CREATE TO EDIT
    res.render("create.ejs",{
        idToEdit:idToEdit,
        posts:posts
    })
    console.log(posts);
})

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})