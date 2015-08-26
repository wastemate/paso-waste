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