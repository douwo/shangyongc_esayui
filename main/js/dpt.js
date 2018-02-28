//公司部门新增、修改对话框
function showDptWindow(rowIndex, rowData) {
	$('#edit').dialog({
		resizable : true,
		modal : true,
		width : 500
	});
	if (rowData == '') {
		$('#edit').dialog('open').dialog('setTitle', '新增').dialog('refresh', '/gs/page/co/dptUpdatet');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', '/gs/coManage/dptUpdatet?id=' + rowData.id);
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {//bug
		$('#dptUpdateform').form('submit', {
			url : '/gs/coManage/dptUpdate',
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
				$("#dptTable").datagrid('reload');
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});
}
//部门管理检索
function searchYyslbListDpt(){
	var dptName = $("#ssDptName").textbox('getValue') //获取值
	$('#dptTable').datagrid('load',{
	    'dptName': dptName
	});
}
//部门重置
function resetFormDpt(){
	$("#ssDptName").textbox('setValue') // 这里用val()不可以取值，可以赋值，只能用easyui自带的 
}