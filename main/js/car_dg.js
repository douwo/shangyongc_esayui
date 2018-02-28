function sendIdToURL(dataForm,url){
	var id = $(dataForm).datagrid('getSelected').id;
	window.location.href = url+"?id="+id;
}
//删除
function deleteById(dataForm,url){
	var id = $(dataForm).datagrid('getSelected').id;
	$.post(url, {id:id},
		function(data,status) {
			if (data.result == 'Y') {
				$.messager.show({
					title : '提示',
					msg : "操作成功"
				});
				$(dataForm).datagrid('reload');
			} else {
				$.messager.show({
					title : '提示',
					msg : "操作失败"
				});
			}
	});
}
//保存
function saveData(dataForm,url,turnUrl){
	$.post(url, $(dataForm).serialize(),
			function(data,status) {
				if (data.result == 'Y') {
					$.messager.show({
						title : '提示',
						msg : "操作成功"
					});
					window.location.href = turnUrl;
				} else {
					$.messager.show({
						title : '提示',
						msg : data.result
					});
				}
	});
}

