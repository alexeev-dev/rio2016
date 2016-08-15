$(document).ready(function() {
	var hintIsShowed, phrasesOffset;

	phrasesOffset = $('.phrases').offset().top - 100;
	hintIsShowed = false;

	$('#js-validate-1').feelform({
		notificationType: 'class'
	});

	function showHintWindow() {
		var hintWindow;

		hintWindow = $('.mainScreen-popup');

		hintWindow.css({
			'position': 'fixed',
			'display': 'block',
			'opacity': '0',
			'left': '50%',
			'top': '100px',
			'z-index': '10',
			'margin-left': -hintWindow.width() / 2,
			'transition': 'opacity ease-out 1s'
		});

		setTimeout(function(){
			hintWindow.css('opacity', '1');
			$(window).focus();
		}, 50);

		setTimeout(function(){
			hintWindow.css('transition', 'opacity ease-out 1s');
		}, 1050);

		setTimeout(function(){
			hintWindow.css('opacity', '0');
		}, 5050);

		setTimeout(function(){
			hintWindow.css('display', 'none');
		}, 6050);
	}

	$(window).scroll(function() {
		var offset;

		offset = $(window).scrollTop();

		if (hintIsShowed === false && offset > phrasesOffset) {
			showHintWindow();
			hintIsShowed = true;
		}
	});

	$('.md-overlay, .md-close').click(function() {
		$(window).trigger('popup-closed');
	});
});

$(window).load(function() {
	$('html, body').animate({'scrollTop': 0}, 1);
	$('.preloader').delay(800).fadeOut(300);
});
