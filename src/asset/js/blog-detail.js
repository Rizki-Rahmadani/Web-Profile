const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Fungsi untuk mendapatkan parameter id dari URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Mengambil id dari parameter URL
const blogId = getQueryParameter("id");

if (blogId !== null && blogs[blogId]) {
    const blog = blogs[blogId];

    const html = `
        <h1>${blog.title}</h1>
        <img src="${blog.image}" alt="image" />
        <div class="detail-blog-content">
            ${blog.durationDays} Hari | Rizki Rahmadani
        </div>
        <div class="images">${blogs.imagesHtml}</div>
        <p>${blog.content}</p>
    `;

    document.getElementById("blog-detail").innerHTML = html;
} else {
    document.getElementById("blog-detail").innerHTML =
        "<p>Artikel tidak ditemukan.</p>";
}