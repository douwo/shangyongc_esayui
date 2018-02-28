
//公司管理员新增、修改对话框
function showCoUserWindow(rowIndex, rowData) {
	$('#edit').dialog({
		resizable : true,
		modal : true,
		width : 500
	});
	if (rowData == '') {
		$('#edit').dialog('open').dialog('setTitle', '新增').dialog('refresh', '/gs/page/admin/coUserUpdate');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', '/gs/co/admin/coUserUpdate?id=' + rowData.id);
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {
		$('#coUserUpdateform').form('submit', {
			url : '/gs/co/updateCoUser',
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
				$("#coUserTable").datagrid('reload');
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});
}
//检索
function searchYyslbList(){
	var r_Name = $("#r_Name").textbox('getValue'); //获取值
	var co_id =$("#co_id").textbox('getValue');
	$('#coUserTable').datagrid('load',{
	    'r_name': r_Name,
	    'co_id':co_id
	});
	}
//重置
function resetForm(){
	$("#r_Name").textbox('setValue');
	$("#co_id").textbox('setValue');
}