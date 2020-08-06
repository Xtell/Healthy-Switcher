headerScroll();
document.querySelectorAll(".simplebar").forEach((el) => new SimpleBar(el));
let mySwiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".about-us__slider-btn--next",
    prevEl: ".about-us__slider-btn--prev",
    disabledClass: "about-us__slider-btn--disabled",
    hideOnClick: true,
  },
  slidesPerView: "auto",

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 34,
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
let mobileToggle = document.querySelector(".header__nav-toggle");
mobileToggle.addEventListener("click", function (evt) {

  evt.preventDefault();
  let header = document.querySelector(".header");
  header.classList.toggle("header--isOpen");
  let body = document.querySelector("body");
  body.classList.toggle("lock");
});
let headerNavList = document.querySelector(".header__nav-list");
headerNavList.addEventListener('click', function(evt) {
  if (evt.target.closest('a')) {
    let header = document.querySelector(".header");
    header.classList.remove("header--isOpen");
    let body = document.querySelector("body");
    body.classList.remove("lock");
  }
});