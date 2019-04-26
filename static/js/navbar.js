// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};
//
// // Get the navbar
// var navbar = document.getElementById("navbar");
//
// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;
//
// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }
//
//
//


// Add dropshadow to navbar when scrolling

$(window).scroll(function() {
    if ($(window).scrollTop() > 10) {
        $('#navbar').addClass('floatingnav');
    } else {
        $('#navbar').removeClass('floatingnav');
    }
});


let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('active');
});
