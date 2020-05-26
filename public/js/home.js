var slideIndex = 1;
window.onload = function () {
    showSlides(slideIndex);
    //sets it to auto go to next slide every 3 seconds
    window.setInterval(auto_run, 3000);

}

function plusSlides(n) {
    // goes to next slide
    showSlides(slideIndex += n);
}

function currentSlide(n) {

    showSlides(slideIndex = n);
}

function auto_run() {
    // does plus slide for one unit
    plusSlides(1)
}

function showSlides(n) {
    // gets all slides, if it goes forward by 1, then it puts them all to not display except the last one
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    // all displays are none
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // except the last one
    slides[slideIndex - 1].style.display = "block";
}