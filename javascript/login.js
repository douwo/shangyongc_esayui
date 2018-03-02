$(function() {
	$('#parallax').jparallax({
		triggerExposesEdges: true,
		yparallax: false
	});
	$(".input-body").hide();
	$(".loginBtn").click(function() {
		$(".loginBtn").addClass('animated pulse');
		setTimeout(function() {
			window.location.href = "main.html"
		}, 800);
	});
	$(".users-login-pages-btn>button").click(function() {
	$(".users-login-pages-btn").hide(500);
	$(".users-login-pages-start>div").hide(500);
	setTimeout(function() {
		$(".input-body").show(500);
		$(".users-login-pages-start").parent().hide();
	}, 500)
})
})

