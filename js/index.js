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

var swiperHorizontal = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  nested: true,
});

var swiperVertical = new Swiper(".swiper-container-vertical", {
  direction: "vertical",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-down",
    prevEl: ".swiper-button-up",
  },
});

const navlinks = document.querySelectorAll(".others-menu-bar ul li a");
const adminLink = document.querySelectorAll(".admin a");
const aclLink = document.querySelectorAll(".conAcl a");

makeLink(navlinks, swiperHorizontal);
makeLink(adminLink, swiperHorizontal);
// makeLink(aclLink, swiperVertical);

function makeLink(links, swiper) {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const slideIndex = parseInt(link.getAttribute("data-slide"), 10);
      const currentIndex = swiper.activeIndex;
      const distance1 = Math.abs(slideIndex - currentIndex);
      const transitionTime = distance1 * 400;

      swiper.slideTo(slideIndex, transitionTime);
    });
  });
}

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
