//公司新增、修改对话框
function showCoWindow(rowIndex, rowData) {
	$('#edit').dialog({
		resizable : true,
		modal : true,
		width : 500
	});
	if (rowData == '') {
		$('#edit').dialog('open').dialog('setTitle', '新增').dialog('refresh', '/gs/page/admin/coUpdate');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', '/gs/co/admin/coUpdate?id=' + rowData.id);
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {
		$('#coUpdateform').form('submit', {
			url : '/gs/co/updateCo',
			onSubmit : function() {
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
				$("#coTable").datagrid('reload');
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});
}

//公司管理检索
function searchYyslbList(){
	var coName = $("#ssCoName").textbox('getValue') //获取值
	$('#coTable').datagrid('load',{
	    'coName': coName
	});
	}
//公司管理重置
function resetForm(){
	$("#ssCoName").textbox('setValue')
}