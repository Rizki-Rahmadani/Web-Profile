// Import required modules
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");

// Import helper functions
require("./src/libs/hbs-helper");
const { getTechImages, processTechnologies } = require("./src/libs/blogHelper");

const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const { register } = require("module");
const { types } = require("util");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

// Set view engine and middleware
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));
app.use("/asset", express.static(path.join(__dirname, "./src/asset")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "my-session",
    secret: "rahasiabangetdehjangansampaiadayangtahu",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

app.use(flash());

// Define routes for main pages
app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/login", loginPage);
app.post("/login", loginPost);
app.get("/register", registerPage);
app.post("/register", registerPost);
app.post("/logout", logout);

// Define routes for blog functionality
app.get("/blog", blog);
app.post("/blog", blogPost);
app.get("/edit-blog/:id", blogEdit);
app.post("/edit-blog/:id", editBlogPost);
app.post("/delete-blog/:id", blogDelete);
app.get("/blog-detail/:id", blogDetail);

// Route handlers for main pages
function home(req, res) {
  const user = req.session.user;
  console.log(user);
  res.render("index", { user });
}

function contact(req, res) {
  res.render("contact");
}

function testimonial(req, res) {
  res.render("testimonial");
}

function registerPage(req, res) {
  res.render("register");
}

async function registerPost(req, res) {
  const { name, email, password } = req.body;
  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO Users(name,email,password) VALUES('${name}','${email}','${hashPassword}') `;
  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("login");
}

function loginPage(req, res) {
  res.render("login");
}

async function loginPost(req, res) {
  const { email, password } = req.body;

  // Verifikasi Email
  const query = `SELECT * FROM users WHERE email='${email}'`;
  const user = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!user.length) {
    req.flash("error", "Email / Password Salah");
    return res.redirect("/login");
  }

  // Verifikasi Password
  const isPasswrodMatch = await bcrypt.compare(password, user[0].password);
  if (!isPasswrodMatch) {
    req.flash("error", "Email / Password Salah");
    return res.redirect("/login");
  }

  req.flash("success", "Login Berhasil");
  req.session.user = user[0];
  res.redirect("/");
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return console.log("Logout Gagal");
    console.log("Logout Berhasil");
    res.redirect("/");
  });
}

// Route handler untuk menampilkan semua blog
// Mengambil semua blog dari database dan menambahkan author & techImages
async function blog(req, res) {
  // Query untuk mengambil semua blog
  const query = `SELECT * FROM blogs`;
  let blogs = await sequelize.query(query, { type: QueryTypes.SELECT });

  // Tambahkan properti author dan techImages untuk setiap blog
  blogs = blogs.map((blog) => ({
    ...blog,
    // Memotong judul jika lebih dari 20 karakter dan menambahkan "..."
    title:
      blog.title.length > 20 ? blog.title.substring(0, 20) + "..." : blog.title,
    // Menambahkan nama author secara statis
    author: "Rizki Rahmadani",
    // Mengambil gambar teknologi dari fungsi getTechImages berdasarkan technologies yang dipilih
    techImages: getTechImages(blog.technologies),
    // Memotong konten jika lebih dari 100 karakter dan menambahkan "..."
    content:
      blog.content.length > 100
        ? blog.content.substring(0, 100) + "..."
        : blog.content,
  }));

  // Render halaman blog dengan data yang sudah diproses
  res.render("blog", { blogs });
}

// Route handler untuk membuat blog baru
// Menerima data dari form dan menyimpan ke database
async function blogPost(req, res) {
  // Ambil data dari form yang disubmit
  const { title, startDate, endDate, content, technologies } = req.body;

  // Proses technologies dari form menjadi string yang sesuai
  const techArray = processTechnologies(technologies);

  // Query untuk insert blog baru ke database
  const query = `
      INSERT INTO "blogs" (
        "title", 
        "startDate",   
        "endDate",    
        "content", 
        "technologies", 
        "imgae"
      ) VALUES (
        '${title}',
        '${startDate}',
        '${endDate}',
        '${content}',
        '${techArray.join(",")}',
        'https://weallfollowunited.com/wp-content/uploads/2021/05/ManUtd-2933623-11587130134587_medium.jpg'
      )`;

  // Eksekusi query insert
  await sequelize.query(query, { type: QueryTypes.INSERT });

  // Redirect ke halaman blog setelah insert berhasil
  res.redirect("/blog");
}

// Route handler untuk menampilkan detail blog berdasarkan ID
// Mengambil blog spesifik dan menambahkan author & techImages
async function blogDetail(req, res) {
  // Ambil ID dari parameter URL
  const { id } = req.params;

  // Query untuk mengambil blog berdasarkan ID
  const query = `SELECT * FROM "blogs" WHERE "id" = ${id}`;
  let blog = await sequelize.query(query, { type: QueryTypes.SELECT });

  // Tambahkan properti author dan techImages ke blog
  blog = blog.map((item) => ({
    ...item,
    author: "Rizki Rahmadani",
    techImages: getTechImages(item.technologies),
  }));

  // Render halaman detail dengan data blog
  res.render("blog-detail", { blog: blog[0] });
}

// Route handler untuk menampilkan form edit blog
// Mengambil data blog yang akan diedit dan memproses technologies untuk checkbox
async function blogEdit(req, res) {
  // Ambil ID dari parameter URL
  const { id } = req.params;

  // Query untuk mengambil blog yang akan diedit
  const query = `SELECT * FROM "blogs" WHERE "id" = ${id}`;
  const blog = await sequelize.query(query, { type: QueryTypes.SELECT });

  // Tambahkan data yang diperlukan untuk form edit
  blog[0].author = "Rizki Rahmadani";
  // Konversi string technologies menjadi array untuk checkbox
  blog[0].technologiesArray = blog[0].technologies
    ? blog[0].technologies.split(",")
    : [];
  // Tambahkan array gambar teknologi
  blog[0].techImages = getTechImages(blog[0].technologies);

  // Render form edit dengan data blog
  res.render("edit-blog", { blog: blog[0] });
}

// Route handler untuk memproses update blog
// Menerima data dari form edit dan mengupdate database
async function editBlogPost(req, res) {
  // Ambil ID dari parameter URL
  const { id } = req.params;
  // Ambil data dari form yang disubmit
  const { title, startDate, endDate, content, technologies } = req.body;

  // Proses technologies dari form menjadi string yang sesuai
  const techArray = processTechnologies(technologies);

  // Query untuk update data blog di database
  const query = `
      UPDATE "blogs" 
      SET 
        "title" = '${title}', 
        "startDate" = '${startDate}', 
        "endDate" = '${endDate}', 
        "content" = '${content}', 
        "technologies" = '${techArray.join(",")}'
      WHERE "id" = ${id}`;

  // Eksekusi query update
  await sequelize.query(query, { type: QueryTypes.UPDATE });

  // Redirect ke halaman blog setelah update berhasil
  res.redirect("/blog");
}

// Route handler for deleting blog post
async function blogDelete(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM blogs WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/blog");
}

// Start server
app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
