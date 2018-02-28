//公司员工新增、修改对话框
function showEmpWindow(rowIndex, rowData) {
	$('#edit').dialog({
		resizable : true,
		modal : true,
		width : 500
	});
	if (rowData == '') {
		$('#edit').dialog('open').dialog('setTitle', '新增').dialog('refresh', '/gs/page/co/empUpdate');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', '/gs/coManage/empUpdatet?id=' + rowData.id);
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
//员工管理检索
function searchYyslbListEmp(){
	var r_name = $("#r_name").textbox('getValue'); //获取值
	var co_id = $('#co_id').combobox('getValue');
	var dpt_id = $('#dpt_id').combobox('getValue');
	var r_id = $('#r_id').combobox('getValue');
	$('#empTable').datagrid('load',{
	    'r_name': r_name,
	    'co_id':co_id,
	    'dpt_id':dpt_id,
	    'r_id':r_id
	});
}
//员工管理重置
function resetFormEmp(){
	$("#r_name").textbox('setValue'); // 这里用val()不可以取值，可以赋值，只能用easyui自带的 
	$('#co_id').combobox('setValue');
	$('#dpt_id').combobox('setValue');
	$('#r_id').combobox('setValue');

}