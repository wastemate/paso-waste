/* Edison Code, LLC */

/**
 * Smooth Scrolling to intrapage anchors
 */
var $root = $('html, body');
$('a[href*=#]:not([href=#])').on('click', function(event){     
	var samePath = location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'');
	var sameHost = location.hostname === this.hostname;
	if (samePath && sameHost){
		event.preventDefault();
		var hash = this.hash;
		$root.animate({
			scrollTop: $(hash).offset().top - 105
		}, 500, function(){
			window.location.hash = hash;
		});
	}
});

/**
 *  Fix the Green Bar when it touches the nav
 */
$(document).ready(function () {
  try {
    var $obj = $('#greenBar');
    if($obj){
      var top = ($obj.offset().top - parseFloat($obj.css('marginTop').replace(/auto/, 0))) - $('#header').height();  
      $(window).scroll(function (event) {
        // what the y position of the scroll is
        var y = $(this).scrollTop();
        
        // whether that's below the form
        if (y >= top) {
          // if so, ad the fixed class
          $obj.addClass('fixed-below-navbar');
        } else {
          // otherwise remove it
          $obj.removeClass('fixed-below-navbar');
        }
      });
    }
  } catch(ex){
    console.log("Error handled -- Greenbar fixed scroll spy");
    console.log(ex);
  }
});

/**
 * Ordering box
 */
$(document).ready(function () {
		var initStep = $('#sign-up-choices');
		var orderStep = $('#sign-up-wastemate');
		var existingStep = $('#sign-up-existing');
		orderStep.hide();
		existingStep.hide();
    $('#choose-existing').on('click', function(){
      initStep.hide();
      existingStep.show();
    });
    $('#choose-new').on('click', function(){
      initStep.hide();
      orderStep.show();
    });
    $('.close').on('click', function(){
      orderStep.hide();
		  existingStep.hide();
      initStep.show();
    });
	});