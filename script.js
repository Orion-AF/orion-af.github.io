// =====================
// Carrusel de Testimonios
// =====================
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  autoplay: { delay: 4000, disableOnInteraction: false }
});

// =====================
// Carrusel de Proyectos
// =====================
var proyectosSwiper = new Swiper(".proyectosSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: { el: ".proyectosSwiper .swiper-pagination", clickable: true },
  navigation: {
    nextEl: ".proyectosSwiper .swiper-button-next",
    prevEl: ".proyectosSwiper .swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// =====================
// Lightbox (modal) para imágenes de proyectos
// =====================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
if (modal && modalImg) {
  document.querySelectorAll(".proyectosSwiper img").forEach(img => {
    img.addEventListener("click", () => {
      if (modal.style.display === "flex" && modalImg.src === img.src) {
        modal.style.display = "none";
        modalImg.src = "";
      } else {
        modal.style.display = "flex";
        modalImg.src = img.src;
      }
    });
  });
  modalImg.addEventListener("click", () => {
    modal.style.display = "none";
    modalImg.src = "";
  });
}

// =====================
// Cielo estrellado + Constelación de Orión
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const heroContent = document.querySelector(".hero-content");

  // ---- Canvas sizing
  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ---- Variables fijas para constelación
  let logicalSize, offsetXCanvas, offsetYCanvas;
  function recalcConstellationSize() {
    logicalSize = canvas.width * 0.6;  // desktop
    if (canvas.width < 768) {
      logicalSize = canvas.width * 1.3; // móvil
    }
    offsetXCanvas = (canvas.width - logicalSize) / 2;
    offsetYCanvas = (canvas.height - logicalSize) / 2;
  }

  resizeCanvas();
  recalcConstellationSize();
  window.addEventListener("resize", () => {
    resizeCanvas();
    recalcConstellationSize();
  });

  // ---- Estrellas de fondo
  const totalStars = 220;
  const stars = Array.from({ length: totalStars }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.2,
    s: Math.random() * 0.5 + 0.2
  }));

  // ---- Dataset de líneas de Orión
  const baseW = 1500, baseH = 1500;
  const scaleX = 0.7;
  const scaleY = 0.85;
  const offsetX = 0.08;
  const offsetY = 0.0;

  const rawLines = [
    [[1035,548],[1487,512]],
    [[1397,332],[1468,419]],
    [[1468,422],[1487,512]],
    [[1487,506],[1465,593]],
    [[1465,593],[1428,734]],
    [[1428,734],[1369,776]],
    [[1035,543],[917,368]],
    [[917,368],[666,495]],
    [[666,495],[591,385]],
    [[664,492],[844,961]],
    [[844,961],[759,1349]],
    [[759,1346],[1184,1282]],
    [[1184,1282],[956,880]],
    [[956,880],[1032,545]],
    [[956,883],[897,925]],
    [[897,925],[846,961]]
  ];

  const orionLines = rawLines.map(line =>
    line.map(([x,y]) => ({
      x: (x/baseW) * scaleX + offsetX,
      y: (y/baseH) * scaleY + offsetY
    }))
  );

  // ---- Extraer puntos únicos para dibujar estrellas
  const starSet = new Set();
  orionLines.forEach(line => {
    line.forEach(p => starSet.add(`${p.x},${p.y}`));
  });
  const orionStars = Array.from(starSet).map(str => {
    const [x,y] = str.split(",").map(Number);
    return {x,y,r:3};
  });

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  // ---- Glow para las estrellas
  function glowStar(x, y, r, alpha) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
    g.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`);
    g.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // ---- Fade con retardo SOLO para la constelación
  let orionAlpha = 0;
  function updateOrionAlpha() {
    const wrapper = document.querySelector(".hero-wrapper");
    const rect = wrapper.getBoundingClientRect();

    const progress = Math.min(1, Math.max(0, (0 - rect.top) / (rect.height - window.innerHeight)));

    // Texto desaparece apenas empieza el scroll
    const textFade = Math.max(0, 1 - progress * 4); 
    if (heroContent) heroContent.style.opacity = textFade.toFixed(3);

    // Aparición y desaparición de constelación
    const fadeInStart = 0.05;
    const fadeInEnd   = 0.15;
    const fadeOutStart = 0.4;
    const fadeOutEnd   = 0.8;

    let fadeVal = 0;
    if (progress >= fadeInStart && progress <= fadeInEnd) {
      fadeVal = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
    }
    if (progress > fadeInEnd && progress < fadeOutStart) {
      fadeVal = 1;
    }
    if (progress >= fadeOutStart && progress <= fadeOutEnd) {
      fadeVal = 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    }
    fadeVal = Math.max(0, Math.min(1, fadeVal));

    orionAlpha += (fadeVal - orionAlpha) * 0.08;
  }

  window.addEventListener("scroll", updateOrionAlpha);

  // ---- Animación principal
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo de estrellas
    ctx.fillStyle = "white";
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.s;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }

    // Actualiza alpha según scroll
    updateOrionAlpha();

    // Dibuja la constelación
    if (orionAlpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = orionAlpha;

      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1.2;
      orionLines.forEach(([A,B]) => {
        ctx.beginPath();
        ctx.moveTo(A.x * logicalSize + offsetXCanvas, A.y * logicalSize + offsetYCanvas);
        ctx.lineTo(B.x * logicalSize + offsetXCanvas, B.y * logicalSize + offsetYCanvas);
        ctx.stroke();
      });

      for (let p of orionStars) {
        glowStar(
          p.x * logicalSize + offsetXCanvas,
          p.y * logicalSize + offsetYCanvas,
          p.r, 1
        );
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }
  animate();

  // ---- Header hide/show con scroll
  let lastScroll = 0;
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScroll = currentScroll;
  });
});
