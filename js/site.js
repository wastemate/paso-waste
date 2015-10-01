/* Edison Code, LLC */

/**
 * Smooth Scrolling to intrapage anchors
 */
var $root = $('html, body');
$(document).ready(function(){
  var offset = $('#header').outerHeight() + $('#greenBar').outerHeight() - 2;
  //page loaded with a hash in the url
  var hash = window.location.hash;
  if(hash.length){
    try {
    $root.animate({
        scrollTop: $(hash).offset().top - offset
      }, 500, function(){
        window.location.hash = hash;
      });
    } catch (ex) {
      //non issue, wastemate adds some hashes that aren't mapped on the page
    }
  }
  
  $('a[href*=#]:not([href=#])').on('click', function(event){     
    var samePath = location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'');
    var sameHost = location.hostname === this.hostname;
    if (samePath && sameHost){
      event.preventDefault();
      var hash = this.hash;
      $root.animate({
        scrollTop: $(hash).offset().top - offset
      }, 500, function(){
        window.location.hash = hash;
      });
    }
  });
})

/**
 * Parrallax header input box on scroll
 */
$(document).ready(function(){
  var self = {};
  self.$inputObj = $('.wastemate-hero-center');
  self.speed = 1 - 0.525;
  
  self.$win = $(window);
  self.$doc = $(document);  
  self.winHeight = self.$win.height();
  self.docHeight = self.$doc.height();
  self.scrollTopMax = self.docHeight - self.winHeight;
  
  var renderScroll = function(){
    if(!this.isBusy){
      this.isBusy = true;
      window.requestAnimationFrame(function(){
        var scrollTop = Math.max(0, Math.min(self.scrollTopMax, self.$win.scrollTop()));
        var offsetTop = scrollTop * self.speed;
        self.$inputObj.css({
            top: offsetTop
          });
        this.isBusy = false;
      });
    }
  }
  self.$win.on('scroll.px.parallax', function(){
    renderScroll();
  });
  self.$win.on('resize.px.parallax', function(){
    self.winHeight = self.$win.height();
    self.docHeight = self.$doc.height();
    self.scrollTopMax = self.docHeight - self.winHeight;
    renderScroll();
  });
});

/**
 * Open all links to other sites in a new window
 */
$('a[href]').each(function(){
  var sameHost = location.hostname === this.hostname;
  if(!sameHost){
    $(this).attr("target","_blank");
  }
});

/**
 *  Fix the Green Bar when it touches the nav
 */
$(document).ready(function () {
  try {
    var isMobile = $('#heroImage').css('display')=='none'; //hero is hidden on mobile
    var self = {};
    self.$bar = $('#greenBar');
    if(isMobile){
      if(self.$bar.length){
        self.$bar.css({
          'margin-top': '70px'
        });
      } else {
        $('#siteSummary').css({
          'margin-top': '70px'
        });
      }
      return; //bail out nothing else to do!
    }
    self.$content = $('#content');      
    self.$win = $(window);
    self.$doc = $(document);  
    self.baseOffsetTop = self.$bar.offset().top;
    self.headerHeight = $('#header').outerHeight();
    self.barHeight = self.$bar.outerHeight();
    if(self.$bar){
      //recalc when window resized
      self.$win.on('resize.px.parallax', function(){
        self.baseOffsetTop = self.$bar.offset().top;
      });
      //check position when scrolling  
      self.$win.on('scroll.px.parallax', function(){
        var offset = (self.$win.scrollTop() - self.baseOffsetTop) + self.headerHeight;
        if(offset >= 0){
           self.$bar.css({
            position: 'fixed',
            'z-index': 1000,
            top: self.headerHeight
          });
          self.$content.css({
            'padding-top': self.barHeight
          })
        } else {
          self.$bar.removeAttr( 'style' );
          self.$content.removeAttr( 'style' );
        }
      });
    }
  } catch(ex){
    console.log("Error handled -- Greenbar fixed scroll spy");
    console.log(ex);
  }
  
});

/**
 * WasteMate Sign Up interactions
 */
$(document).ready(function () {
		var isMobile = $('#heroImage').css('display')=='none'; //hero is hidden on mobile
    if(isMobile){
      try {
        initWasteMate(); // init on load  
      } catch(ex) {
        console.log(ex);
      }
      
     return; 
    }
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
      initWasteMate();
      initStep.hide();
      orderStep.show();
    });
    $('.close').on('click', function(){
      orderStep.hide();
		  existingStep.hide();
      initStep.show();
    });
	});
  
 $(document).ready(function(){
   $('[data-toggle="collapse"]').on('click', function(event){
     console.log('clicked');
     console.log(event);
     event.preventDefault();
   });
 })