const blogs = [];

function addBlog(event) {
  event.preventDefault();

  const inputBlogImg = document.getElementById("input-blog-image").files;
  const inputBlogTitle = document.getElementById("input-blog-title").value;
  const inputStartDate = new Date(
    document.getElementById("input-start-date").value
  );
  const inputEndDate = new Date(
    document.getElementById("input-end-date").value
  );
  const inputBlogContent = document.getElementById("input-blog-content").value;

  // Menghitung durasi dalam hari
  const timeDiff = inputEndDate - inputStartDate; // difference in milliseconds
  const diffDays = timeDiff / (1000 * 3600 * 24);

  const image = URL.createObjectURL(inputBlogImg[0]);

  // Checkbox Code
  const filters = Array.from(
    document.querySelectorAll('input[name="filter"]:checked')
  ).map((input) => input.value);

  // Menampilkan gambar berdasarkan checkbox yang dipilih
  let imagesHtml = "";

  if (filters.includes("Technology")) {
    imagesHtml +=
      '<img src="asset/icon/tech.png" class="filter-image" alt="Technology Image" />';
  }
  if (filters.includes("Sport")) {
    imagesHtml +=
      '<img src="asset/icon/sports.png" class="filter-image" alt="Sport Image" />';
  }
  if (filters.includes("Travel")) {
    imagesHtml +=
      '<img src="asset/icon/travel.png" class="filter-image" alt="Travel Image" />';
  }

  const blog = {
    title: inputBlogTitle,
    content: inputBlogContent,
    durationDays: diffDays,
    image: image,
    imagesHtml: imagesHtml, // Simpan HTML gambar di objek blog
  };

  blogs.unshift(blog);
  // Simpan array blogs ke localStorage agar bisa diakses di halaman lain
  localStorage.setItem("blogs", JSON.stringify(blogs));

  renderBlog();
}

function renderBlog() {
  let html = ``;

  for (let i = 0; i < blogs.length; i++) {
    const content = blogs[i].content;
    const title = blogs[i].title;
    const truncatedContent =
      content.length > 100 ? content.slice(0, 100) + "..." : content;
    const truncatedTitle =
      title.length > 50 ? title.slice(0, 50) + "..." : title;
    html += `<div class="card">
                    <img src="${blogs[i].image}" alt="image" />
                    <div class="card-content">
                        <h3>
                            <a href="blog-detail.html?id=${i}">${truncatedTitle}
                            <span class="full-content" style="display: none;">${
                              blogs[i].title
                            }</span></a>
                        </h3>
                        <div class="wrap-blog-list">
                            <div class="detail-blog-content">
                                ${
                                  blogs[i].durationDays + " " + "Hari"
                                } | Rizki Rahmadani
                            </div>
                            <p class="blog-content" id="content-${i}">
                                ${truncatedContent}
                                <span class="full-content" style="display: none;">${content}</span>
                            </p>
                            <div class="wrap-images-btn">
                                <div class="images">${blogs[i].imagesHtml}</div>
                                <div class="card-btn">
                                    <a href="" class="btn-blog">Edit</a>
                                    <a href="" class="btn-blog" onclick="deleteBlog(${i})">Delete</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>`;
  }

  document.getElementById("contents").innerHTML = html;
}

function deleteBlog(i) {
  blogs.splice(i, 1); // Hapus blog berdasarkan indeks
  renderBlog(); // Render ulang blog
}
