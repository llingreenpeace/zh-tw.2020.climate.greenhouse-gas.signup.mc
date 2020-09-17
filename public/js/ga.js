$(document).ready(function(){

	$('body').on('click', '[data-ga-e]', function(e) {
		eval($(this).attr('data-ga-e'));
		// console.log($(this).attr('data-ga-e'));
	});

	$(window).scroll(function(e){
		var scrollY = $(this).scrollTop();
		$('[data-ga-p]').each(function(){
			if(!$(this).hasClass('viewed') && $(this).isOnScreen()){
				$(this).addClass('viewed');
				eval($(this).attr('data-ga-p'));
				// console.log($(this).attr('data-ga-p'));
			}else if($(this).hasClass('viewed') && !$(this).isOnScreen()){
				$(this).removeClass('viewed');
				// console.log($(this).attr('id'), 'not');
			}
		});
		
		
	});

});

