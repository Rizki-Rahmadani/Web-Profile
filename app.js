const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use("/asset/css", express.static("asset/css"));
app.use("/asset/icon", express.static("asset/icon"));
app.use("/asset/img", express.static("asset/img"));
app.use("/asset/js", express.static("asset/js"));
app.use("/views", express.static("views"));

app.use(express.urlencoded({ extended: true }));

// Routing
app.get("/", home);
app.get("/blog", blog);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/blog-detail/:id", blogDetail);

app.post("/blog", blogPost);

function home(req, res) {
    res.render("index");
}

function blog(req, res) {
    res.render("blog");
}

function contact(req, res) {
    res.render("contact");
}

function testimonial(req, res) {
    res.render("testimonial");
}

function blogDetail(req, res) {
    const { id } = req.params;

    res.render("blog-detail", { id });
}

function blogPost(req, res) {
    const { title, startdate, enddate, content } = req.body;

    console.log("Title : ", title);
    console.log("Title : ", startdate);
    console.log("Title : ", enddate);
    console.log("Content : ", content);

    res.json(req.body);
}

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});