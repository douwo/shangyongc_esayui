//公司角色新增、修改对话框
function showRoleTypeWindow(rowIndex, rowData) {
	$('#edit').dialog({
		resizable : true,
		modal : true,
		width : 500
	});
	if (rowData == '') {
		$('#edit').dialog('open').dialog('setTitle', '新增').dialog('refresh', '/gs/page/co/roleTypeUpdate');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', '/gs/role/roleTypeUpdate?id=' + rowData.id);
		
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {
		$('#roleTypeUpdateform').form('submit', {
			url : '/gs/role/updateRoleTypeData',
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
				$("#roleTypeTable").datagrid('reload');
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});
}

