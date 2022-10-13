import { Swiper } from "swiper/bundle";

const sliderOrg = new Swiper(".slider-org", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
   
  },
  slidesPerView: 1,
  spaceBetween: 30,



  breakpoints: {
    768: {
      slidesPerView: 2,

    },
    1200: {
      slidesPerView: 3,

    },
  }

  });

