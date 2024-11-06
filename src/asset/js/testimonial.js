function changeColor(button) {
  // Menghapus kelas 'active' dari semua tombol
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Menambahkan kelas 'active' ke tombol yang diklik
  button.classList.add("active");
}

async function getAllRating() {
  try {
    let testimonials = await fetch(
      "https://api.npoint.io/7ae1bf213372b7fe737a"
    );
    testimonials = await testimonials.json();

    const testimonialHTML = testimonials.map((testimonial) => {
      return `<div class="testimonial">
                  <img src="${testimonial.image}" class="profile-testimonial" />
                  <p class="comment">"${testimonial.content}"</p>
                  <p class="author">[ ${testimonial.author} ]</p>
                  <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
              </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join("");
  } catch (error) {
    console.log(error);
  }
}

async function getRatingByStar(star) {
  try {
    let testimonials = await fetch(
      "https://api.npoint.io/7ae1bf213372b7fe737a"
    );

    testimonials = await testimonials.json();
    const filteredRating = testimonials.filter((testimonial) => {
      return testimonial.star == star;
    });

    const testimonialHTML = filteredRating.map((testimonial) => {
      return `<div class="testimonial">
                <img src="${testimonial.image}" class="profile-testimonial" />
                <p class="comment">"${testimonial.content}"</p>
                <p class="author">[ ${testimonial.author} ]</p>
                <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
            </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join("");
  } catch (error) {
    console.log(error);
  }
}

getAllRating();
