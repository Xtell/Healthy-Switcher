headerScroll();
document.querySelectorAll('.simplebar').forEach((el) => (new SimpleBar(el)));
let mySwiper = new Swiper ('.swiper-container', {
    navigation: {
        nextEl: '.about-us__slider-btn--next',
        prevEl: '.about-us__slider-btn--prev',
        disabledClass: 'about-us__slider-btn--disabled',
        hideOnClick: true,
      },
    slidesPerView: 2,

})
function headerScroll() {
    window.addEventListener('scroll', function() {
        let header = document.querySelector(".header");
        if (pageYOffset > header.offsetHeight) {
            header.classList.add("isScroll");
        }
        else {
            header.classList.remove("isScroll");
        }
    })
}
