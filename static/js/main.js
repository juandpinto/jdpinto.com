$(document).ready(function() {


    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });


    /*--------------------------------
            Start About Me
    ----------------------------------*/
    // Initializing Skillbar Animation
    $('.skill-progress-bar').waypoint({
        handler: function(direction) {
            if (direction == "up") {
                $('.skillbar').each(function() {
                    $(this).find('.skillbar-bar').css("width", "0");
                });
                $('.skillbar').each(function() {
                    $(this).find('.skillbar-rem').css("width", "100%");
                });
            } else if (direction == "down") {
                $('.skillbar').each(function() {
                    $(this).find('.skillbar-bar').animate({
                        width: jQuery(this).attr('data-percent')
                    }, 2000);
                    $(this).find('.skillbar-rem').animate({
                        width: String(100 - Number(jQuery(this).attr('data-percent').substr(0, jQuery(this).attr('data-percent').length - 1))) + "%"
                    }, 2000);
                });
            }
        },
        offset: 'bottom-in-view'
    });


    // Wow Plugin Initialization
    var wow = new WOW({
        animateClass: 'animated',
        offset: 70,
        mobile: false
    });
    wow.init();


    document.getElementById('navbar-toggle').addEventListener('click', function() {
        // console.log(document.getElementById('js-menu').classList);
        document.getElementById('menu').classList.toggle('active');
    });


});