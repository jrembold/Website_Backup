

var main = function() {

	//Basic Function to give random integer in a range
	function ranNumInRange( min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	};

	//Initializing Skel Breakpoints
	skel.init({
		containers: 1200,
		breakpoints: {
			large: {
				media: '(min-width: 1025px) and (max-width: 1900px)',
				containers: '80%'
			},
			medium: {
				media: '(min-width: 769px) and (max-width: 1024px)',
				containers: '90%'
			},
			small: {
				media: '(max-width: 768px)',
				containers: '95%'
			},
			xsmall: {
				media: '(max-width: 480px)',
				containers: '100%'
			}
		}
	});


	//Banner Animation
	function bannerAnimation() {
		var $banner_item = $('#banner li:hidden:first');
		var counter = 0;

		while ($banner_item.length > 0) {
			if (skel.isActive('xsmall')) { var fsize = ranNumInRange(30,50);}
			else { var fsize = ranNumInRange(50,70);}

			//Setting size and checking dimensions
			$banner_item.css('font-size', fsize);
			item_width = $banner_item.width();
			item_height = $banner_item.height();
		
			//Assigning random position such that the dimensions don't overrun the page
			if (skel.isActive('xsmall')) {
				var ypos = ranNumInRange(item_height,400-item_height),
					xpos = ranNumInRange(0,$(window).width()-item_width);
			} else {
				var ypos = ranNumInRange(item_height,400-item_height),
					xpos = ranNumInRange(0,$(window).width()-item_width);
			}

			$banner_item.css({
				'top': ypos,
				'left': xpos});
			//Animating with initial scaling delay to show one after another
			$banner_item.delay(4500*counter).fadeIn(1000).delay(3000).fadeOut(1000);

			$banner_item = $banner_item.next();
			counter += 1;
		};
		//Show name at the end of everything
		$('#banner h1').delay(5000*counter).fadeIn(1000);
	};

	//Slideout Menu
	function slideout() {	
		$('.slide-toggle').on('click', function(event) {
			event.preventDefault();

			var $slideMenu = $('.slideout-menu');
			var slideWidth = $('.slideout-menu').width();

			//Use toggleClass to determine if slideout is open
			$slideMenu.toggleClass('open');

			if ($slideMenu.hasClass('open')) {
				TweenLite.to($slideMenu, 0.5, {right: '0px'});
				//$slideMenu.animate({
					//right: '0px'
				//},'slow');
			} else {
				TweenLite.to($slideMenu, 0.5, {right: -slideWidth});
				//$slideMenu.animate({
					//right: -slideWidth
				//},'slow');
			}
		});

		$('a').on('click', function(event) {
			event.preventDefault();

			//This overrides the default link behavior, 
			//so we need to grab the href url and manually set the 
			//page to that location after any animations
			var goToURL = $(this).attr('href');

			var $slideMenu = $('.slideout-menu');
			var slideWidth = $slideMenu.width();
				
			function wrapup() {
				TweenLite.to($('body'), 0.25, {opacity: 0, onComplete:function(){window.location=goToURL}});
			};

			if ($slideMenu.hasClass('open')){
				$slideMenu.toggleClass('open');
				TweenLite.to($slideMenu, 0.5, {right: -slideWidth, onComplete:wrapup})
				//$slideMenu.animate({
					//right: -slideWidth
				//}, 'slow',
				//function () {window.location=goToURL});
			}
			else { wrapup() }
		});
	}


	//Run Main Functions
	bannerAnimation();
	slideout();
	//nicetablehover();
	
	TweenLite.from($('body'), 0.25, {opacity: 0});


};


$(document).ready(main);
