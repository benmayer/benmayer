$(window).bind("load", function() {
	// console.log("loaded");
	$(".fancybox").fancybox(
		{
	    padding    : 0,
	    margin     : 5,
	    nextEffect : 'fade',
	    prevEffect : 'fade',
	});
});

// $(document).ready(function(){
// 	console.log("ready");
// 	$('.spots').on('click',function(){
// 		console.log("clicked");
// 	});
// });