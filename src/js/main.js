headerScroll();
document.querySelectorAll(".simplebar").forEach((el) => new SimpleBar(el));
let aboutUsSwiper = new Swiper(".about-us__swiper", {
  navigation: {
    nextEl: ".about-us__slider-btn--next",
    prevEl: ".about-us__slider-btn--prev",
    disabledClass: "about-us__slider-btn--disabled",
    hideOnClick: true,
  },
  slidesPerView: 1,

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 34,
    }
  }
});
let worksSwiper = new Swiper(".works__swiper", {
  slidesPerView: 'auto',
  grabCursor: true,
  breakpoints: {
    576: {
      slidesPerView: 1,
      centeredSlides: true
    }
  }

});
function headerScroll() {
  window.addEventListener("scroll", function () {
    let header = document.querySelector(".header");
    if (pageYOffset > header.offsetHeight) {
      header.classList.add("isScroll");
    } else {
      header.classList.remove("isScroll");
    }
  });
}
