const galleryData = [
  {
    src: "assets/IMG_20251113_161412.jpg",
    caption: "Evening Tea Vibes 🌆☕"
  },
  {
    src: "assets/IMG_20260101_174429.jpg",
    caption: "The day in village ✨"
  },
  {
    src: "assets/IMG_20251207_104208.jpg",
    caption: "Day in DakshinaChitra Heritage Museum 🫶"
  },
  {
    src: "assets/sudar.jpg",
    caption: "Pongal Celebration 😂"
  }
];

let currentIndex = 0;
const imgElement = document.getElementById('gallery-img');
const captionElement = document.getElementById('gallery-caption');

function rotateGallery() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    
    // Add a quick fade out effect
    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        imgElement.src = galleryData[currentIndex].src;
        captionElement.innerText = galleryData[currentIndex].caption;
        imgElement.style.opacity = 1;
    }, 500);
}

// Change image every 3 seconds
setInterval(rotateGallery, 3000);



// Selecting all card elements
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        // Optional: darken other cards when one is hovered
        cards.forEach(c => {
            if (c !== card) c.style.opacity = "1";
        });
    });

    card.addEventListener('mouseleave', () => {
        // Reset opacity for all cards
        cards.forEach(c => {
            c.style.opacity = "1";
        });
    });
});




// const track = document.querySelector('.logo-track');
// const items = Array.from(track.children);

// // Clone each item to create the infinite scroll effect
// items.forEach(item => {
//   const clone = item.cloneNode(true);
//   track.appendChild(clone);
// });





// const observerOptions = {
//     threshold: 0.2
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = "1";
//             entry.target.style.transform = "translateY(0)";
//         }
//     });
// }, observerOptions);

// document.querySelectorAll('.project-row').forEach(row => {
//     row.style.opacity = "0";
//     row.style.transform = "translateY(50px)";
//     row.style.transition = "all 0.8s ease-out";
//     observer.observe(row);
// });