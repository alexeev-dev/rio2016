$(document).ready(function() {
	

	randomPosition();

	$('#js-validate-1').feelform({
		notificationType: 'class'
	});

	$('.js-wordsScreen-popup').delay(5000).fadeOut(500);

	
});

$(window).load(function() {
	$('html, body').animate({'scrollTop': 0}, 1);
	$('.preloader').delay(800).fadeOut(300);


});

$(window).resize(function() {
	


	randomPosition();
});

$(window).scroll(function() {
  $('.skrollable-between').removeClass('active');
  $('.skrollable-between').last().addClass('active');
});




function randomInteger(min, max) {
	var rand = min + Math.random() * (max - min)
	rand = Math.round(rand);
	return rand;
}

function randomPosition() {

	var winW = $(window).width();
	var winH = $(window).height();

	$('.slide').css({'height' : winH + 'px', 'margin-top': - winH/2 + 'px', 'margin-left': - winW/2 + 'px'});

	$('.wordsContainer').find('li').each(function() {

		var pos_left = randomInteger(100, winW - 100);
		var pos_top = randomInteger(50, winH - 50);
		var font_size = randomInteger(12, 48);

		$(this).css({'left' : pos_left + 'px', 'top': pos_top + 'px', 'font-size': font_size + 'px'});

	});
}

