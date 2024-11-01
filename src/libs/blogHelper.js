// Helper function untuk mengkonversi string technologies menjadi array gambar
// Input: string technologies (contoh: "Node JS,React JS")
// Output: array nama file gambar (contoh: ["nodejs.png", "reactjs.png"])
function getTechImages(technologies) {
  // Ubah string technologies menjadi array, jika kosong return array kosong
  const techArray = technologies ? technologies.split(",") : [];

  // Map setiap teknologi ke file gambar yang sesuai
  return techArray.map((tech) => {
    if (tech === "Node JS") return "nodejs.png";
    else if (tech === "React JS") return "reactjs.png";
    else if (tech === "Typescript") return "typescript.png";
    else if (tech === "HTML") return "html.png";
    else return "";
  });
}

// Helper function untuk memproses input technologies dari form
// Input: string/array technologies dari form
// Output: array technologies yang sudah distandarisasi
function processTechnologies(technologies) {
  // Cek apakah input sudah berupa array atau masih string tunggal
  return Array.isArray(technologies)
    ? technologies // Jika sudah array, return langsung
    : technologies
    ? [technologies] // Jika string tunggal, ubah jadi array
    : []; // Jika undefined/null, return array kosong
}

// Export functions agar bisa digunakan di file lain
module.exports = {
  getTechImages,
  processTechnologies,
};
