$(document).ready(function() {
	
	// Get info from jSon
	// $.getJSON( "titles.json", function(data) {

	// 	var items = [];

		// var winW = $(window).width();
		// var winH = $(window).height();

	// 	$.each(data, function(key, val) {

	// 		var pos_left = Math.floor((Math.random() * winW) + 1) + 'px';
	// 		var pos_top = Math.floor((Math.random() * winH) + 1) + 'px';

	// 		items.push( "<li style='left:" + pos_left + "; top:" + pos_top + ";' class='" + key + "'>" + "<a href='#'>" + val + "</a>" + "</li>" );
	// 	});

	// 	$("<ul/>", {
	// 		"class": "the-list",
	// 		html: items.join("")
	// 	}).appendTo(".wordsContainer");
	// });

	// var winW = $(window).width() - 100;
	// var winH = $(window).height() - 50;

	// var allLi = $('.wordsContainer').find('li');
	// var allLiArray = [];

	// $('.wordsContainer').find('li').each(function() {

	// 	var pos_left = randomInteger(100, winW);
	// 	var pos_top = randomInteger(50, winH);
	// 	var font_size = randomInteger(12, 48);

	// 	$(this).css({'left' : pos_left + 'px', 'top': pos_top + 'px', 'font-size': font_size + 'px'});

	// 	// allLiArray.push($(this));

	// 	// var myArrt = 'data-' + '100';

	// 	// $(this).attr(myArrt, 'transform: scale(1)');
	// 	// $(this).attr('data-500', 'transform: scale(3)');

	// });

	randomPosition();

	// allLiArray.forEach(function(item, i, allLiArray) {
	// 	// console.log( i + ": " + item + " (массив:" + allLiArray + ")" );

	// 	var material = i * 100;
	// 	var myArrt = 'data' + material;

	// 	item.attr(myArrt, 'transform: scale(1)');
	// 	item.attr('data-500', 'transform: scale(3)');
	// });

	// console.log(allLiArray);

	// for (var i = 0; i < allLiArray.length; i++) {
	// 	var myArrt = 'data-' + '100';

	// 	$(this).attr(myArrt, 'transform: scale(1)');
	// 	$(this).attr('data-500', 'transform: scale(3)');

	// 	$(this).addClass('active');
	// }

	var s = skrollr.init();

	// $('.wordsContainer').find('.slide').each(function() {

	// 	$(this).scrollTie({
	//         property: 'scale',
	//         speed: 0.5,
	//         stopAtValue: 5,
	//         afterStop: function(el) {
	//         	$(el).addClass('finished');
	//         },
	//         onStart: function(el) {
	//         	$(el).removeClass('finished');
	//         }
	//     });
	// });


	// $('.wordsContainer').find('li').each(function() {
	// 	// worldS.push(this);

	// 	var wordSpeed = Math.random() + 0.01;
	// 	var wordSpeedNew = Math.round(wordSpeed * 100) / 100;

	// 	// var pos_left = Math.floor((Math.random() * ((winW - 300) + 300)) + 'px';
	// 	// var pos_top = Math.floor((Math.random() * ((winH - 300) + 300)) + 'px';

	// 	var pos_left = Math.floor(Math.random() * (winW - 300 + 1)) + 300  + 'px';
	// 	var pos_top = Math.floor(Math.random() * (winH - 50 + 1)) + 50  + 'px';

	// 	$(this).css({'left' : pos_left, 'top': pos_top});

	// 	$(this).scrollTie({
	//         property: 'scale',
	//         speed: wordSpeed,
	//         stopAtValue: 5,
	//         afterStop: function(el) {
	//         	$(el).addClass('finished');
	//         },
	//         onStart: function(el) {
	//         	$(el).removeClass('finished');
	//         }
	//     });
	// });
	

	// $(".wordsContainer ul li").offset({top:pos_top, left:pos_left}) // устанавливает координаты относительно начала страницы, равные (100, 30) для всех элементов с классом content.

	// $('.scale').scrollTie({
 //        property: 'scale',
 //        speed: 0.05,
 //        stopAtValue: 3,
 //        afterStop: function(el) {
 //        	$(el).addClass('finished');
 //        }
        // onStart: function(el) {
        // 	$(el).removeClass('finished');
        // }
  //       delay: function(el) {
		//     var smth = $(el).height() * 2;
		//     console.log(smth);
		// },
		// propertyValueFormat: function(moveValue, el) {
		//     return 'scale(' + moveValue + 'px)';
		//     // console.log(smthmore);
		// }
  //       function(moveValue, el) {
		//     // return 'translateX(' + moveValue + 'px)';
		//     console.log(moveValue);
		// }
    // });


	// var [] = li.map(function(){
	//     return this;
	// }).get();

	// var worldS = [];

	

	// for (var i = 0; i < worldS.length; i++) {
	//   console.log( worldS[i] );
	// }

	// console.log(worldS);

	


	
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

