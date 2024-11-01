class Testimonial {
    constructor(image, content, author, star) {
        this.image = image;
        this.content = content;
        this.author = author;
        this.star = star;
    }

    toHTML() {
        return `<div class="testimonial">
              <img src="${this.image}" class="profile-testimonial" />
              <p class="comment">"${this.content}"</p>
              <p class="author">[ ${this.author} ]</p>
              <p class="author"><i class="fas fa-star"></i>${this.star}</p>
              
          </div>`;
    }

    toHTMLWithoutRating() {
        return `<div class="testimonial">
              <img src="${this.image}" class="profile-testimonial" />
              <p class="comment">"${this.content}"</p>
              <p class="author">- ${this.author}</p>
              
          </div>`;
    }
}

const testimonials = [{
        image: "https://th.bing.com/th/id/OIP.dei2v020FgtZK9lXPfm7bAAAAA?rs=1&pid=ImgDetMain",
        content: "Mantap sekali bro!",
        author: "El Gasing",
        star: 5,
    },
    {
        image: "https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/01/12/21/harrymaguire1201a.jpg",
        content: "Recommended banget sih",
        author: "Meguire",
        star: 5,
    },
    {
        image: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltdd6c6a9b128de851/64ea0ab82b79c1e8b318166a/GettyImages-1640280148.jpg?auto=webp&format=pjpg&width=1920&quality=60",
        content: "Masih Perlu Dikembangkan lagi, semangat yaa!!",
        author: "Onana",
        star: 3,
    },
    {
        image: "https://staticg.sportskeeda.com/editor/2023/04/e2f38-16819300115774-1920.jpg",
        content: "Mantap boss!!",
        author: "Ten Hag",
        star: 4,
    },
];

let testimonialHTML = "";
for (let index = 0; index < testimonials.length; index++) {
    const { image, content, author, star } = testimonials[index];

    testimonialHTML += new Testimonial(image, content, author, star).toHTML();
}

document.getElementById("testimonials").innerHTML = testimonialHTML;

// document
//     .getElementById("testimonialForm")
//     .addEventListener("submit", function(event) {
//         event.preventDefault();

//         const content = document.getElementById("content").value;
//         const author = document.getElementById("author").value;
//         // const star = document.getElementById("star").value;
//         const imageUpload = document.getElementById("image").files[0];

//         if (imageUpload) {
//             const reader = new FileReader();
//             reader.onload = function(e) {
//                 const image = e.target.result;

//                 const testimonial = new Testimonial(image, content, author);
//                 const testimonialHTML = testimonial.toHTML();

//                 document.getElementById("testimonials").innerHTML += testimonialHTML;

//                 // Optionally clear the form fields after submission
//                 document.getElementById("testimonialForm").reset();
//             };

//             reader.readAsDataURL(imageUpload);
//         }
//     });