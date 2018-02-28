function showUpdateWindow(obj, url) {
	var row = $(obj).datagrid('getSelected');
	if (row == null) {
		$.messager.alert('提示',"请选择一行数据",'info');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', url+'?id=' + row.id);
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {
		$('#empUpdateform').form('submit', {
			url : '/gs/coManage/empUpdate',
			onSubmit : function(param) {
				var isValid = $(this).form('validate');
				return isValid;
			},
			success : function(data) {
				result = $.parseJSON(data);
				if (result.result=="Y") {
					parent.window.$.messager.show({
						title : '提示',
						msg : result.msg
					});
				} else {
					parent.window.$.messager.show({
						title : '提示',
						msg : result.msg
					});
				}
				$('#edit').dialog('close');
				$("#empTable").datagrid('reload');
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});

}