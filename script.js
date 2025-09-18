// =====================
// Carrusel de Testimonios
// =====================
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  }
});

// =====================
// Contacto (solo alerta de demo)
// =====================
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
  });
}

// =====================
// Cielo estrellado en Hero
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stars");
  if (!canvas) return; // seguridad por si no existe en la página

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  let stars = [];
  const totalStars = 200;

  for (let i = 0; i < totalStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.5
    });
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // movimiento vertical suave
      star.y += star.speed;

      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animateStars);
  }

  animateStars();

  window.addEventListener("resize", resizeCanvas);
});
// =====================
// Carrusel de Proyectos
// =====================
// Carrusel de Proyectos
var proyectosSwiper = new Swiper(".proyectosSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".proyectosSwiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".proyectosSwiper .swiper-button-next",
    prevEl: ".proyectosSwiper .swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 }, 
    1024: { slidesPerView: 3 }
  }
});

