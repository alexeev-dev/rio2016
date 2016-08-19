$(document).ready(function() {
	var hintIsShowed, phrasesOffset;

	if ($('.phrases').length) {
		phrasesOffset = $('.phrases').offset().top - 100;
	}
	hintIsShowed = false;

	$('.wordsScreen-popup').hide()

	function showHintWindow() {
		var hintWindow;

		hintWindow = $('.wordsScreen-popup');

		if ($(window).width() < 768) {
			return false;
		}

		hintWindow.css({
			'display': 'block',
			'opacity': '0',
			'z-index': '10',
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

	$('.js-rules').on('click', function() {
		$('.js-rules-popup').bPopup();
	});

	$('.js-login').on('click', function() {
		$('.js-login-popup').bPopup();
	});

	$('.js-sendMessage').on('click', function() {
		$('.js-sendMessage-popup').bPopup();
	});

	$('.js-approveMessage').on('click', function() {
		$('.js-approveMessage-popup').bPopup();
	});

	$('.js-winners').on('click',function() {
		$('.winnersName-popup').bPopup({
			opacity: 0.92,
			modalColor: '#5b7e94'
		});
	});
});

$(window).load(function() {
	$('html, body').animate({'scrollTop': 0}, 1);
	$('.preloader').delay(800).fadeOut(300);
});
