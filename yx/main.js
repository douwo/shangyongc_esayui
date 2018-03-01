$(document).ready(function() {
	$(".funItem").click(function() {
		var tabName = $(this).text();
		var url = $(this).data("url");

		$(".funItem").css("background-color", 'white');
		$(this).css("background-color", '#E0ECFF');

		if($('#funTab').tabs('exists', tabName)) {
			$('#funTab').tabs('select', tabName);
		} else {
			$('#funTab').tabs('add', {
				title: $(this).text(),
				href: url,
				closable: true
			});
		}
	});
});
//信息的下拉菜单
$(function() {
	$('#sb1').splitbutton({
		menu: '#mm2'
	});
});
//退出
function out() {
	$.post("/gs/logout", function(data) {
		if(data.result == 'Y') {
			location.href = "/gs/out";
		}
	});
}
