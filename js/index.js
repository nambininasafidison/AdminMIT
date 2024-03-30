const exit = document.querySelector(".exit");
const sand = document.querySelector(".menu-sand");
const others = document.querySelector(".others-menu-bar");

exit.addEventListener("click", () => {
  others.style.display = "none";
});

sand.addEventListener("click", () => {
  others.style.display = "flex";
});

document.addEventListener("click", (e) => {
  if (!others.contains(e.target) && e.target != sand) {
    others.style.display = "none";
  }
});

const navlinks = document.querySelectorAll(".others-menu-bar ul li a");

navlinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

var swiperHorizontal = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
});

var swiperVertical = new Swiper(".swiper-container-vertical", {
  direction: "vertical",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-down",
    prevEl: ".swiper-button-up",
  },
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      swiperHorizontal.slidePrev();
      break;
    case "ArrowRight":
      swiperHorizontal.slideNext();
      break;
    case "ArrowUp":
      swiperVertical.map((item) => {
        item.slidePrev();
      });
      break;
    case "ArrowDown":
      swiperVertical.map((item) => {
        item.slideNext();
      });
      break;
  }
});
