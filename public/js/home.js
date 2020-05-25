var slideIndex = 1;
window.onload = function () {
    showSlides(slideIndex);
    var intervalID = window.setInterval(auto_run, 3000);
}


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function auto_run() {
    plusSlides(1)
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var someOtherSlides = document.getElementsByClassName("otherSlides")
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}