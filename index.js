import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var newlistitems = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        newitems: newlistitems,
    });
});

app.get("/createBlog", (req, res) => {
    res.render("blog_create.ejs");
});

app.post("/postBlog", (req, res) => {
    const newBlog = {
        id: newlistitems.length + 1,
        title: req.body.blogTitle,
        name: req.body.usersname,
        content: req.body.blogContent,
    };

    newlistitems.push(newBlog);
    console.log(newlistitems[newlistitems.length - 1].title);

    res.render("index.ejs", { newitems: newlistitems });
});

app.post("/delete", (req, res) => {
    const index = req.body.index; // Get the index from the form data

    console.log(`index: ${index}`);

    newlistitems.splice(index - 1, 1); // Remove the item from the array

    res.redirect("/");
});

app.post("/open", (req, res) => {
    const index = req.body.index; // Get the index from the form data

    res.render("open.ejs", {
        blog_title_n: newlistitems[index - 1].title,
        blog_content_n: newlistitems[index - 1].content,
        blog_users_n: newlistitems[index - 1].name,
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
