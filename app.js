const express = require("express");
const app = express();
const port = 3000;

// Routing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Ini adalah halaman about us");
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
