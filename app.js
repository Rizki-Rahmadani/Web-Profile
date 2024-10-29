const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");

// Custom Helper
hbs.registerHelper("calculateDuration", (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInDays = (end - start) / (1000 * 60 * 60 * 24);

    if (durationInDays > 30) {
        const months = Math.floor(durationInDays / 30);
        const days = Math.floor(durationInDays % 30);
        return `${months} bulan ${days} hari`;
    } else {
        return `${durationInDays} hari`;
    }
});

app.set("view engine", "hbs");

app.use("/asset", express.static(path.join(__dirname, "./asset")));
app.use("/views", express.static("views"));

app.use(express.urlencoded({ extended: true }));

// Routing
app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);

// BLOG
app.get("/blog", blog);
app.post("/blog", blogPost);
app.post("/delete-blog/:index", blogDelete);
app.get("/edit-blog/:index", blogEdit);
app.post("/edit-blog/:index", editBlogPost);

app.get("/blog-detail/:i", blogDetail);
const blogs = [];

function home(req, res) {
    res.render("index");
}

function contact(req, res) {
    res.render("contact");
}

function testimonial(req, res) {
    res.render("testimonial");
}

function blogDetail(req, res) {
    const { index } = req.params;

    res.render("blog-detail", { idx: index });
}

function blog(req, res) {
    res.render("blog", { blogs });
}

function blogPost(req, res) {
    const { title, startDate, endDate, content, technologies } = req.body;

    // Pastikan technologies adalah array, jika tidak ada yang dipilih, buat array kosong
    const techArray = Array.isArray(technologies) ?
        technologies :
        technologies ?
        [technologies] :
        [];

    const techImages = techArray.map((tech) => {
        if (tech === "Node JS") {
            return "nodejs.png";
        } else if (tech === "React JS") {
            return "reactjs.png";
        } else if (tech === "Typescript") {
            return "typescript.png";
        } else if (tech === "HTML") {
            return "html.png";
        } else {
            return "";
        }
    });

    blogs.unshift({
        title,
        duration: hbs.handlebars.helpers.calculateDuration(startDate, endDate),
        content,
        author: "Rizki Rahmadani",
        techImages,
        technologies: techArray, // menyimpan nama teknologi yang dipilih
    });

    res.redirect("/blog");
}

function blogDelete(req, res) {
    const { index } = req.params;
    blogs.splice(index, 1);
    res.redirect("/blog");
}

function blogEdit(req, res) {
    const { index } = req.params;

    const blog = blogs.find((_, idx) => idx == index);

    res.render("edit-blog", { blog, index });
}

function editBlogPost(req, res) {
    const { index } = req.params;

    const { title, startDate, endDate, content, technologies } = req.body;

    // Pastikan technologies adalah array, jika tidak ada yang dipilih, buat array kosong
    const techArray = Array.isArray(technologies) ?
        technologies :
        technologies ?
        [technologies] :
        [];

    const techImages = techArray.map((tech) => {
        if (tech === "Node JS") {
            return "nodejs.png";
        } else if (tech === "React JS") {
            return "reactjs.png";
        } else if (tech === "Typescript") {
            return "typescript.png";
        } else if (tech === "HTML") {
            return "html.png";
        } else {
            return "";
        }
    });
    blogs[index] = {
        title,
        duration: hbs.handlebars.helpers.calculateDuration(startDate, endDate),
        content,
        author: "Rizki Rahmadani",
        techImages,
        technologies: techArray, // menyimpan nama teknologi yang dipilih
    };

    res.redirect("/blog");
}
app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});