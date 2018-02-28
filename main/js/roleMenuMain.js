$(function(){
	$.ajax({
		url:'/gs/role/getFirstMenu',
		type:'post',
		success:function(data){
			$.each(data,function(index,item){
				innerObj = '';
				$.ajax({
					url:'/gs/role/getSecondMenu',
					data:{'id':item.id},
					type:'post',
					async: false,
					success:function(secData){
						$.each(secData,function(i,v){
							innerObj += '<div class="funItem" data-url="'+v.url+'">'+v.m_name+'</div>';
						});
					}
				});
				$("#main_accordion").accordion("add",{
					title: item.m_name,
				    content: innerObj,
				    selected: false
				});
			});
			$(".funItem").click(function() {
				var tabName = $(this).text();
				var url = $(this).data("url");

				$(".funItem").css("background-color", 'white');
				$(this).css("background-color", '#E0ECFF');

				if ($('#funTab').tabs('exists', tabName)) {
					$('#funTab').tabs('select', tabName);
				} else {
					$('#funTab').tabs('add', {
						title : $(this).text(),
						href : url,
						closable : true
					});
				}
			});
		}
	});
});
//信息的下拉菜单
$(function(){  
	$('#sb1').splitbutton({menu:'#mm2'});   
});  
//退出
function out(){
	$.post("/gs/logout",function(data) {
		if (data.result=='Y') {
			location.href="/gs/out";
		}
	});
}

function addTab(title,url){
	$(".funItem").css("background-color", 'white');
	$(this).css("background-color", '#E0ECFF');

	if ($('#funTab').tabs('exists', title)) {
		$('#funTab').tabs('select', title);
	} else {
		$('#funTab').tabs('add', {
			title : title,
			href : url,
			closable : true
		});
	}
}