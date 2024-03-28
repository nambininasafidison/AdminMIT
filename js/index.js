var swiperHorizontal = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
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
