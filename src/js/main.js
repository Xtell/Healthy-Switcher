headerScroll();



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
